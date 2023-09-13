const express = require("express");
require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const PORT = process.env.PORT || 3001;
const app = express();

//ngrok will change every 2 hours
app.use(
  cors({
    origin: [
      "https://d160-2601-282-e80-3660-e1ce-58c-fb74-1df8.ngrok.io",
      "https://budget-babe-server-52483ffb6833.herokuapp.com/",
      "http://localhost:3001",
      "exp://fa8-ly4.lone1ne.8081.exp.direct",
      "https://jordanolguin.github.io",
    ],
    credentials: true,
  })
);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = await authMiddleware({ req });
    return {
      ...auth,
      sgMail,
    };
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

server.start().then(() => {
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
});

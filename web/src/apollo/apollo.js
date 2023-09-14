import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const serverURL =
  "https://budget-babe-server-f1a665edcb00.herokuapp.com/graphql";

const httpLink = new HttpLink({
  uri: serverURL,
  credentials: "include",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;

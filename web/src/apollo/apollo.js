import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const serverURL =
  "https://budget-babe-server-f1a665edcb00.herokuapp.com/graphql";

const httpLink = createHttpLink({
  uri: serverURL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;

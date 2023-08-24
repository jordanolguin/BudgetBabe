import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  //changes every 2 hours
  uri: "https://021f-2601-8c0-681-ba70-f00d-827b-9ddd-cf8c.ngrok.io/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;

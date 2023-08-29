import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  //changes every 2 hours
  uri: "https://9d7c-2601-8c0-681-ba70-e5a5-94b9-c8b9-d8f7.ngrok.io/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;

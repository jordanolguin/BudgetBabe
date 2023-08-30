import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  //changes every 2 hours
  uri: "https://804f-2601-8c0-681-ba70-9553-5a7e-375e-14b2.ngrok.io/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;

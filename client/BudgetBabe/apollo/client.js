import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  //changes every 2 hours
  uri: "https://dcd7-2601-8c0-681-ba70-5d70-81da-9d42-bd90.ngrok.io/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;

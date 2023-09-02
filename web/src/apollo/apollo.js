import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const serverURL =
  "https://5a8c-2601-8c0-681-ba70-5d70-81da-9d42-bd90.ngrok.io/graphql";

const httpLink = new HttpLink({
  uri: serverURL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;

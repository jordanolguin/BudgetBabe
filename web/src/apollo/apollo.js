import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const serverURL =
  "https://fd6e-2601-8c0-681-ba70-dc33-7a33-388f-caea.ngrok.io/graphql";

const httpLink = new HttpLink({
  uri: serverURL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const serverURL =
  "https://e090-2601-282-e80-3660-aca3-853-755a-2a52.ngrok.io/graphql";

const httpLink = new HttpLink({
  uri: serverURL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;

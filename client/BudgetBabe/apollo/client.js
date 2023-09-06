import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/link-context";
import AuthService from "../utils/storage";

const httpLink = createHttpLink({
  //changes every 2 hours
  uri: "https://fd6e-2601-8c0-681-ba70-dc33-7a33-388f-caea.ngrok.io/graphql",
});

// Apollo Link for setting the context (headers)
const authLink = setContext(async (_, { headers }) => {
  // Get the token from AsyncStorage
  const token = await AuthService.getToken();

  // Return the headers to the context, adding the token
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
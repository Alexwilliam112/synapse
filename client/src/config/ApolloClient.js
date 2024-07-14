import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { SSRMultipartLink } from "@apollo/experimental-nextjs-app-support/ssr";
import Cookies from "js-cookie";

const httpLink = new HttpLink({
  uri: "http://localhost:3000",
});

const authLink = new ApolloLink((operation, forward) => {
  const token = Cookies.get("token");
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

function makeClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            authLink.concat(httpLink),
          ])
        : authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export default makeClient;

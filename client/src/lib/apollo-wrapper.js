"use client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { SSRMultipartLink } from "@apollo/experimental-nextjs-app-support/ssr";

function makeClient() {
  const httpLink = new HttpLink({
    uri: "http://localhost:3000",
  });

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
    cache: new InMemoryCache(),
  });
}

export function ApolloWrapper({ children }) {
  const client = makeClient();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

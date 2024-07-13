"use client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { SSRMultipartLink } from "@apollo/experimental-nextjs-app-support/ssr";

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIzQHRlY2hjb3JwLmNvbSIsImlhdCI6MTcyMDc3OTYyOH0.stWicefqDeD3QPkF3ZAkUS0TIAUAaEs2nmeFsa8VTos'
function makeClient() {
  const httpLink = new HttpLink({
    uri: "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
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

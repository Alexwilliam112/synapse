"use client";

import makeClient from "@/config/ApolloClient";
import { ApolloProvider } from "@apollo/client";

export function ApolloWrapper({ children }) {
  const client = makeClient();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

"use client";

import store from "@/Redux/store";
import makeClient from "@/config/ApolloClient";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";

export function ApolloWrapper({ children }) {
  const client = makeClient();
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </Provider>
  );
}

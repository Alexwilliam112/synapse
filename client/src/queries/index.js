import { gql } from "@apollo/client";

export const UserLogin = gql`
  mutation Login($input: LoginInput) {
    Login(input: $input) {
      statusCode
      access_token
      companyName
      email
    }
  }
`;

export const FetchApi = gql`
query Query {
    GetEndpoints {
      data {
        id
        endpointUrl
        description
        status
        apiKey
        CompanyId
      }
    }
}`

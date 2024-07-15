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
  }
`;

export const CreateAPI = gql`
  mutation CreateEndpoint($input: CreateEndpointInput) {
    CreateEndpoint(input: $input) {
      statusCode
    }
  }
`;

export const UpdateAPI = gql`
mutation Mutation($input: UpdateEndpointInput) {
  UpdateEndpoint(input: $input) {
    statusCode
  }
}
`;

export const DeleteApi = gql`
mutation DeleteEndpoint($input: DeleteEndpointInput) {
  DeleteEndpoint(input: $input) {
    statusCode
  }
}
`;

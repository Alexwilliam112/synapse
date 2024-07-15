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

export const StartMining = gql`
  mutation StartMining($input: MiningRequest) {
    StartMining(input: $input) {
      statusCode
    }
  }
`;

export const getChartsData = gql`
query GetDashboardCharts($input: DashboardFilter) {
  GetDashboardCharts(input: $input) {
    data {
      averageConformanceByProcess_lineChart {
        label
        data
      }
      averageConformance_areaChart
      overallConformance_pieChart {
        ontime
        nonConform
      }
      topTenTable {
        rank
        name
        avgOverdue
        avgConformance
      }
    }
    statusCode
  }
}
`

export const getFilter = gql`
query Data {
  GetFilters {
    data {
      departments
      persons
      processes
    }
  }
}
`

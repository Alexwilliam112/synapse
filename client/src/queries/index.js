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
      statusCode
      data {
        averageConformance_areaChart
        overallConformance_pieChart {
          ontime
          nonConform
        }
        averageConformanceByProcess_lineChart {
          label
          data
        }
        topTenTable {
          rank
          name
          avgOverdue
          avgConformance
        }
        dashboardTable {
          eventName
          benchmarkTime
          average_actual
          ProcessId
          conformance_rate
          total_case
        }
        caseByProcess {
          labels
          datasets
        }
        conformanceByTask {
          labels
          datasets
        }
      }
    }
  }
`;

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
`;

export const getModelById = gql`
  query GetById($input: InputModelById) {
    GetById(input: $input) {
      statusCode
      data {
        id
        processName
        identifier
        description
        lastUpdate
        fitness
        CompanyId
        dataLinks {
          id
          canRelinkFrom
          identifier
          from
          to
          text
          ProcessId
        }
        events {
          id
          eventName
          identifier
          frequency
          time
          benchmarkTime
          isTextEditable
          color
          shape
          ProcessId
        }
        states {
          id
          eventName
          identifier
          isTextEditable
          color
          shape
          ProcessId
        }
      }
    }
  }
`;

export const getAllProcess = gql`
  query GetAllProcess {
    GetAllProcess {
      statusCode
      data {
        id
        processName
        identifier
        description
        lastUpdate
        fitness
        CompanyId
      }
    }
  }
`;

export const updateEvent = gql`
  mutation UpdateEvent($input: [events2]) {
    UpdateEvent(input: $input) {
      statusCode
    }
  }
`;

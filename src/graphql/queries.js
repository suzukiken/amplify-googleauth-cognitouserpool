/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrder = /* GraphQL */ `
  query GetOrder($id: Int!) {
    getOrder(id: $id) {
      id
      updated
    }
  }
`;
export const searchOrder = /* GraphQL */ `
  query SearchOrder($prefecture: String!) {
    searchOrder(prefecture: $prefecture) {
      columns {
        name
        type
      }
      rows
    }
  }
`;
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder($input: OrderInput!) {
    updateOrder(input: $input) {
      id
      updated
      detail {
        customer {
          mail
          name
          prefecture
        }
        items {
          pcs
          sku
        }
        payment {
          amount
          type
        }
      }
    }
  }
`;

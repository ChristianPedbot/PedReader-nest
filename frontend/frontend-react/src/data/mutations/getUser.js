import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      id
      name
      email
      telephone
      address
      city
      state
      img
      isAdmin
      createdAt
      updatedAt
    }
  }
`;

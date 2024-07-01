import { gql } from '@apollo/client';

export const GET_AUTHOR = gql`
  query GetAuthor($id: Int!) {
    author(id: $id) {
      id
      name
      biography
      img
    }
  }
`;

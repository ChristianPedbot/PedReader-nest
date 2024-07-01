// src/graphql/queries/authors.js
import { gql } from '@apollo/client';

export const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
      biography
      img
    }
  }
`;


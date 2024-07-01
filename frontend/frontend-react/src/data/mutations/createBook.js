import { gql } from '@apollo/client';

export const CREATE_BOOK = gql`
  mutation CreateBook($createBookInput: CreateBookInput!) {
    createBook(createBookInput: $createBookInput) {
      id
      title
      description
      img
      availability
      date
      author {
        id
        name
      }
      category {
        id
        name
      }
    }
  }
`;

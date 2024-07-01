import { gql } from '@apollo/client';

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: Int!, $updateBookInput: UpdateBookInput!) {
    updateBook(id: $id, updateBookInput: $updateBookInput) {
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

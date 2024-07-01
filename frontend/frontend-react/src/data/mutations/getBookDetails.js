import { gql } from '@apollo/client';

export const GET_BOOK_DETAILS = gql`
  query GetBookDetails($id: Int!) {
    book(id: $id) {
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

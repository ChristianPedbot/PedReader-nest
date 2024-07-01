import { gql } from '@apollo/client';

export const GET_BOOKS_BY_CATEGORY = gql`
  query GetBooksByCategory($categoryId: Int!) {
    booksByCategory(categoryId: $categoryId) {
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

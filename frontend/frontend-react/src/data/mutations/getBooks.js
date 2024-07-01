import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query {
    books {
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

import { gql } from '@apollo/client';

export const USER_LOCATIONS_QUERY = gql`
  query UserLocations($userId: Int!) {
    findLocationsByUser(userId: $userId) {
      id
      location_date
      return_date
      book {
        id
        title
      }
    }
  }
`;

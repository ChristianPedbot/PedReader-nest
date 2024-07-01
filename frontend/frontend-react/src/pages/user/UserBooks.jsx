import React from 'react';
import { useQuery } from '@apollo/client';
import { USER_LOCATIONS_QUERY } from '../../data/mutations/getLocationsByUser';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UserBooks({ userId }) {
  const { loading, error, data } = useQuery(USER_LOCATIONS_QUERY, {
    variables: { userId },
  });

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error('Error fetching user locations:', error);
    toast.error('Error fetching user locations!');
    return null;
  }
  
  const userLocations = data?.findLocationsByUser || [];

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {userLocations.map(location => (
        <div key={location.id} className="col">
          <div className="card-user-book">
            <div className="card-user-book-body">
              <h5 className="card-user-book-title">{location.book.title}</h5>
              <p className='mb-3 mt-3'>Return Date:</p>
              <p className="card-user-book-text">{new Date(location.return_date).toLocaleDateString()}</p>
              <Link to={`/books/${location.book.id}`} className="book-link">
                <button className="btn btn-primary">View Book</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

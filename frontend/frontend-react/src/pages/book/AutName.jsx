import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_AUTHOR } from '../../data/mutations/getAuthor';

function AuthorName({ authorId }) {
  const { loading, error, data } = useQuery(GET_AUTHOR, {
    variables: { id: authorId },
  });

  if (loading) return <span>Loading author...</span>;
  if (error) return <span>Error loading author</span>;

  return <span>{data.author.name}</span>;
}

export default AuthorName;

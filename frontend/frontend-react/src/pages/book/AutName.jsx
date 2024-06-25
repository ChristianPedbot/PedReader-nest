import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AuthorName({ authorId }) {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        console.log(authorId, 'id author autname')
        const response = await axios.get(`http://localhost:3000/authors/${authorId}`);
        console.log(response.data);
        setAuthor(response.data);
      } catch (error) {
        console.log('Error fetching author:', error);
      }
    };

    fetchAuthor();
  }, [authorId]);
  if (!author) {
    return <span>Loading author...</span>;
  }

  return <span>{author.name}</span>;

}

export default AuthorName;

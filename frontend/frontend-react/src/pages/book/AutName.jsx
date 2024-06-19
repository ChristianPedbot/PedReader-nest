import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AuthorName({ authorId }) {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/authors/${authorId}`);
        setAuthor(response.data);
      } catch (error) {
      }
    };

    fetchAuthor();
  }, [authorId]);

  if (!author) {
    return null;
  }

  return <span>{author.name}</span>;
}

export default AuthorName;

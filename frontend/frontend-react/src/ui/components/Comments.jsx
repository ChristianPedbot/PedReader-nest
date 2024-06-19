import React, { useState, useEffect } from 'react';
import '../styles/components/comments.css'
import axiosInstance from '../../data/axios/axios';
import { toast } from 'react-toastify';
import { getUserInfoFromServer } from '../../data/utils/localStorage';

export default function Comments({ bookId }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/comments/book/${bookId}`);
        const commentsData = response.data;
        const commentsWithUserNames = await Promise.all(commentsData.map(async (comment) => {
          const userResponse = await axiosInstance.get(`/users/${comment.user_id}`);
          const userName = userResponse.data.name;
          return { ...comment, user_name: userName };
        }));
        setComments(commentsWithUserNames);
      } catch (error) {
      }
    };

    fetchComments();
  }, [bookId]);

  const [userIsAdmin, setUserIsAdmin] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { isAdmin } = await getUserInfoFromServer();
      setUserIsAdmin(isAdmin);
    };

    fetchUserInfo();
  }, []);


  const handleDeleteComment = async (id) => {
    try {
      await axiosInstance.delete(`/book/comment/delete/${id}`);
      toast.success('Comment successfully deleted!');
      const updatedComments = comments.filter(comment => comment.id !== id);
      setComments(updatedComments);
    } catch (error) {
      toast.error('Error deleting comment:');
    }
  };

  return (

    <div className="row">
      <span className="placeholder col-12 mb-5"></span>
      {comments.map(comment => (
        <div className="column">
          <div className="cardt mb-3" key={comment.id}>

            <div className="cardt-bg">
              <span className={userIsAdmin != null ? 'hidden' : ''}>
                {userIsAdmin && (
                  <button id='delete-comment-btn' className='btn btn-danger' onClick={() => handleDeleteComment(comment.id)}>X</button>
                )}
              </span>
            </div>
            <div className="cardt-title">
              {comment.comment}
            </div>
            <span className="cardt-name">
              {comment.user_name}

            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

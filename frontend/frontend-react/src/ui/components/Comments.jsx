import React, { useState, useEffect } from 'react';
import '../styles/components/comments.css';
import axiosInstance from '../../data/axios/axios';
import { toast } from 'react-toastify';
import { getUserInfoFromServer } from '../../data/utils/localStorage';

export default function Comments({ bookId }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [userIsAdmin, setUserIsAdmin] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { isAdmin } = await getUserInfoFromServer();
        setUserIsAdmin(isAdmin);
      } catch (error) {
        toast.error('Error fetching user information');
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/comments/book/${bookId}`);
        setComments(response.data);
      } catch (error) {
        setError('Error fetching comments');
        toast.error('Error fetching comments');
      }
    };

    fetchComments();
  }, [bookId]);

  const handleDeleteComment = async (id) => {
    try {
      await axiosInstance.delete(`/comments/${id}`);
      toast.success('Comment successfully deleted!');
      const updatedComments = comments.filter(comment => comment.id !== id);
      setComments(updatedComments);
    } catch (error) {
      toast.error('Error deleting comment');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="row">
      <span className="placeholder col-12 mb-5"></span>
      {comments.map(comment => (
        <div className="column" key={comment.id}>
          <div className="cardt mb-3">
            <div className="cardt-bg">
              {userIsAdmin && (
                <button id='delete-comment-btn' className='btn btn-danger' onClick={() => handleDeleteComment(comment.id)}>X</button>
              )}
            </div>
            <div className="cardt-title">
              {comment.comment}
            </div>
            <span className="cardt-name">
              {comment.user.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

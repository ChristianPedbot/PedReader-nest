import React, { useState, useEffect } from 'react';
import '../../ui/styles/book/book.css';
import AuthorName from './AutName';
import { Link } from 'react-router-dom';
import axiosInstance from '../../data/axios/axios';
import EditButton from '../../ui/components/buttons/edit';
import RentButton from '../../ui/components/buttons/rent';
import { getUserInfoFromServer } from '../../data/utils/localStorage';
import ModalBook from '../../ui/components/modalBook';
import Comments from '../../ui/components/Comments';
import AddComment from '../../ui/components/addComment';
import { toast } from 'react-toastify';

function Book({ book }) {
  const [userId, setUserId] = useState(null);
  const [userIsAdmin, setUserIsAdmin] = useState(null);

  useEffect(() => { 
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfoFromServer();
      setUserId(userInfo.userId);
      setUserIsAdmin(userInfo.isAdmin);
    };

    fetchUserInfo();
  }, []);

  const handleDeleteBook = async (id) => {
    try {
      await axiosInstance.delete(`/books/${id}`);
      toast.success('Book deleted successfully!');
      setTimeout(() => {
        window.location.href = `/books`;
      }, 2000);
    } catch (error) {
      toast.error('Error deleting book!');
    }
  };

  const handleAddLocation = async (id) => {
    try {
      await axiosInstance.post(`/locations`, { bookId: id, userId: userId });
      toast.success("Successful rental");
      setTimeout(() => {
        window.location.href = `/books`;
      }, 2000);
    } catch (error) {
      toast.error("Error when performing rental!");
    }
  };

  if (!book || !book.author) {
    return null; 
  }

  const { id, title, description, rating, author, availability } = book;

  return (
    <div className='book-container'>
      <div className='book-div'>
        <div className="book-card mb-3" style={{ maxWidth: "540px" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img className="imgBook" src={book.img} alt={title} />
            </div>
            <div className="col-md-8">
              <div className="book-body">
                <h5 className="book-title mt-5">{title}</h5>
                <Link className='author-name' to={`/authors/${author.id}`} reloadDocument>
                  <AuthorName authorId={author.id} />
                </Link>
                <p className='description mt-3'>{description}</p>
                <span className={userIsAdmin != null ? 'hidden' : ''}>
                {userIsAdmin && (
                  <button type="button" id="delete" className="btn btn-danger" onClick={() => handleDeleteBook(id)}>X</button>
                )}
                </span>
                <div className="card-footer">
                  <div className="btn-adm mt-3">
                  <span className={userIsAdmin != null ? 'hidden' : ''}>
                    {userIsAdmin && (
                      <Link className='edit-button' to={`/books/${id}/edit`} reloadDocument>
                        <EditButton id={id} />
                      </Link>
                    )}
                    </span>
                    {availability === 0 ? (
                      <form className="btn-form" onSubmit={(e) => { e.preventDefault(); handleAddLocation(id); }}>
                        <RentButton />
                      </form>
                    ) : (
                      <ModalBook bookId={book.id} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddComment bookId={id} userId={userId} />
      <Comments bookId={book.id} />
    </div>
  );
}

export default Book;

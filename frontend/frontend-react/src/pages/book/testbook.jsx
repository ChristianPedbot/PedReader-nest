import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../ui/styles/book/editBook.css'
import UpdateButton from '../../ui/components/buttons/update';
import { toast } from 'react-toastify';

function EditBooks({ book }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    availability: '',
    genre: '',
    authorId: '',
    img: null
  });

  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    if (book) {
      const { title, description, availability, genre, author_id, img } = book;
      setFormData({
        title,
        description,
        availability,
        genre,
        authorId: author_id,
        img
      });
    }
  }, [book]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/authors');
        setAuthors(response.data);
      } catch (error) {
        toast.error('Error when searching for authors');
      }
    };

    fetchAuthors();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'img') {
      setFormData({
        ...formData,
        img: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('availability', formData.availability);
    formDataToSend.append('genre', formData.genre);
    formDataToSend.append('authorId', formData.authorId);

    if (formData.img) {
      formDataToSend.append('img', formData.img);
    }

    try {
      const response = await axios.put(`http://localhost:3000/books/${book.id}/edit`, formDataToSend);
      toast.success('Book successfully edited!', response.data);
      setTimeout(() => {
        window.location.href = `/books/${book.id}`;
      }, 2500);
    } catch (error) {
      toast.error('Error when trying to edit the book.');
    }
  };


  return (
    <div className="container-edit">
      <form onSubmit={handleSubmit} noValidate className="validated-form" encType='multipart/form-data'>
        <div className="row">
          <h1 className="text-title">Edit Book</h1>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label" htmlFor="title">Title</label>
              <input className="form-control" type="text" placeholder='Title...' id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="description">Description</label>
              <textarea className="form-control" placeholder='Book description...' id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
            </div>
            <div className='mb-3'>
              <label className='form-label' htmlFor="availability">Availability:</label>
              <select className='form-control' id="availability" name="availability" value={formData.availability} onChange={handleChange}>
                <option value="0">available</option>
                <option value="1">unavailable</option>
              </select>
            </div>
            <div className='mb-3'>
              <label className='form-label' htmlFor="genres">Genre:</label>
              <select className='form-control' id="genres" name="genre" value={formData.genre} onChange={handleChange}>
                <option value="14">Fiction</option>
                <option value="15">Romance</option>
                <option value="16">Horror</option>
                <option value="17">Mystery</option>
                <option value="18">Suspense</option>
                <option value="19">Adventure</option>
                <option value="20">Drama</option>
                <option value="21">Comedy</option>
                <option value="22">Poetry</option>
                <option value="23">Educational</option>
                <option value="24">Fantasy</option>
                <option value="25">Children</option>
              </select>
            </div>
            <div className='mb-3'>
              <label className='form-label' htmlFor="authorId">Author:</label>
              <select className='form-control' id="authorId" name="authorId" value={formData.authorId} onChange={handleChange}>
                {authors.map(author => (
                  <option key={author.id} value={author.id}>{author.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div >
              <label className='form-label' htmlFor="img">Image:</label>
              {book && <img className='imgBook-edit' src={book.img} alt="" />}
              <input type="file" className='form-control' id="img" name="img" onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className='btn-up'>
          <UpdateButton />
        </div>
      </form>
    </div>

  );
}


export default EditBooks;

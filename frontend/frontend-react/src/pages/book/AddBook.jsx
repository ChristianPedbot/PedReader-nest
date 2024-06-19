import React, { useState } from 'react';
import axios from 'axios';
import '../../ui/styles/book/addBook.css';
import { toast } from 'react-toastify';
import { AddBookButton } from '../../ui/components/buttons/add';

function AddBook({ authors }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    availability: '0',
    date: '',
    categorie_id: '14',
    author_id: authors.length > 0 ? authors[0].id : '',
    img: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      img: e.target.files[0]
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      toast.info("Adding book...");
      await axios.post('http://localhost:3000/books/add', formDataToSend);
      toast.success("Book added successfully!");
      setTimeout(() => {
        window.location.href = '/books';
      }, 2000);
    } catch (error) {
      toast.error('Error adding book. Please try again.');
    }
  };

  return (
    <div className="row text-white">
      <h1 className="text-center text-white mt-5">New Book</h1>
      <div className="col-6 offset-3">
        <form onSubmit={handleSubmit} noValidate className="validated-form" encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label text-white" htmlFor="title">Title:</label>
            <input className="form-control" type="text" id="title" name="title" placeholder='Ex: Harry Potter' value={formData.title} onChange={handleChange} required />
            <div className="valid-feedback">
              Looks good
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="description">Description:</label>
            <textarea className="form-control" placeholder="Book Description" id="description-book" name="description" value={formData.description} onChange={handleChange} required></textarea>
            <div className="valid-feedback">
              Looks good
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="availability">Availability:</label>
            <select className="form-control" id="availability" name="availability" value={formData.availability} onChange={handleChange}>
              <option value="0">available</option>
              <option value="1">unavailable</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="date">Data:</label>
            <input className="form-control" type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="genres">Genre:</label>
            <select className="form-control" id="genres" name="categorie_id" value={formData.categorie_id} onChange={handleChange}>
              <option value="14">Fiction</option>
              <option value="15">Romance</option>
              <option value="16">Horror</option>
              <option value="17">Mystery</option>
              <option value="18">Thriller</option>
              <option value="19">Adventure</option>
              <option value="20">Drama</option>
              <option value="21">Comedy</option>
              <option value="22">Poetry</option>
              <option value="23">Didactics</option>
              <option value="24">Fantasy</option>
              <option value="25">Kids</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="name-author">Author:</label>
            <select className="form-control" id="name-author" name="author_id" value={formData.author_id} onChange={handleChange}>
              {authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
          </div>

          <div className="container-img mb-3">
            <label className="form-label" htmlFor="name-author">Image:</label>
            <input className="form-control" type="file" name="img" onChange={handleFileChange} multiple />
          </div>
          <AddBookButton />
        </form>
      </div>
    </div>
  );
}

export default AddBook;

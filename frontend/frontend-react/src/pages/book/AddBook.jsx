import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import '../../ui/styles/book/addBook.css';
import { AddBookButton } from '../../ui/components/buttons/add';
import { CREATE_BOOK } from '../../data/mutations/createBook';
import { uploadImageToBackend } from '../../data/services/cloudinaryService';

function AddBook({ authors }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    availability: '0',
    date: '',
    categorie: '14',
    author: authors.length > 0 ? authors[0].id : '',
    img: null
  });

  const [createBook, { loading }] = useMutation(CREATE_BOOK);

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

    if (!formData.author) {
      toast.error('Please select an author.');
      return;
    }

    if (!formData.img) {
      toast.error('Please upload an image.');
      return;
    }

    try {
      toast.info("Uploading image...");
      
      // Upload image to backend
      const imgURL = await uploadImageToBackend(formData.img);

      const formDataToSend = {
        variables: {
          createBookInput: {
            title: formData.title,
            description: formData.description,
            img: imgURL,
            availability: parseInt(formData.availability),
            date: formData.date,
            author_id: parseInt(formData.author),
            category_id: parseInt(formData.categorie)
          }
        }
      };

      toast.info("Adding book...");
      const { data } = await createBook(formDataToSend);

      if (data.createBook) {
        toast.success("Book added successfully!");
        setTimeout(() => {
          window.location.href = '/books';
        }, 2000);
      } else {
        toast.error('Failed to add book. Please try again.');
      }
    } catch (error) {
      console.error('Error response:', error);
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
            <label className="form-label" htmlFor="date">Date:</label>
            <input className="form-control" type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="genres">Genre:</label>
            <select className="form-control" id="genres" name="categorie" value={formData.categorie} onChange={handleChange}>
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
            <select className="form-control" id="name-author" name="author" value={formData.author} onChange={handleChange}>
              {authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
          </div>

          <div className="container-img mb-3">
            <label className="form-label" htmlFor="name-author">Image:</label>
            <input className="form-control" type="file" name="img" onChange={handleFileChange} />
          </div>
          <AddBookButton />
        </form>
      </div>
    </div>
  );
}

export default AddBook;

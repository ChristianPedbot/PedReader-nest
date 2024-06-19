import React from 'react';
import '../../ui/styles/author/author.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { AddAuthorButton } from '../../ui/components/buttons/add';

function AddAuthor() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData(e.target);
    try {
      toast.info("Adding author...");
      await axios.post('http://localhost:3000/authors/add', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },

      });
      toast.success('Author added successfully!');
      setTimeout(() => {
        window.location.href = '/home';
      }, 2000);
    } catch (error) {
      toast.error('Error adding author!');
    }
  };

  return (
    <div className="row text-white">
      <h1 className="text-center text-white mt-5">New Author</h1>
      <div className="col-6 offset-3">
        <form onSubmit={handleSubmit} noValidate className="validated-form" encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label" htmlFor="name">Name</label>
            <input className="form-control" type="text" id="name" name="name" placeholder='ex: Clarice Lispector' required />
            <div className="valid-feedback">Looks good</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="biography">Biography</label>
            <textarea className="form-control" type="text" id="biography" name="biography" placeholder='Author biography...' required></textarea>
            <div className="valid-feedback">Looks good</div>
          </div>
          <label className='label-control'>Add image:</label>
          <div className="container-img-author">
            <input className="form-control mb-3" type="file" name="img" multiple />
          </div>
          <AddAuthorButton />
        </form>
      </div>
    </div>
  );
}

export default AddAuthor;

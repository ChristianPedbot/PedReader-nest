import React from 'react';
import '../../ui/styles/author/author.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AddAuthorButton } from '../../ui/components/buttons/add';
import { useNavigate } from 'react-router-dom';

function AddAuthor() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData(e.target);
    
    try {
      toast.info("Adding author...");
      console.log(formDataToSend)
      const response = await axios.post('http://localhost:3000/authors', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Author added successfully!');
      console.log(response.data); 
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      toast.error('Error adding author!');
      console.error('Error:', error);
    }
  };

  return (
    <div className="row text-white">
      <h1 className="text-center text-white mt-5">New Author</h1>
      <div className="col-6 offset-3">
        <form onSubmit={handleSubmit} noValidate className="validated-form" encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label" htmlFor="name">Name</label>
            <input className="form-control" type="text" id="name" name="title" placeholder='ex: Clarice Lispector' required />
            <div className="valid-feedback">Looks good</div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="biography">Biography</label>
            <textarea className="form-control" type="text" id="biography" name="description" placeholder='Author biography...' required></textarea>
            <div className="valid-feedback">Looks good</div>
          </div>
          <label className='label-control'>Add image:</label>
          <div className="container-img-author">
            <input className="form-control mb-3" type="file" name="img" />
          </div>
          <AddAuthorButton />
        </form>
      </div>
    </div>
  );
}

export default AddAuthor;

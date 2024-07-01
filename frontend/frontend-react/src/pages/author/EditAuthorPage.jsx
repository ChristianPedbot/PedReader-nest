import React, { useEffect, useState } from 'react';
import '../../ui/styles/author/editAuthor.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UpdateButton from '../../ui/components/buttons/update';
import BackButton from '../../ui/components/buttons/back';
import { toast } from 'react-toastify';
import { useQuery } from '@apollo/client';
import { GET_AUTHOR } from '../../data/mutations/getAuthor';
function EditAuthor() {
  const { id } = useParams();
  const [author, setAuthor] = useState({
    name: '',
    biography: '',
    img: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const { loading, error, data } = useQuery(GET_AUTHOR, {
    variables: { id: parseInt(id) }, 
  });

  useEffect(() => {
    if (data && data.author) {
      const { name, biography, img } = data.author;
      setAuthor({
        name,
        biography,
        img,
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuthor({ ...author, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', author.name);
    formData.append('biography', author.biography);
    if (selectedFile) {
      formData.append('img', selectedFile);
    }
  
    try {
      await axios.put(`http://localhost:3000/authors/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Author successfully edited!');
      setTimeout(() => {
        window.location.href = `/authors/${id}`;
      }, 2500);
    } catch (error) {
      if (error.response) {
        console.error('Server error:', error.response.data);
        toast.error('Server error. Please try again later.');
      } else if (error.request) {
        console.error('No response from server:', error.request);
        toast.error('No response from server. Please try again later.');
      } else {
        console.error('Request setup error:', error.message);
        toast.error('Request setup error. Please try again later.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container-edit">
      <form onSubmit={handleSubmit} noValidate className="validated-form" encType="multipart/form-data">
        <div className="row">
          <h1 className="text-title">Edit Author</h1>
          <center><img className="imgAuthor-edit" src={author.img} alt={author.name} /></center>
          <div className="col-md-12">
            <div className="mb-3">
              <label className="form-label" htmlFor="name">Name</label>
              <input className="form-control" type="text" id="name" name="name" value={author.name} onChange={handleInputChange} required />
              <div className="valid-feedback">Looks good</div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="biography">Biography</label>
              <textarea className="form-control" id="biography" name="biography" value={author.biography} onChange={handleInputChange} required></textarea>
              <div className="valid-feedback">Looks good</div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="img">Change main image</label>
              <input className="form-control" type="file" name="img" onChange={handleFileChange} />
            </div>
          </div>
        </div>
        <BackButton />
        <UpdateButton />
      </form>
    </div>
  );
}

export default EditAuthor;

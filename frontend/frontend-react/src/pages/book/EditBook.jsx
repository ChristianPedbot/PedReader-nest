import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../ui/styles/book/editBook.css';
import UpdateButton from '../../ui/components/buttons/update';
import { toast } from 'react-toastify';

function EditBooks({ book }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    availability: '',
    categorie: '',
    author: '',
    img: null,
  });

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (book) {
      const { title, description, availability, categorie, author, img } = book;
      setFormData({
        title,
        description,
        availability: availability.toString(),
        categorie: categorie.id.toString(),
        author: author.id.toString(),
        img,
      });
    }
  }, [book]);

  useEffect(() => {
    const fetchAuthorsAndCategories = async () => {
      try {
        const [authorsResponse, categoriesResponse] = await Promise.all([
          axios.get('http://localhost:3000/authors'),
          axios.get('http://localhost:3000/categories'),
        ]);
        setAuthors(authorsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        toast.error('Erro ao buscar autores e categorias');
      }
    };

    fetchAuthorsAndCategories();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'img') {
      setFormData({
        ...formData,
        img: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('availability', formData.availability);
    formDataToSend.append('categorie_id', formData.categorie);
    formDataToSend.append('author_id', formData.author);

    if (formData.img) {
      formDataToSend.append('img', formData.img);
    }

    try {
      const response = await axios.put(`http://localhost:3000/books/${book.id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Livro editado com sucesso!');
      setTimeout(() => {
        window.location.href = `/books/${book.id}`;
      }, 2500);
    } catch (error) {
      toast.error('Erro ao tentar editar o livro.');
    }
  };

  return (
    <div className="container-edit">
      <form onSubmit={handleSubmit} noValidate className="validated-form" encType='multipart/form-data'>
        <div className="row">
          <h1 className="text-title">Editar Livro</h1>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label" htmlFor="title">Título</label>
              <input className="form-control" type="text" placeholder='Título...' id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="description">Descrição</label>
              <textarea className="form-control" placeholder='Descrição do livro...' id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
            </div>
            <div className='mb-3'>
              <label className='form-label' htmlFor="availability">Disponibilidade:</label>
              <select className='form-control' id="availability" name="availability" value={formData.availability} onChange={handleChange}>
                <option value="0">Disponível</option>
                <option value="1">Indisponível</option>
              </select>
            </div>
            <div className='mb-3'>
              <label className='form-label' htmlFor="categorie">Gênero:</label>
              <select className='form-control' id="categorie" name="categorie" value={formData.categorie} onChange={handleChange}>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className='mb-3'>
              <label className='form-label' htmlFor="author">Autor:</label>
              <select className='form-control' id="author" name="author" value={formData.author} onChange={handleChange}>
                {authors.map(author => (
                  <option key={author.id} value={author.id}>{author.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div >
              <label className='form-label' htmlFor="img">Imagem:</label>
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

import React, { useState, useEffect } from 'react';
import '../../ui/styles/book/editBook.css';
import UpdateButton from '../../ui/components/buttons/update';
import { toast } from 'react-toastify';
import { GET_CATEGORIES } from '../../data/mutations/getCategories';
import { GET_AUTHORS } from '../../data/mutations/getAuthors';
import { GET_BOOK_DETAILS } from '../../data/mutations/getBookDetails';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_BOOK } from '../../data/mutations/updateBook'; // Importe a mutação de atualização

function EditBooks({ book }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    availability: '',
    categorie: '',
    author: '',
    img: null,
  });

  const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(GET_CATEGORIES);
  const { loading: authorsLoading, error: authorsError, data: authorsData } = useQuery(GET_AUTHORS);

  useEffect(() => {
    if (book) {
      const { title, description, availability, category, author, img } = book;
      setFormData({
        title,
        description,
        availability: availability.toString(),
        categorie: category.id.toString(),
        author: author.id.toString(),
        img,
      });
    }
  }, [book]);

  const [updateBookMutation] = useMutation(UPDATE_BOOK, {
    onError: (error) => {
      toast.error(`Erro ao tentar editar o livro: ${error.message}`);
    },
    onCompleted: () => {
      toast.success('Livro editado com sucesso!');
      setTimeout(() => {
        window.location.href = `/books/${book.id}`;
      }, 2500);
    },
    refetchQueries: [{ query: GET_BOOK_DETAILS, variables: { id: book.id } }],
  });

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

    const formDataToSend = {
      variables: {
        id: book.id,
        updateBookInput: {
          title: formData.title,
          description: formData.description,
          availability: parseInt(formData.availability), // Garanta que a disponibilidade é um número
          category_id: parseInt(formData.categorie), // Garanta que o id da categoria é um número
          author_id: parseInt(formData.author), // Garanta que o id do autor é um número
          img: formData.img,
        },
      },
    };

    try {
      await updateBookMutation(formDataToSend);
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
                {categoriesData && categoriesData.categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className='mb-3'>
              <label className='form-label' htmlFor="author">Autor:</label>
              <select className='form-control' id="author" name="author" value={formData.author} onChange={handleChange}>
                {authorsData && authorsData.authors.map(author => (
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

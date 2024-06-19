import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getUserIdFromToken } from '../../data/utils/localStorage';
import axios from "axios";
import BackButton from '../../ui/components/buttons/back';
import UpdateButton from '../../ui/components/buttons/update';
import { toast } from 'react-toastify';

export default function EditUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telephone: '',
    address: '',
    city: '',
    state: '',
    img: null
  });

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfoFromToken = async () => {
      try {
        const userId = getUserIdFromToken();
        const response = await axios.get(`http://localhost:3000/users/get/${userId}`);
        const userData = response.data;
        setUserInfo(userData);
        setFormData(userData);
      } catch (error) {
        toast.error('Error getting user information:', error);
      }
    };

    fetchUserInfoFromToken();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "state" && value.length > 2) {
      const truncatedValue = value.substring(0, 2);

      setFormData({
        ...formData,
        [name]: truncatedValue
      });
    } else if (name === 'img') {
      setFormData({
        ...formData,
        img: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e, userId) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('telephone', formData.telephone);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('city', formData.city);
    formDataToSend.append('state', formData.state);

    if (formData.img) {
      formDataToSend.append('img', formData.img);
    }

    try {
      const response = await axios.put(`http://localhost:3000/users/edit/${userId}`, formDataToSend);
      toast.success('Profile edited successfully!');
      setTimeout(() => {
        window.location.href = `/user/${userId}`;
      }, 2000);
    } catch (error) {
      toast.error('Error editing user profile:', error);
    }
  };
  const defaultImageUrl = "https://res.cloudinary.com/dechfylvy/image/upload/v1715889366/user_vhvvtc.png";

  if (!userInfo) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="all-content">
        <div className="row align-items-start">
          <div className="col-md-3">
            <img className="img-user" src={userInfo.img || defaultImageUrl} alt="" />
          </div>
          <div className="col-md-3">
            <h1 className="name">Thinking about changes?</h1>
          </div>
        </div>
      </div>
      <div className="container-edit">
        <form onSubmit={(e) => handleSubmit(e, userInfo.id)} noValidate className="validated-form" encType="multipart/form-data">

          <div className="row">
            <div className="col-md-12">
              <div className="mb-3">
                <label className="form-label" htmlFor="name">Name</label>
                <input className="form-control" type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                <div className="valid-feedback">
                  Looks good
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">Email</label>
                <input className="form-control" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                <div className="valid-feedback">
                  Looks good
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="telephone">Telephone</label>
                <input className="form-control" type="tel" id="telephone" name="telephone" value={formData.telephone} onChange={handleChange} required />
                <div className="valid-feedback">
                  Looks good
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="address">Address</label>
                <input className="form-control" type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
                <div className="valid-feedback">
                  Looks good
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="city">City</label>
                <input className="form-control" type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
                <div className="valid-feedback">
                  Looks good
                </div>
              </div>
              <div className='mb-3'>
                <label className='form-label' htmlFor="state">State:</label>
                <select className='form-control' id="state" name="state" value={formData.state} onChange={handleChange} required>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="img">Change main image</label>
                <input className="form-control" type="file" name="img" onChange={handleChange} />
              </div>
            </div>
          </div>
          <BackButton />
          <UpdateButton />
        </form>
      </div>
    </>
  );
}

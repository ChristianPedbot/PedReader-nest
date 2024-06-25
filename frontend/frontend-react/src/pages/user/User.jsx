import React, { useState, useEffect } from 'react';
import { getUserIdFromToken, logout } from '../../data/utils/localStorage';
import axios from "axios";
import UserBooks from './UserBooks';
import EditProfileButton from '../../ui/components/buttons/editProfile';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

function User() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    img: null
  });

  useEffect(() => {
    const fetchUserInfoFromToken = async () => {
      try {
        const userId = getUserIdFromToken();
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        const userData = response.data;
        setUserInfo(userData);
      } catch (error) {
        toast.error('Error getting user information:', error)
      }
    };

    fetchUserInfoFromToken();
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const defaultImageUrl = "https://res.cloudinary.com/dechfylvy/image/upload/v1715889366/user_vhvvtc.png";

  return (
    <div className="text-white">
      <div className="all-content">
        <div className="row align-items-start">
          <div className="col-md-3">
            <img className="img-user" src={userInfo.img || defaultImageUrl} alt="" />
          </div>
          <div className="col-md-3">
            <h1 className="name">Hello,<br />{userInfo.name}</h1>
            <Link to={`/user/${userInfo.id}/edit`} reloadDocument><EditProfileButton /></Link>
            <button className="btn btn-outline-danger m-3" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
      <h1 className="my-book">My books</h1>
      <UserBooks userId={userInfo.id} />
    </div>
  );
}

export default User;

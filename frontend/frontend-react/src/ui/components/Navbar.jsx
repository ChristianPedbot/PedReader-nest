import React, { useState, useEffect } from 'react';
import '../styles/components/navbar.css'
import { logout, isLoggedIn , getUserIdFromToken } from '../../data/utils/localStorage';
import axios from 'axios';

export default function Navbar() {
  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfoFromToken = async () => {
      try {
        const userId = getUserIdFromToken();
        const response = await axios.get(`http://localhost:3000/users/get/${userId}`);
        const userData = response.data;
        setUserInfo(userData);
      } catch (error) {
      }
    };

    if (isLoggedIn()) {
      fetchUserInfoFromToken();
    }
  }, []);

  const defaultImageUrl = "https://res.cloudinary.com/dechfylvy/image/upload/v1715889366/user_vhvvtc.png";

  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Ped<b>Reader</b></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {isLoggedIn() && userInfo ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/home">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/books">Books</a>
                  </li>
                  <span className={userInfo.isAdmin != null ? 'hidden-nav' : ''}>
                    {userInfo.isAdmin && (
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Adm Options
                        </a>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" href="/book/add">New book</a></li>
                          <li><a className="dropdown-item" href="/authors/add">New author</a></li>
                          <li><hr className="dropdown-divider" /></li>
                          <li><a className="dropdown-item" onClick={handleLogout}><b>Logout</b></a></li>
                        </ul>
                      </li>
                    )}
                  </span>
                  <li id="userNavItem" className='nav-link'>
                    <a href={userInfo.url}>{userInfo.url}</a>
                  </li>
                  <li id="userNameNavItem" className='nav-link'>
                    <a className='name-navbar' href={`/user/${userInfo.id}`}>{userInfo.name}</a>
                  </li>
                  <li id="userNameNavItem" className='nav-link'>
                    <img className='img-navbar' src={userInfo.img || defaultImageUrl} alt="" />
                  </li>
                </>
              ) : (
                <form action="/login">
                  <li><button className='btn-entrar'>Join us</button></li>
                </form>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

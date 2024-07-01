import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { getUserIdFromToken, logout } from '../../data/utils/localStorage';
import UserBooks from './UserBooks';
import EditProfileButton from '../../ui/components/buttons/editProfile';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { GET_USER } from '../../data/mutations/getUser';

function User() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(getUserIdFromToken());
  }, []);

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
    skip: !userId,
  });

  useEffect(() => {
    if (error) {
      toast.error('Error getting user information:', error.message);
    }
  }, [error]);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error loading user information</div>;
  }

  const { user } = data;
  const defaultImageUrl = "https://res.cloudinary.com/dechfylvy/image/upload/v1715889366/user_vhvvtc.png";

  return (
    <div className="text-white">
      <div className="all-content">
        <div className="row align-items-start">
          <div className="col-md-3">
            <img className="img-user" src={user.img || defaultImageUrl} alt="" />
          </div>
          <div className="col-md-3">
            <h1 className="name">Hello,<br />{user.name}</h1>
            <Link to={`/user/${user.id}/edit`} reloadDocument><EditProfileButton /></Link>
            <button className="btn btn-outline-danger m-3" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
      <h1 className="my-book">My books</h1>
      <UserBooks userId={user.id} />
    </div>
  );
}

export default User;

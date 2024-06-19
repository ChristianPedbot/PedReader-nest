import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/localStorage';

function ProtectedRoute({ element, ...rest }) {
  return isLoggedIn() ? element : window.location.href = "/login";
}

export default ProtectedRoute;

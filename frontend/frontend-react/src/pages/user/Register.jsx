import React from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import RegisterButton from '../../ui/components/buttons/register';
import { CREATE_USER } from '../../data/mutations/createUser';

function Register() {
  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      toast.info("Registering...");
      await createUser({
        variables: {
          createUserInput: userData
        }
      });
      toast.success('User registered successfully!');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      console.error('Error registering user:', error.message);
      toast.error('Error registering user!');
    }
  };

  return (
    <div className="container-auth">
      <div className="text-white">
        <center><h5>Register | Ped<b>Reader</b></h5></center>
        <form onSubmit={handleSubmit} method="POST">
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input type="text" name="name" className="form-control" placeholder="ex: Terry Crews" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input type="email" name="email" className="form-control" placeholder="ex: email@email.com" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input type="password" name="password" className="form-control" placeholder="add a strong password" required />
          </div>
          <div className="mb-3">
            <a href="/login" className='go-register'>You already have an account? <b>Login now</b></a>
          </div>
          <RegisterButton />
        </form>
      </div>
    </div>
  );
}

export default Register;

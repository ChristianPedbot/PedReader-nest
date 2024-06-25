import React, { useState } from 'react';
import axios from 'axios';
import { saveTokenToLocalStorage, saveUserIdToLocalStorage, getUserIdFromToken } from '../../data/utils/localStorage';
import LoginButton from '../../ui/components/buttons/login';
import '../../ui/styles/user/user.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:3000/users/login',
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const { token } = response.data;
            saveTokenToLocalStorage(token);
            const userId = getUserIdFromToken(token);
            console.log(userId);
            setError('');
            window.location.href = '/home'
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid credentials. Please try again.');
            } else {
                setError('Something went wrong. Please try again later.');
            }
        }
    };

    return (
        <div className="container-auth">
            <div className="text-white">
                <center><h5>Login | Ped<b>Reader</b></h5></center>
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="email" name="email" className="form-control" placeholder="ex: email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Senha:</label>
                        <input type="password" name="password" className="form-control" placeholder="ex: your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <a href="/register" className='go-register'>Don't have an account? <b>Register now</b></a>
                    </div>
                    <LoginButton />
                </form>
            </div>
        </div>
    );
}

export default Login;

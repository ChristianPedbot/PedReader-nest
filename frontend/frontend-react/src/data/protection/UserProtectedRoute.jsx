import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getUserIdFromToken } from '../utils/localStorage';

const ProtectedRouteUser = ({ element }) => {
    const { id } = useParams();
    const [userIdFromToken, setUserIdFromToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const userIdFromToken = await getUserIdFromToken();
                console.log('userIdFromToken:', userIdFromToken);
                setUserIdFromToken(String(userIdFromToken)); 
                setLoading(false);
            } catch (error) {
                console.error('Error fetching userId:', error);
                setLoading(false);
            }
        };
        fetchUserId();
    }, []);

    if (loading || userIdFromToken === null) {
        return <div>Loading...</div>;
    }

    return userIdFromToken === id ? element : <Navigate to="/login" replace />;
};

export default ProtectedRouteUser;

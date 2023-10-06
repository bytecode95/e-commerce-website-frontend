import { useState, useEffect } from 'react';
import instance from "../service/AxiosOrder.js";

export function useAuth() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [id, setID] = useState(null)
    //console.log(user);



    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            handleVerify(token)
        }
    }, []);

    const login = (token) => {
        //console.log(token)
        handleVerify(token);

    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
    };



    const handleVerify = (token) => {
        instance.get('/login/auth', {
                headers: {
                    token: token,
                },
            })
            .then((response) => {
                if (!response.data.error) {
                    localStorage.setItem('token', token);
                    setIsAuthenticated(true);
                    setUser(response.data.username);
                    setID(response.data.userId)
                } else {
                    console.error('Token verification failed');
                }

            })
            .catch((error) => {
                console.error(error.response);
            });

    };

    return {
        isAuthenticated,
        user,
        id,
        login,
        logout,
    };
}

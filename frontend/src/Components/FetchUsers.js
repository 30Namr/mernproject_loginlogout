import React, { useEffect, useState } from 'react'
import axios from 'axios';
function FetchUsers() {
    // const [user, setUsers] = useState([]);
    // const [error, setError] = useState("");

    // const dataFetch = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:5000/api/users");
    //         setUsers(response.data);
    //         console.log(response);
    //     } catch (err) {
    //         setError(err.message);
    //     }
    // };
    // useEffect(() => {
    //     dataFetch();
    // }, []);
    //normal fetch users

    const [user, setUsers] = useState([]);
    const [error, setError] = useState("");

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;
    const isAdmin = storedUser?.isAdmin;

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/users", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    const deletedUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(prevUsers => prevUsers.filter(u => u._id !== id));
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            console.log(err);
        }
    };


    useEffect(() => {
        if (token && isAdmin) {
            fetchData();
        }
        else {
            setError("You are not authorized to view this page.");
        }
    }, []);

    return (
        <div>
            {/* {user.length > 0 ? (
                user.map((item, index) => (
                    <ul key={index}>
                        <li>{item.id}</li>
                        <li>{item.name}</li>
                        <li>{item.email}</li>
                    </ul>
                ))
            ) : (
                <p>No User Available</p>
            )} */}

            <h3>All Users (Admin Only)</h3>
            {error && <p style={{ color: 'red' }}>Error:{error}</p>}
            <ul>
                {user.map(user => (
                    <li key={user._id}>
                        {user.name}({user.email})
                        {isAdmin && (
                            <button style={{ marginLeft: '10px' }} onClick={() => deletedUser(user._id)}>
                                Delete
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FetchUsers
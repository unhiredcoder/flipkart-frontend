import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Checkbox } from '@mui/material';
import { URL } from './DashBoardApp';



function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getusers();
    }, []);

    const getusers = async () => {
        try {
            const response = await fetch(`${URL}/dashboard/users`);
            const data = await response.json();
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    async function handleRoleUpdate(myuser, newRole) {
        const { value: password } = await Swal.fire({
            title: 'Enter superadmin password:',
            input: 'password',
            inputAttributes: {
                autocapitalize: 'off',
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: (password) => {
                // You can add additional validation here if needed
                return password;
            },
            allowOutsideClick: () => !Swal.isLoading(),
        });

        if (!password) {
            // The user clicked Cancel or closed the notification
            return;
        }

        try {
            // Make an API call to verify the password and update the role on the backend
            const response = await fetch(`${URL}/dashboard/api/updateUserRole/${myuser._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password,
                    newRole,
                }),
            });

            if (response.ok) {
                // Role update was successful
                // Update the user's role in the users state
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === myuser._id ? { ...user, role: newRole } : user
                    )
                );

                // Show success message using toast
                toast.success('User role updated successfully!', {
                    position: 'bottom-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else if (response.status === 401) {
                // Show error message for incorrect superadmin password
                toast.error('Incorrect superadmin password. Role update failed.', {
                    position: 'bottom-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else if (response.status === 403) {
                toast.warn('Changing role for superadmin is not allowed.', {
                    position: 'bottom-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                // Handle error response from role update request (optional)
                console.error('Error updating role:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating role:', error);
        }
    }

    return (
        <>
            <h1 className="jk">Users List</h1>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black' }}>UserId</th>
                            <th style={{ border: '1px solid black' }}>Role</th>
                            <th style={{ border: '1px solid black' }}>Email</th>
                            <th style={{ border: '1px solid black' }}>Username</th>
                            <th style={{ border: '1px solid black' }}>Phone</th>
                            <th style={{ border: '1px solid black' }}>IsAdmin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', background: 'white' }}>
                                    <img src="/loooding.svg" width={50} alt="Loading" />
                                </td>
                            </tr>
                        ) : users.length > 0 ? (
                            users.map((user, i) => (
                                <tr key={i}>
                                    <td data="UserId" style={{ border: '1px solid black' }}>
                                        {user._id}
                                    </td>
                                    <td data="Role" style={{ border: '1px solid black' }}>
                                        {user.role}
                                    </td>
                                    <td data="Email" style={{ border: '1px solid black' }}>
                                        {user.email}
                                    </td>
                                    <td data="Username" style={{ border: '1px solid black' }}>
                                        {user.username}
                                    </td>
                                    <td data="Phone" style={{ border: '1px solid black' }}>
                                        +91 {user.phone}
                                    </td>
                                    <td data="Actions" style={{ border: '1px solid black' }}>
                                        <Checkbox
                                            type="checkbox"
                                            checked={user.role === 'admin'}
                                            onChange={() => handleRoleUpdate(user, user.role === 'admin' ? 'user' : 'admin')}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="warn" colSpan={6}>
                                    No result found :(
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default UserList;

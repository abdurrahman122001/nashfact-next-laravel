"use client";

import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

const UserTable = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const usersPerPage = 10;

    // Fetch users
    const fetchUsers = async (page: number) => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:8000/api/users?page=${page}&limit=${usersPerPage}`,
            );
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const data = await response.json();
            setUsers(data.users);
            setTotalPages(data.last_page);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    // Open Edit Modal
    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    // Submit Edit Changes
    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;

        try {
            const response = await fetch(
                `http://localhost:8000/api/users/${selectedUser.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(selectedUser),
                },
            );

            if (!response.ok) {
                throw new Error("Failed to update user");
            }

            const updatedUser = await response.json();
            setUsers(
                users.map((user) =>
                    user.id === selectedUser.id ? updatedUser : user,
                ),
            );
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    // Open Delete Modal
    const handleDelete = (user: User) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    // Confirm Delete
    const confirmDelete = async () => {
        if (!selectedUser) return;

        try {
            const response = await fetch(
                `http://localhost:8000/api/users/${selectedUser.id}`,
                {
                    method: "DELETE",
                },
            );

            if (!response.ok) {
                throw new Error("Failed to delete user");
            }

            setUsers(users.filter((user) => user.id !== selectedUser.id));
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // Pagination navigation
    const renderPagination = () => {
        if (users.length < usersPerPage && page === 1) {
            return null;
        }

        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`px-3 py-1 ${
                        i === page ? "bg-blue-800 text-white" : "text-blue-500"
                    } rounded`}
                >
                    {i}
                </button>,
            );
        }

        return (
            <div className="mt-10 flex justify-end space-x-2">
                {page > 1 && (
                    <button
                        onClick={() => setPage(page - 1)}
                        className="rounded px-3 py-1 text-blue-500 hover:bg-gray-100"
                    >
                        Previous
                    </button>
                )}
                {pages}
                {page < totalPages && (
                    <button
                        onClick={() => setPage(page + 1)}
                        className="rounded px-3 py-1 text-blue-500 hover:bg-gray-100"
                    >
                        Next
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
                            <th className="min-w-[220px] px-4 py-4">Name</th>
                            <th className="min-w-[150px] px-4 py-4">Email</th>
                            <th className="min-w-[150px] px-4 py-4">
                                Registration Date
                            </th>
                            <th className="min-w-[150px] px-4 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="py-4 text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-4 py-4">{user.name}</td>
                                    <td className="px-4 py-4">{user.email}</td>
                                    <td className="px-4 py-4">
                                        {new Date(
                                            user.created_at,
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5">
                                    <div className="flex justify-center space-x-3.5">                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="hover:text-primary"
                                        >
                                            <svg
                                                className="h-5 w-5 fill-current"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M16.293 2.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-12 12a1 1 0 0 1-.402.246l-5 1.5a1 1 0 0 1-1.257-1.257l1.5-5a1 1 0 0 1 .246-.402l12-12zM6.414 15h2.828l9-9L15.414 6l-9 9zm-.586.586L2 19.414V17h2.586z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user)}
                                            className="hover:text-primary"
                                        >
                                            <svg
                                                className="fill-current"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M8.59048 1.87502H11.4084C11.5887 1.8749 11.7458 1.8748 11.8941 1.89849C12.4802 1.99208 12.9874 2.35762 13.2615 2.88403C13.3309 3.01727 13.3805 3.16634 13.4374 3.33745L13.5304 3.61654C13.5461 3.66378 13.5506 3.67715 13.5545 3.68768C13.7004 4.09111 14.0787 4.36383 14.5076 4.3747C14.5189 4.37498 14.5327 4.37503 14.5828 4.37503H17.0828C17.4279 4.37503 17.7078 4.65485 17.7078 5.00003C17.7078 5.34521 17.4279 5.62503 17.0828 5.62503H2.91602C2.57084 5.62503 2.29102 5.34521 2.29102 5.00003C2.29102 4.65485 2.57084 4.37503 2.91602 4.37503H5.41609C5.46612 4.37503 5.47993 4.37498 5.49121 4.3747C5.92009 4.36383 6.29844 4.09113 6.44437 3.6877C6.44821 3.67709 6.45262 3.66401 6.46844 3.61654L6.56145 3.33747C6.61836 3.16637 6.66795 3.01728 6.73734 2.88403C7.01146 2.35762 7.51862 1.99208 8.1047 1.89849C8.25305 1.8748 8.41016 1.8749 8.59048 1.87502ZM7.50614 4.37503C7.54907 4.29085 7.5871 4.20337 7.61983 4.1129C7.62977 4.08543 7.63951 4.05619 7.65203 4.01861L7.7352 3.7691C7.81118 3.54118 7.82867 3.49469 7.84602 3.46137C7.9374 3.2859 8.10645 3.16405 8.30181 3.13285C8.33892 3.12693 8.38854 3.12503 8.6288 3.12503H11.37C11.6103 3.12503 11.6599 3.12693 11.697 3.13285C11.8924 3.16405 12.0614 3.2859 12.1528 3.46137C12.1702 3.49469 12.1877 3.54117 12.2636 3.7691L12.3468 4.01846L12.379 4.11292C12.4117 4.20338 12.4498 4.29085 12.4927 4.37503H7.50614Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M4.92859 7.04179C4.90563 6.69738 4.60781 6.43679 4.2634 6.45975C3.91899 6.48271 3.6584 6.78053 3.68136 7.12494L4.06757 12.9181C4.13881 13.987 4.19636 14.8505 4.33134 15.528C4.47167 16.2324 4.71036 16.8208 5.20335 17.2821C5.69635 17.7433 6.2993 17.9423 7.01151 18.0355C7.69653 18.1251 8.56189 18.125 9.63318 18.125H10.3656C11.4369 18.125 12.3023 18.1251 12.9873 18.0355C13.6995 17.9423 14.3025 17.7433 14.7955 17.2821C15.2885 16.8208 15.5272 16.2324 15.6675 15.528C15.8025 14.8505 15.86 13.987 15.9313 12.9181L16.3175 7.12494C16.3404 6.78053 16.0798 6.48271 15.7354 6.45975C15.391 6.43679 15.0932 6.69738 15.0702 7.04179L14.687 12.7911C14.6121 13.9143 14.5587 14.6958 14.4416 15.2838C14.328 15.8542 14.1693 16.1561 13.9415 16.3692C13.7137 16.5824 13.4019 16.7206 12.8252 16.796C12.2307 16.8738 11.4474 16.875 10.3217 16.875H9.67718C8.55148 16.875 7.76814 16.8738 7.17364 16.796C6.59697 16.7206 6.28518 16.5824 6.05733 16.3692C5.82949 16.1561 5.67088 15.8542 5.55725 15.2838C5.44011 14.6958 5.38675 13.9143 5.31187 12.7911L4.92859 7.04179Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M7.8539 8.5448C8.19737 8.51045 8.50364 8.76104 8.53799 9.10451L8.95466 13.2712C8.989 13.6146 8.73841 13.9209 8.39495 13.9553C8.05148 13.9896 7.74521 13.739 7.71086 13.3956L7.29419 9.22889C7.25985 8.88542 7.51044 8.57915 7.8539 8.5448Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M12.1449 8.5448C12.4884 8.57915 12.739 8.88542 12.7047 9.22889L12.288 13.3956C12.2536 13.739 11.9474 13.9896 11.6039 13.9553C11.2604 13.9209 11.0098 13.6146 11.0442 13.2712L11.4609 9.10451C11.4952 8.76104 11.8015 8.51045 12.1449 8.5448Z"
                                                    fill=""
                                                />
                                            </svg>{" "}
                                        </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {renderPagination()}

            {/* Edit Modal */}
            {isEditModalOpen && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-[50%] rounded-lg border bg-white p-6">
                        <h2 className="mb-4 text-lg font-bold">Edit User</h2>
                        <form onSubmit={handleEditSubmit}>
                            <input
                                type="text"
                                value={selectedUser.name}
                                onChange={(e) =>
                                    setSelectedUser({
                                        ...selectedUser,
                                        name: e.target.value,
                                    })
                                }
                                className="mb-4 w-full rounded border px-4 py-2"
                            />
                            <input
                                type="email"
                                value={selectedUser.email}
                                onChange={(e) =>
                                    setSelectedUser({
                                        ...selectedUser,
                                        email: e.target.value,
                                    })
                                }
                                className="mb-4 w-full rounded border px-4 py-2"
                            />
                            <button
                                type="button"
                                onClick={() => setIsEditModalOpen(false)}
                                className="mr-2 rounded bg-gray-300 px-4 py-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded bg-blue-500 px-4 py-2 text-white"
                                style={{backgroundColor: '#030fa5'}}
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDeleteModalOpen && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-[50%] rounded-lg border bg-white p-6">
                        <h2 className="mb-4 text-lg font-bold">
                            Confirm Deletion
                        </h2>
                        <p>Are you sure you want to delete this user?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="mr-2 rounded bg-gray-300 px-4 py-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="rounded bg-red-500 px-4 py-2 text-white"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserTable;

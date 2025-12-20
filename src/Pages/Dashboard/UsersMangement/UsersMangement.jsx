import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const {
    refetch,
    data: users = [],
    isLoading,
  } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${searchText}`); // Fixed: "search"
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Make Admin?",
      text: `Are you sure you want to make ${user.displayName || user.email} an Admin?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Make Admin",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, { role: "admin" }).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.displayName || user.email} is now an Admin!`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    Swal.fire({
      title: "Remove Admin?",
      text: `Are you sure you want to remove admin privileges from ${user.displayName || user.email}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, { role: "user" }).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.displayName || user.email} is no longer an Admin`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">
          Users Management:{" "}
          <span className="text-primary">{users.length} User{users.length !== 1 && "s"}</span>
        </h2>

        {/* Search Bar */}
        <div className="mb-8 max-w-md">
          <label className="input input-bordered flex items-center gap-2 bg-white">
            <svg
              className="h-5 w-5 opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Search by name or email..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </label>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-xl">
            No users found matching your search.
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow-lg">
              <table className="table w-full">
                <thead className="bg-primary text-white text-left">
                  <tr>
                    <th className="pl-6">#</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th className="text-center">Make/Remove Admin</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition">
                      <th className="pl-6 font-medium">{index + 1}</th>
                      <td>
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={user.photoURL || "/default-avatar.png"}
                                alt={user.displayName}
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{user.displayName || "No Name"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-gray-600">{user.email}</td>
                      <td>
                        <span
                          className={`badge capitalize font-semibold ${
                            user.role === "admin" ? "badge-success" : "badge-neutral"
                          }`}
                        >
                          {user.role || "user"}
                        </span>
                      </td>
                      <td className="text-center">
                        {user.role === "admin" ? (
                          <button
                            onClick={() => handleRemoveAdmin(user)}
                            className="btn btn-ghost btn-lg text-red-600 hover:bg-red-50"
                            title="Remove Admin"
                          >
                            <FiShieldOff size={22} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleMakeAdmin(user)}
                            className="btn btn-ghost btn-lg text-green-600 hover:bg-green-50"
                            title="Make Admin"
                          >
                            <FaUserShield size={22} />
                          </button>
                        )}
                      </td>
                      <td className="text-center">
                        <button className="btn btn-ghost btn-lg text-info hover:bg-info/10">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="grid gap-4 md:hidden">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-white rounded-2xl shadow-md p-5 flex gap-4 items-start"
                >
                  <div className="avatar">
                    <div className="mask mask-squircle w-16 h-16">
                      <img
                        src={user.photoURL || "/default-avatar.png"}
                        alt={user.displayName}
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="font-bold text-lg">{user.displayName || "No Name"}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Role:</span>
                      <span
                        className={`badge capitalize ${
                          user.role === "admin" ? "badge-success" : "badge-neutral"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {user.role === "admin" ? (
                        <button
                          onClick={() => handleRemoveAdmin(user)}
                          className="btn btn-outline btn-error btn-sm"
                        >
                          <FiShieldOff /> Remove Admin
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="btn btn-outline btn-success btn-sm"
                        >
                          <FaUserShield /> Make Admin
                        </button>
                      )}
                      <button className="btn btn-outline btn-info btn-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;
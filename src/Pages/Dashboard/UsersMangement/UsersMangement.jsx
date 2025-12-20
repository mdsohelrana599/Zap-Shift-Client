import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UsersMangement = () => {
  const axiosSecure = useAxiosSecure();

  const {
    refetch,
    data: users = [],
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
const handelMakeAdmin = (user) => {
  Swal.fire({
    title: "Make Admin?",
    text: `Are you sure you want to make ${user.displayName || user.email} an Admin?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#10B981", // green
    cancelButtonColor: "#6B7280",
    confirmButtonText: "Yes, Make Admin",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      const roleinfo = { role: "admin" };
      axiosSecure.patch(`/users/${user._id}`, roleinfo).then((res) => {
        console.log(res.data);
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

const handelRemoveAdmin = (user) => {
  Swal.fire({
    title: "Remove Admin?",
    text: `Are you sure you want to remove admin privileges from ${user.displayName || user.email}?`,
    icon: "warning",
    showCancelButton: true,        // ← Fixed: Capital C and B
    confirmButtonColor: "#EF4444", // red
    cancelButtonColor: "#6B7280",
    confirmButtonText: "Yes, Remove",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      const roleinfo = { role: "user" };
      axiosSecure.patch(`/users/${user._id}`, roleinfo).then((res) => {
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

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">
        Users Management: <span className="text-primary">{users.length}</span>
      </h2>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Admin Action</th>
              <th className="text-center">Others Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photoURL} alt={user.displayName} />
                      </div>
                    </div>
                    <div className="font-bold">{user.displayName}</div>
                  </div>
                </td>

                <td className="text-sm text-gray-500">{user.email}</td>

                <td>
                  <span
                    className={`badge capitalize ${
                      user.role === "admin" ? "badge-success" : "badge-neutral"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="text-center">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handelRemoveAdmin(user)}
                      className="btn btn-ghost btn-lg"
                    >
                      <FiShieldOff></FiShieldOff>
                    </button>
                  ) : (
                    <button
                      onClick={() => handelMakeAdmin(user)}
                      className="btn btn-ghost btn-lg"
                    >
                      <FaUserShield></FaUserShield>
                    </button>
                  )}
                </td>

                <td className="text-center">
                  <button className="btn btn-ghost btn-lg">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="grid gap-4 md:hidden">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-xl shadow p-4 flex gap-4"
          >
            <div className="avatar">
              <div className="mask mask-squircle h-14 w-14">
                <img src={user.photoURL} alt={user.displayName} />
              </div>
            </div>

            <div className="flex-1 space-y-1">
              <h3 className="font-bold">{user.displayName}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>

              <span
                className={`badge badge-sm capitalize ${
                  user.role === "admin" ? "badge-success" : "badge-neutral"
                }`}
              >
                {user.role}
              </span>

              <div className="pt-2">
                {user.role === "admin" ? (
                  <button  onClick={() => handelRemoveAdmin(user)} className="btn btn-ghost btn-outline  btn-lg w-full">
                    <FiShieldOff></FiShieldOff>
                  </button>
                ) : (
                  <button
                    onClick={() => handelMakeAdmin(user)}
                    className="btn btn-ghost btn-outline  btn-lg w-full"
                  >
                    <FaUserShield></FaUserShield>
                  </button>
                )}
              </div>
              <div className="pt-2">
                <button className="btn btn-outline btn-lg w-full">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <p className="text-center py-10 text-gray-500">No users found</p>
      )}
    </div>
  );
};

export default UsersMangement;

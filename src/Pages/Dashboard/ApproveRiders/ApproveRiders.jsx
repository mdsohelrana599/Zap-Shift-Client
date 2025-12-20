import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUserCheck, FaTrashCan, FaEye } from "react-icons/fa6";
import { IoPersonRemove } from "react-icons/io5";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const {
    refetch,
    data: riders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      // ✅ only pending riders
      return res.data.filter((r) => r.status !== "approved");
    },
  });

  const updateRidersStatus = (id, status) => {
    axiosSecure.patch(`/riders/${id}`, { status }).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider ${status}`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Rider?",
      text: "This will permanently remove the application.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/riders/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire("Deleted!", "Rider removed.", "success");
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

  if (isError) {
    return <p className="text-center text-red-500">Failed to load riders</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Manage Rider Applications
          </h2>
          <p className="mt-2 text-gray-600">
            Total Pending:{" "}
            <span className="font-bold text-primary">{riders.length}</span>
          </p>
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
          <table className="table w-full">
            <thead className="bg-primary text-white">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>District</th>
                <th>Phone</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td className="font-semibold">{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        rider.status === "pending"
                          ? "badge-warning"
                          : "badge-error"
                      }`}
                    >
                      {rider.status}
                    </span>
                  </td>
                  <td>{rider.district}</td>
                  <td>{rider.phone}</td>
                  <td className="flex gap-2 justify-center">
                    <button
                      className="btn btn-primary btn-sm"
                    >
                      <FaEye></FaEye>
                    </button>
                    <button
                      onClick={() =>
                        updateRidersStatus(rider._id, "approved")
                      }
                      className="btn btn-success btn-sm"
                    >
                      <FaUserCheck />
                    </button>
                    <button
                      onClick={() =>
                        updateRidersStatus(rider._id, "rejected")
                      }
                      className="btn btn-warning btn-sm"
                    >
                      <IoPersonRemove />
                    </button>
                    <button
                      onClick={() => handleDelete(rider._id)}
                      className="btn btn-error btn-sm"
                    >
                      <FaTrashCan />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE CARD VIEW ================= */}
        <div className="grid gap-4 md:hidden">
          {riders.map((rider) => (
            <div
              key={rider._id}
              className="bg-white rounded-xl shadow p-4 space-y-2"
            >
              <h3 className="font-bold text-lg">{rider.name}</h3>
              <p className="text-sm text-gray-500">{rider.email}</p>
              <p>
                <span className="font-medium">District:</span>{" "}
                {rider.district}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {rider.phone}
              </p>

              <span className="badge badge-warning">{rider.status}</span>

              <div className="flex gap-2 pt-2">
                <button
                      className="btn btn-primary btn-sm flex-1 text-black"
                    >
                      <FaEye></FaEye>
                    </button>
                <button
                  onClick={() => updateRidersStatus(rider._id, "approved")}
                  className="btn btn-success btn-sm flex-1"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateRidersStatus(rider._id, "rejected")}
                  className="btn btn-warning btn-sm flex-1"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleDelete(rider._id)}
                  className="btn btn-error btn-sm flex-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {riders.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No pending applications found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ApproveRiders;

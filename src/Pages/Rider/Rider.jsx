import React from "react";
import riderImg from "../../assets/agent-pending.png"; // Update path if needed
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";

const Rider = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const serviceCenters = useLoaderData(); // assuming this is an array of { region, district, warehouse, _id }

  // Extract unique regions
  const regions = [...new Set(serviceCenters.map((c) => c.region))];

  // Watch selected region
  const selectedRegion = watch("region");

  // Get districts for selected region
  const districts = selectedRegion
    ? [
        ...new Set(
          serviceCenters
            .filter((c) => c.region === selectedRegion)
            .map((c) => c.district)
        ),
      ]
    : [];

  // Get warehouses for selected region
  const warehouses = selectedRegion
    ? serviceCenters.filter((c) => c.region === selectedRegion)
    : [];

  const onSubmit = (data) => {
    // const applicationData = {
    //   ...data,
    //   email: user?.email,
    //   name: data.name || user?.displayName,
    //   status: "pending",
    //   appliedAt: new Date(),
    // };
    console.log("data", data);

    axiosSecure
      .post("/riders", data)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Application Submitted!",
            text: "We will review your application soon.",
            timer: 3000,
            showConfirmButton: false,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Something went wrong. Please try again.",
        });
        console.log("error", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="p-8 md:p-12">
          {/* Header */}
          <h2 className="text-4xl font-bold text-primary">Be a Rider</h2>
          <p className="mt-4 text-gray-600 max-w-2xl">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <h3 className="text-2xl font-semibold text-gray-800">
                Tell us about yourself
              </h3>

              {/* Name & Age */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    defaultValue={user?.displayName || ""}
                    className="input input-bordered w-full"
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Age
                  </label>
                  <input
                    type="number"
                    {...register("age", {
                      required: "Age is required",
                      min: { value: 18, message: "Must be 18 or older" },
                    })}
                    className="input input-bordered w-full"
                    placeholder="Your age"
                  />
                  {errors.age && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.age.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email & District */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email || ""}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Region
                  </label>
                  <select
                    {...register("region", { required: "Region is required" })}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select Region</option>
                    {regions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.region && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.region.message}
                    </p>
                  )}
                </div>
              </div>

              {/* NID & Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    NID No
                  </label>
                  <input
                    type="text"
                    {...register("nid", {
                      required: "NID is required",
                      pattern: {
                        value: /^\d{10,17}$/,
                        message: "Invalid NID number",
                      },
                    })}
                    className="input input-bordered w-full"
                    placeholder="NID"
                  />
                  {errors.nid && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.nid.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact
                  </label>
                  <input
                    type="tel"
                    {...register("phone", {
                      required: "Phone is required",
                      pattern: {
                        value: /^01[3-9]\d{8}$/,
                        message: "Invalid BD phone number",
                      },
                    })}
                    className="input input-bordered w-full"
                    placeholder="Contact"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Region & Warehouse */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your District
                </label>
                <select
                  {...register("district", {
                    required: "District is required",
                  })}
                  className="select select-bordered w-full"
                  disabled={!selectedRegion}
                >
                  <option value="">
                    {selectedRegion
                      ? "Select your District"
                      : "First select Region"}
                  </option>
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.district.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Which wire-house you want to work?
                </label>
                <select
                  {...register("warehouse", {
                    required: "Warehouse is required",
                  })}
                  className="select select-bordered w-full"
                  disabled={!selectedRegion}
                >
                  <option value="">
                    {selectedRegion
                      ? "Select wire-house"
                      : "First select Region"}
                  </option>
                  {warehouses.map((w) => (
                    <option key={w._id} value={w.warehouse}>
                      {w.warehouse} {w.district}
                    </option>
                  ))}
                </select>
                {errors.warehouse && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.warehouse.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <input
                type="submit"
                className="btn bg-primary w-full hover:bg-lime-500 text-black hover:text-white"
                value="Submit Application"
              />
            </form>

            {/* Rider Image */}
            <div className=" lg:flex mx-auto justify-center items-center">
              <img
                src={riderImg}
                alt="Delivery Rider"
                className="w-full max-w-md object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rider;

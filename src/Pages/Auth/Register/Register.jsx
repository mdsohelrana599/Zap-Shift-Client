import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../socialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation()
  const navigate =  useNavigate()
  const axiosSecure = useAxiosSecure()

  const handleRegister = (data) => {
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_API_URl = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;
        axios.post(image_API_URl, formData).then((res) => {
          const photoURL = res.data.data.url;

          //
          const userInfo = {
            email: data.email,
            displayName: data.name,
             photoURl: photoURL,
          }
          axiosSecure.post("/users", userInfo)
          .then(res => {
            if(res.data.insertedId){
              console.log('user created in tha database,')
            }
          })

          // updata user profile
          const userProfile = {
            displayName: data.name,
            photoURl: photoURL,
          };
          updateUserProfile(userProfile)
          .then(()=>{
            navigate(location.state || '/')
          })
          .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" flex items-center justify-center bg-base-200 py-10">
      <div className="w-full max-w-md  bg-white rounded-2xl p-8">
        <div className="mb-6">
          <h2 className="text-4xl font-bold  text-secondary">
            Create an Account
          </h2>
          <p className="mb-6 text-sm font-semibold">Register with ZapShift</p>
        </div>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          {/* Image */}
          <div className="mb-4">
            <label className="label">
              <span className="label-text font-semibold">Photo</span>
            </label>

            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input file-input-bordered w-full"
            />

            {errors.photo?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">Photo is required.</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter your Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500 text-sm">Name is required.</p>
            )}
          </div>
          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-sm">Email is required.</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>

            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{6,}$/,
              })}
              className="input input-bordered w-full"
              placeholder="Enter your password"
            />

            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm">Password is required.</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm">
                Password must be at least 6 characters.
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 text-sm">
                Must include upper, lower, number & special character.
              </p>
            )}
          </div>

          {/* Register Button */}
          <button className="btn btn-neutral w-full mt-2">Register</button>
        </form>

        {/* Footer */}
        <p className=" mt-4 text-sm">
          Already have an account?
          <Link state={location.state} to="/login" className="link text-secondary font-semibold">
            Login
          </Link>
        </p>
        <p className="text-center text-gray-500 mt-3">Or</p>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;

import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { singInUser } = useAuth();

  const handlelogin = (data) => {
    console.log("form data", data);
    singInUser(data.email, data.password)
      .then((result) => console.log(result.user))
      .catch((error) => console.log(error));
  };

  return (
    <div className=" flex items-center justify-center bg-base-200 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-secondary">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit(handlelogin)} className="space-y-4">
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

          {/* Forgot Password */}
          <div className="">
            <a className="link link-hover text-sm">Forgot password?</a>
          </div>

          {/* Login Button */}
          <button className="btn btn-neutral w-full mt-2">Login</button>
        </form>

        {/* Footer */}
        <p className=" mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to='/register' className="link text-secondary font-semibold">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

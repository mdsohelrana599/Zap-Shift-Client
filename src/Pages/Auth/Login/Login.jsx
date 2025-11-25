import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../socialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { singInUser, resetPassword } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  // Forgot password modal states
  const [openModal, setOpenModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [message, setMessage] = useState("");

  const handlelogin = (data) => {
    singInUser(data.email, data.password)
      .then((result) => {
         console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => console.log(error));
  };

  const handleResetPassword = () => {
    if (!resetEmail) {
      setMessage("Please enter your email.");
      return;
    }

    resetPassword(resetEmail)
      .then(() => {
        setMessage("Password reset link sent to your email.");
      })
      .catch(() => {
        setMessage("Invalid or unregistered email.");
      });
  };

  return (
    <>
      <div className="flex items-center justify-center bg-base-200 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-secondary">Welcome Back</h2>
          <p className="mb-6 text-sm font-semibold">Login with ZapShift</p>

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
            <div>
              <button
                type="button"
                onClick={() => setOpenModal(true)}
                className="link link-hover text-sm"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button className="btn btn-neutral w-full mt-2">Login</button>
          </form>

          <p className="mt-4 text-sm">
            Don’t have an account?{" "}
            <Link
              state={location.state}
              to="/register"
              className="link text-secondary font-semibold"
            >
              Register
            </Link>
          </p>

          <p className="text-center text-gray-500 mt-3">Or</p>
          <SocialLogin></SocialLogin>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80">
            <h3 className="text-xl font-bold mb-2">Reset Password</h3>
            <p className="text-sm text-gray-600 mb-2">
              Enter your email to receive reset link.
            </p>

            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />

            {message && <p className="text-sm text-blue-600 mt-2">{message}</p>}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setOpenModal(false)}
                className="btn btn-sm btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                className="btn btn-sm btn-neutral"
              >
                Send Link
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;

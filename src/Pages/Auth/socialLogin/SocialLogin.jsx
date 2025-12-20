import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const SocialLogin = () => {
  const { signInGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGooleSignIn = () => {
    signInGoogle()
      .then((result) => {
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };

        axiosSecure.post("/users", userInfo).then(() => {
          navigate(location.state?.from || "/", { replace: true });
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="text-center mt-5">
      <button
        onClick={handleGooleSignIn}
        className="btn bg-white w-full text-black border border-gray-300"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          viewBox="0 0 512 512"
        >
          <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
          <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
          <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
          <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
        </svg>
        <span className="ml-2">Login with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;

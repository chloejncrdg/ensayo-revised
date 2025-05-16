import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, loginSuccess } from "../redux/userSlice";

function VerifyEmail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");
  const { currentUser } = useSelector((state) => state.user);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axiosInstance.post("/users/verify-email", { token });
        if (response.data.success) {
          if (currentUser) {
            dispatch(updateUser({ isVerified: true }));
          } else {
            dispatch(loginSuccess(response.data.user)); // treat this like a login
          }
          setStatus("Email verified successfully! Redirecting...");
        
          setTimeout(() => {
            navigate("/"); // Go straight to homepage or dashboard
          }, 2000);
        } else {
          setStatus("Invalid or expired token.");
        }
      } catch (error) {
        console.log(error);
        setStatus("An error occurred during verification.");
      }
    };

    verifyEmail();
  }, [token, dispatch, currentUser, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h1 className="text-2xl font-sf-bold text-center text-blue-800">Email Verification</h1>
        <p className="font-sf-regular mt-4 text-gray-600 text-center">{status}</p>
        {status.includes("successfully") && (
          <div className="mt-4 text-center">
            <p className="font-sf-regular text-sm text-gray-500">Refreshing the page...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
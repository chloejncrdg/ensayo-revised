import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import axios from 'axios';

function VerifyEmailPrompt() {
    const { currentUser } = useSelector((state) => state.user);

    const [cooldown, setCooldown] = useState(0);
    const [resendMessage, setResendMessage] = useState("")

    const axiosInstance = axios.create({
        baseURL:process.env.REACT_APP_API_URL,
        withCredentials: true
    });

    if (!currentUser) {
        return <Navigate to="/404" />; // Redirect to a 404 page if not in registration process
    }

    const handleResend = async () => {
        try {
          const response = await axiosInstance.post("/users/resend-verification", { currentUser });
          setResendMessage(response.data.message);
      
          // Start cooldown
          setCooldown(60);
          const interval = setInterval(() => {
            setCooldown(prev => {
              if (prev <= 1) {
                clearInterval(interval);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        } catch (err) {
          setResendMessage(err.response?.data?.message || "Failed to resend email.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-md rounded px-6 pt-6 pb-8 mb-4 w-full max-w-md">
                <h1 className="text-3xl font-sf-bold text-center text-blue-800">Verify Your Email</h1>
                {!currentUser || !currentUser.isVerified ? (
                    <>
                        <p className="font-sf-regular mt-4 text-gray-500 text-center">
                            We've sent a verification link to your email. Please check your inbox and click the link to verify your account.
                        </p>
                        <p className="font-sf-regular mt-4 text-gray-400 text-center text-sm">
                            Didn't receive the email? Check your spam folder or contact support.
                        </p>
                        <div className="flex justify-center items-center">
                            <button
                                disabled={cooldown > 0}
                                onClick={handleResend}
                                className="font-sf-regular underline text-sm mt-8 text-gray-600"
                            >
                                {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Verification Email"}
                            </button>
                        </div>
                        <p className="flex justify-center items-center font-sf-regular text-sm mt-2 text-gray-600">{resendMessage}</p>
                    </>
                ) : (
                    <>
                        <p className="mt-4 text-gray-600 text-center">
                            Your email has been verified. Please log in again.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default VerifyEmailPrompt;

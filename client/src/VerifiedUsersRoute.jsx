import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const VerifiedUsersRoute = ({ children }) => {
    const { currentUser } = useSelector((state) => state.user);

    // Allow access if user is not logged in
    if (!currentUser) {
        return children;
    }

    // Redirect to email verification prompt if logged in but not verified
    if (!currentUser.isVerified) {
        return <Navigate to="/verify-email-prompt" />;
    }

    // Allow access if logged in and verified
    return children;
};

export default VerifiedUsersRoute;


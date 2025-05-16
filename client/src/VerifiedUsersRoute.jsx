import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const VerifiedUsersRoute = ({ children }) => {
    const { currentUser } = useSelector((state) => state.user);

    if (!currentUser.isVerified) {
        // Redirect to email verification prompt if the user is not verified
        return <Navigate to="/verify-email-prompt" />;
    }

    // Allow access if the user is authenticated and verified
    return children;
};

export default VerifiedUsersRoute;
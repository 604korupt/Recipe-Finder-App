import React from "react";
import { auth, provider } from "../../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const Login: React.FC = () => {
    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
            // after login, redirect to home page
            window.location.href = "/";

        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-top h-screen">
            <h1 className="text-3xl font-bold mb-4">Login with Google</h1>
            <button
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Sign in with Google
            </button>
        </div>
    );
};

export default Login; 
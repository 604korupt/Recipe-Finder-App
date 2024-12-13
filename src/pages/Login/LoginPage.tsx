import React, {useEffect, useState} from "react";
import PopUp from "reactjs-popup";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider, twitterProvider } from "../../firebaseConfig";
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification  } from "firebase/auth";
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSignUpMode, setIsSignUpMode] = useState<boolean>(false);  // Toggle between login and sign up
    const [showPasswordRequirements, setShowPasswordRequirements] = useState<boolean>(false);  // Show password requirements
    const [signedUp, setSignedUp] = useState<boolean>(false);  // Show message after sign-up
    const [, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    // if user is already logged in, but using email/password, and their email is not verified, don't switch to profile
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsLoggedIn(!!user);
            if (user?.providerData.some((userInfo) => userInfo.providerId === 'password') && !user.emailVerified) {
                return;
            } else if (user) {
                navigate("/profile");
            }
        });
        return unsubscribe;
    });

    const handleLogin = async (provider: any) => {
        try {
            await signInWithPopup(auth, provider);
            // After login, redirect to the home page
            navigate("/");
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        // Prevent the form from refreshing the page
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // After successful sign-up, send email verification
            const user = userCredential.user;
            if (user && !user.emailVerified) {
                await sendEmailVerification(user);
                setSignedUp(true);
            }
        } catch (error) {
            console.error("Error during sign-up:", error);
            setError("Sign-up failed. Please try again.");
        }
    };

    // Handle login with email and password
    const handleLoginWithEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // if email is not verified, do not allow login
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            if (user && !user.emailVerified) {
                setError("Please verify your email before logging in.");
                return;
            }
            navigate("/");
        } catch (error) {
            console.error("Error during login:", error);
            setError("Login failed. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-top h-screen">
            {/* Heading */}
            <h1 className="text-3xl font-bold mb-4">{t('login')}</h1>
            
            {/* Google sign in button */}
            <button
                onClick={() => handleLogin(googleProvider)}
                className="gsi-material-button flex items-center justify-center px-6 py-2 bg-white text-black border border-black rounded hover:bg-gray-200 whitespace-nowrap"
                style={{ margin: "10px" }}
            >
                {/* this is the icon for Google */}
                <div className="gsi-material-button-state">
                    <div className="gsi-material-button-content-wrapper" style={{ display: "flex", alignItems: "center" }}>
                        <div className="gsi-material-button-icon" style={{ display: "flex", alignItems: "center" }}>
                            <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                style={{ display: "block", width: "24px", height: "24px" }}
                            >
                                <path
                                    fill="#EA4335"
                                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                ></path>
                                <path
                                    fill="#4285F4"
                                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                                ></path>
                                <path
                                    fill="#FBBC05"
                                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                                ></path>
                                <path
                                    fill="#34A853"
                                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                                ></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </svg>
                        </div>
                        <span className="gsi-material-button-contents" style={{ marginLeft: "8px" }}>{t('google')}</span>
                    </div>
                </div>
            </button>
            {/* Twitter sign in button */}
            <button
                onClick={() => handleLogin(twitterProvider)}
                className="gsi-material-button flex items-center justify-center px-6 py-2 bg-white text-black border border-black rounded hover:bg-gray-200 whitespace-nowrap"
                style={{ margin: "10px" }}
            >
                {/* this is the icon for Twitter */}
                <div className="gsi-material-button-state">
                    <div className="gsi-material-button-content-wrapper" style={{ display: "flex", alignItems: "center" }}>
                        <div className="gsi-material-button-icon" style={{ display: "flex", alignItems: "center" }}>
                            <svg width="26px" height="24px" viewBox="0 0 1200 1227" xmlns="http://www.w3.org/2000/svg">
                                <path 
                                    d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" 
                                    fill="black"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <span className="gsi-material-button-contents" style={{ marginLeft: "8px" }}>{t('twitter')}</span>
            </button>

            {/* Display error message */}
            {error && <p className="text-red-500 text-sm mb-2">{t(error.includes("Sign-up") ? 'signedUpFail' : 'loggedInFail')}</p>}

            {/* Display message after sign-up */}
            {signedUp && <p className="text-green-500 text-sm mb-2">{t('signUpSuccess')}</p>}

            {/* Toggle between login and sign-up form */}
            <form className="flex flex-col items-center" onSubmit={isSignUpMode ? handleSignUp : handleLoginWithEmail}>
                <input
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    className="mb-2 p-2 border border-gray-300 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <div className="relative w-full">
                    <input
                        type="password"
                        placeholder={t('passwordPlaceholder')}
                        className="mb-2 p-2 border border-gray-300 rounded w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        onFocus={() => setShowPasswordRequirements(true)}
                        onBlur={() => setShowPasswordRequirements(false)}
                    />
                    {isSignUpMode && (
                        <PopUp
                            trigger={<div />}
                            position="right center"
                            open={showPasswordRequirements}
                            on="focus"
                        >
                            <div className="mt-1 p-2 bg-white border border-gray-300 rounded">
                                <p className="text-sm">Password must contain:</p>
                                <ul className="text-sm list-disc list-inside">
                                    <li className={password.length >= 6 ? "text-green-500" : "text-red-500"}>At least 6 characters</li>
                                    <li className={/[A-Z]/.test(password) ? "text-green-500" : "text-red-500"}>At least one uppercase letter</li>
                                    <li className={/[a-z]/.test(password) ? "text-green-500" : "text-red-500"}>At least one lowercase letter</li>
                                    <li className={/[0-9]/.test(password) ? "text-green-500" : "text-red-500"}>At least one number</li>
                                    <li className={/[^A-Za-z0-9]/.test(password) ? "text-green-500" : "text-red-500"}>At least one special character</li>
                                </ul>
                            </div>
                        </PopUp>
                    )}
                </div>
                {/* forgot password link */}
                <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">{t('forgotPW')}</Link>
                <button
                    type="submit"
                    className={`font-poppins px-6 py-2 bg-green-500 text-white border rounded hover:bg-green-600 mb-2`}
                    style={{ color: "white" }}
                >
                    {t(isSignUpMode ? 'signUpButton' : 'loginButton')}
                </button>
            </form>

            {/* Toggle between login and sign-up modes */}
            <button
                onClick={() => setIsSignUpMode(!isSignUpMode)}
                className="text-sm text-blue-500 hover:underline"
            >
                {t(isSignUpMode ? 'alreadyAccount' : 'noAccount')}
            </button>
        </div>
    );
};

export default Login;

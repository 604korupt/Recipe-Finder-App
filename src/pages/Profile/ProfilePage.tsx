import { useState, useEffect } from 'react';
import { auth } from '../../firebaseConfig';
import { User, signOut, updateEmail, updatePassword, onAuthStateChanged, updateProfile } from 'firebase/auth';

const Profile = () => {
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newName, setNewName] = useState('');
    const [error, setError] = useState('');
    const [errorEmail, setErrorEmail] = useState('');  
    const [errorPassword, setErrorPassword] = useState('');  
    const [user, setUser] = useState<User | null>(null); // user can be null or User
    const [loading, setLoading] = useState(true); // to handle loading state
    const [showPasswordRequirements, setShowPasswordRequirements] = useState<boolean>(false);


    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
            setLoading(false); // Once auth state is determined, set loading to false
        });

        // Clean up the listener when component unmounts
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            window.location.href = "/"; // Or use React Router's navigate
            console.log("Logout successful");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const handleChangeDisplayName = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('User is not authenticated');
            }
            // Sanitize the new display name to prevent XSS attacks
            const sanitizedNewName = newName.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            // Update the user's display name
            await updateProfile(user, { displayName: sanitizedNewName });
            console.log('Display name updated');
            window.location.reload();
        } catch (error) {
            setError('Error updating display name');
            console.error('Error updating display name:', error);
        }
    };

    const handleChangeEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('User is not authenticated');
            }

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            // if the email does not meet the requirements in the regex, throw an error
            if (!emailRegex.test(newEmail)) {
                throw new Error('Invalid email address');
            }
            await updateEmail(user, newEmail);
            console.log('Email updated');
            window.location.reload();
        } catch (error) {
            setErrorEmail('Error updating email');
            console.error('Error updating email:', error);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {       
        e.preventDefault(); 
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('User is not authenticated');
            }

            // if the password does not meet the requirements, throw an error
            if (newPassword.length < 6) {
                throw new Error('Password must be at least 6 characters long');
            }
            if (!/[A-Z]/.test(newPassword)) {
                throw new Error('Password must contain at least one uppercase letter');
            }
            if (!/[a-z]/.test(newPassword)) {
                throw new Error('Password must contain at least one lowercase letter');
            }
            if (!/[0-9]/.test(newPassword)) {
                throw new Error('Password must contain at least one number');
            }
            if (!/[^A-Za-z0-9]/.test(newPassword)) {
                throw new Error('Password must contain at least one special character');
            }

            await updatePassword(user, newPassword);
            console.log('Password updated');
            window.location.reload();
        } catch (error) {
            setErrorPassword('Error updating password');
            console.error('Error updating password:', error);
        }
    };

    // If loading, display a loading state
    if (loading) {
        return <div className="flex flex-col items-center gap-5">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center gap-5">
            <h1 className="text-4xl font-bold">Profile</h1>
            {user ? (
                <div className="flex flex-col items-start gap-2">
                    <p className="text-lg">Name: {user.displayName || "No display name set"}</p>
                    <p className="text-lg">Email: {user.email}</p>
                </div>
            ) : (
                <p>User not authenticated</p>
            )}

            {user?.providerData[0]?.providerId === 'password' && (
                <>
                    {error && <p className="text-red-500">{error}</p>}

                    {/* Set new display name */}
                    <form className="flex flex-col gap-2" onSubmit={handleChangeDisplayName}>
                        <label htmlFor="displayName" className="text-lg">Change Display Name:</label>
                        <input
                            type="displayName"
                            id="displayName"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md"
                        />
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">Change Display Name</button>
                    </form>

                    {errorEmail && <p className="text-red-500">{errorEmail}</p>}

                    <form className="flex flex-col gap-2" onSubmit={handleChangeEmail}>
                        <label htmlFor="email" className="text-lg">Change Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md"
                        />
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">Change Email</button>
                    </form>

                    {errorPassword && <p className="text-red-500">{errorPassword}</p>}

                    <form className="flex flex-col gap-2" onSubmit={handleChangePassword}>
                        <label htmlFor="password" className="text-lg">Change Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md"
                            onFocus={() => setShowPasswordRequirements(true)}
                            onBlur={() => setShowPasswordRequirements(false)}
                        />
                        {showPasswordRequirements && (
                            <div className="mt-1 p-2 bg-white">
                                <p className="text-sm">Password must contain:</p>
                                <ul className="text-sm list-disc list-inside">
                                    <li className={newPassword.length >= 6 ? "text-green-500" : "text-red-500"}>At least 6 characters</li>
                                    <li className={/[A-Z]/.test(newPassword) ? "text-green-500" : "text-red-500"}>At least one uppercase letter</li>
                                    <li className={/[a-z]/.test(newPassword) ? "text-green-500" : "text-red-500"}>At least one lowercase letter</li>
                                    <li className={/[0-9]/.test(newPassword) ? "text-green-500" : "text-red-500"}>At least one number</li>
                                    <li className={/[^A-Za-z0-9]/.test(newPassword) ? "text-green-500" : "text-red-500"}>At least one special character</li>
                                </ul>
                            </div>
                        )}
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">Change Password</button>
                    </form>
                </>
            )}

            {user ? (<button
                onClick={handleLogout}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
                Logout
            </button>) : (
                <p></p>
            )}
            
        </div>
    );
};

export default Profile;

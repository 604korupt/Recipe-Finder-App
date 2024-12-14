import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { User, signOut, updatePassword, onAuthStateChanged, updateProfile, verifyBeforeUpdateEmail, deleteUser} from 'firebase/auth';
import { useTranslation } from 'react-i18next';

const Profile = () => {
    const { t } = useTranslation();
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newName, setNewName] = useState('');
    const [error, setError] = useState('');
    const [errorEmail, setErrorEmail] = useState('');  
    const [errorPassword, setErrorPassword] = useState('');  
    const [user, setUser] = useState<User | null>(null); // user can be null or User
    const [loading, setLoading] = useState(true); // to handle loading state
    const [showPasswordRequirements, setShowPasswordRequirements] = useState<boolean>(false);
    const [successEmail, setSuccessEmail] = useState('');
    const [successPassword, setSuccessPassword] = useState('');
    const navigate = useNavigate();


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
            navigate('/');
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
            // verify before updating email
            await verifyBeforeUpdateEmail(user, newEmail);
            console.log('Email updated');
            //window.location.reload();
            setNewEmail('');
            setSuccessEmail('Please check your email to verify the new email address.');
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
            //window.location.reload();
            setNewPassword('');
            setSuccessPassword('Password updated successfully!');
        } catch (error) {
            setErrorPassword('Error updating password');
            console.error('Error updating password:', error);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('User is not authenticated');
            }
            // before deleting, add a confirmation dialog
            if (!window.confirm(t('deleteAccountConfirm'))) return;
            // Delete the user's account from database first
            await fetch(`http://localhost:5000/api/users/${user.uid}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            // Delete the user's account from authentication
            await deleteUser(user);

            console.log('Account deleted');
            
            navigate('/');
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    // If loading, display a loading state
    if (loading) {
        return <div className="flex flex-col items-center gap-5">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center gap-5">
            <h1 className="text-4xl font-bold">{t('profile')}</h1>
            {user ? (
                <div className="flex flex-col items-start gap-2">
                    <p className="text-lg">{t('name')}: {user.displayName || t('noDisplayName')}</p>
                    <p className="text-lg">{t('email')}: {user.email || t('usingTwitter')}</p>
                </div>
            ) : (
                <p>{t('notAuthenticated')}</p>
            )}

            {user?.providerData[0]?.providerId === 'password' && (
                <>
                    {error && <p className="text-red-500">{error}</p>}

                    {/* Set new display name */}
                    <form className="flex flex-col gap-2" onSubmit={handleChangeDisplayName}>
                        <label htmlFor="displayName" className="text-lg">{t('changeDisplayName')}:</label>
                        <input
                            type="displayName"
                            id="displayName"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md"
                        />
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">{t('changeDisplayName')}</button>
                    </form>

                    {errorEmail && <p className="text-red-500">{errorEmail}</p>}
                    {successEmail && <p className="text-green-500">{successEmail}</p>}

                    <form className="flex flex-col gap-2" onSubmit={handleChangeEmail}>
                        <label htmlFor="email" className="text-lg">{t('changeEmailForm')}</label>
                        <input
                            type="email"
                            id="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md"
                        />
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-green-500 text-white rounded-md"
                            disabled={!newEmail}
                            style = {{backgroundColor: !newEmail ? "#f3f4f6" : ""}}
                        >
                            {t('changeEmail')}
                        </button>
                    </form>

                    {errorPassword && <p className="text-red-500">{errorPassword}</p>}
                    {successPassword && <p className="text-green-500">{successPassword}</p>}

                    <form className="flex flex-col gap-2" onSubmit={handleChangePassword}>
                        <label htmlFor="password" className="text-lg">{t('changePWForm')}</label>
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
                                <p className="text-sm">{t('pwcontain')}</p>
                                <ul className="text-sm list-disc list-inside">
                                    <li className={newPassword.length >= 6 ? "text-green-500" : "text-red-500"}>{t('pwlength')}</li>
                                    <li className={/[A-Z]/.test(newPassword) ? "text-green-500" : "text-red-500"}>{t('pwupper')}</li>
                                    <li className={/[a-z]/.test(newPassword) ? "text-green-500" : "text-red-500"}>{t('pwlower')}</li>
                                    <li className={/[0-9]/.test(newPassword) ? "text-green-500" : "text-red-500"}>{t('pwnumber')}</li>
                                    <li className={/[^A-Za-z0-9]/.test(newPassword) ? "text-green-500" : "text-red-500"}>{t('pwspecial')}</li>
                                </ul>
                            </div>
                        )}
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-green-500 text-white rounded-md"
                            disabled={!newPassword}
                            style = {{backgroundColor: !newPassword ? "#f3f4f6" : ""}}
                        >
                            {t('changePassword')}
                        </button>
                    </form>
                </>
            )}

            {user ? (
                <>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    {t('logout')}
                </button>
                <button
                    onClick={handleDeleteAccount}
                    className="text-sm text-blue-500 hover:underline"
                >
                    {t('deleteAccount')}
                </button>
                </>
            ) : (
                <p></p>
            )}

            
            
        </div>
    );
};

export default Profile;

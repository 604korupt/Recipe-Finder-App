import React, { useEffect, useState } from 'react';
import { getAuth, sendPasswordResetEmail  } from "firebase/auth";
import { useTranslation } from 'react-i18next';
import RecipeFinderSection from "./RecipeFinderSection";

const ForgotPWPage: React.FC = () => {
    const [email, setEmail] = React.useState("");
    const [, setError] = React.useState("");
    const { t, i18n } = useTranslation();
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }
    }, [i18n]);

    const handleResetPassword = async () => {
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            alert("Password reset email sent!");
        } catch (error) {
           setError("Error resetting password");
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(prev => {
            const newMode = !prev;
            localStorage.setItem('darkMode', newMode.toString());
            return newMode;
        });
    };

    return (
        <>
        <div className={`flex w-full flex-col gap-10 ${isDarkMode ? 'bg-gray-900' : 'bg-white-a700'}`}>
                <RecipeFinderSection isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                <div className={`flex flex-col items-center justify-top h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                    <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white-a700' : 'text-black'}`}>{t('forgotPWPage')}</h1>
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleResetPassword();
                        }}
                        className="flex flex-col items-center"
                    >
                        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('forgotPWInstructions')}</p>
                        <input 
                            type="email"
                            placeholder={t('emailPlaceholder')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`mb-2 p-2 border border-gray-300 rounded ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
                        />
                        <br />
                        <button 
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded-md"
                            disabled={!email}
                            style={{ backgroundColor: !email ? "#f3f4f6" : "" }}
                        >
                            {t('resetPW')}
                        </button>
                    </form>
                    <button onClick={toggleDarkMode} className="absolute top-4 right-4">
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </div>
            </div>
        </>
    );

};

export default ForgotPWPage;
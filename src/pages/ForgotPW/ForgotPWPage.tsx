import React from 'react';
import { getAuth, sendPasswordResetEmail  } from "firebase/auth";
import { useTranslation } from 'react-i18next';


const ForgotPWPage: React.FC = () => {
    const [email, setEmail] = React.useState("");
    const [, setError] = React.useState("");
    const { t } = useTranslation();

    const handleResetPassword = async () => {
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            alert("Password reset email sent!");
        } catch (error) {
           setError("Error resetting password");
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4">{t('forgotPWPage')}</h1>
            <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    handleResetPassword();
                }}
                className="flex flex-col items-center"
            >
                <p className="text-gray-600 mb-4">{t('forgotPWInstructions')}</p>
                <input 
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 p-2 rounded-lg mt-4"
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
        </div>
    );

};

export default ForgotPWPage;
import { useState } from 'react';
import { Lock } from 'lucide-react';
import { userService } from "../../services/userService.ts";
import { useLocation, useNavigate } from "react-router-dom";

const VerificationForm = () => {
    const location = useLocation();
    const email = location.state?.email;
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);  // Ajout de l'état pour gérer le chargement
    const navigate = useNavigate();

    const handleVerify = async () => {
        setError('');
        setSuccess('');
        setLoading(true);

        if (!verificationCode) {
            setError('Veuillez entrer un code de vérification.');
            setLoading(false);
            return;
        }

        try {
            const result = await userService.verifyUser(email, verificationCode);
            setLoading(false);

            if (result === 'Compte vérifié avec succès.') {
                setSuccess('Votre compte a été vérifié avec succès.');
                navigate("/home");
            } else {
                setError(result);
            }
        } catch (error) {
            setLoading(false);
            setError('Erreur lors de la vérification.');
        }
    };

    const handleResendCode = async (email: string) => {
        setError('');
        setSuccess('');
        setLoading(true);

        if (!email) {
            setError('Adresse email non fournie.');
            setLoading(false);
            return;
        }

        try {
            const response = await userService.resendVerificationCode(email);
            setLoading(false);
            setSuccess('Le code de vérification a été renvoyé avec succès. Vérifiez votre email.');
        } catch (err: any) {
            setLoading(false);
            setError('Erreur lors de l\'envoi du code de vérification. Veuillez réessayer.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen px-4">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-[400px] w-full">
                <h2 className="text-xl font-extrabold text-purple-700 mb-4 text-center">
                    Verify Your Account
                </h2>
                <p className="text-sm text-gray-600 text-center mb-6">
                    Enter the code we sent to your email address.
                </p>

                {/* Input Field */}
                <div className="relative mb-4">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-600">
                        <Lock className="w-5 h-5" />
                    </span>
                    <input
                        type="text"
                        placeholder="Verification Code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 bg-purple-50 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 text-xs text-center mb-2">{error}</p>}

                {/* Success Message */}
                {success && <p className="text-green-500 text-xs text-center mb-2">{success}</p>}

                {/* Verify Button */}
                <button
                    onClick={handleVerify}
                    className={`w-full ${loading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'} text-white py-2 rounded-md transition-colors duration-200 text-sm`}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full border-4 border-t-4 border-white w-5 h-5"></div>
                            <span className="ml-2">Loading...</span>
                        </div>
                    ) : (
                        'Verify'
                    )}
                </button>

                {/* Resend Code */}
                <div className="text-center text-xs text-gray-600 mt-4">
                    Didn't receive a code?{' '}
                    <button
                        className="text-purple-600 hover:text-purple-800"
                        onClick={() => handleResendCode(email)}
                        disabled={loading}
                    >
                        Resend
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerificationForm;

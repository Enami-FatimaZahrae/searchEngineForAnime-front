import { useState } from 'react';
import { X, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import mascotImage from '../../assets/ChopperMascot1-Wbg.png';
import { userService } from "../../services/userService.ts";
import {jwtDecode} from 'jwt-decode'

interface DecodedToken {
    sub: string; // Username or email
    userId: number; // Custom claim
}

const LoginForm = ({setIsVisible}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError('');
        setLoading(true);

        if (!email || !password) {
            setError('Veuillez entrer votre email et votre mot de passe.');
            setLoading(false);
            return;
        }

        try {
            const authData = { email, password };
            const response = await authService.loginUser(authData);
            console.log('Réponse de l\'API:', response);

            setLoading(false);

            if (response && response.token) {
                localStorage.setItem('authToken', response.token);
                const decoded: DecodedToken = jwtDecode(response.token);
                localStorage.setItem('userSubject', decoded.sub);
                localStorage.setItem('userId', decoded.userId.toString());

                navigate("/home");
            } else {
                setError('Réponse invalide de l\'API');
            }
        } catch (error) {
            setLoading(false);
            console.error('Erreur lors de la connexion:', error);
            setError(error?.message || 'Erreur lors de la connexion.');
        }
    };

    const handleForgotPassword = async () => {
        setError('');
        setLoading(true);

        if (!email) {
            setError('Veuillez entrer votre adresse email.');
            setLoading(false);
            return;
        }

        try {
            const response = await userService.forgotPassword(email);
            console.log(response);
            if (response && response.success) {
                setError('');
                alert('Un lien de réinitialisation de mot de passe a été envoyé à votre email.');
                navigate('/login');
            } else {
                setError(response.message || 'Erreur lors de l\'envoi de l\'email de réinitialisation.');
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email de réinitialisation:', error);
            setError(error?.message || 'Erreur lors de la réinitialisation du mot de passe.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

        <div className="bg-white rounded-lg shadow-lg flex overflow-hidden max-w-[600px] w-full">
            {/* Image Section */}
            <div className="flex-1 flex items-center justify-center bg-white">
                <img
                    src={mascotImage}
                    alt="Chopper mascot"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Form Section */}
            <div className="flex-1 p-6 flex flex-col justify-start">
                <div className="relative flex justify-end">
                    <button
                        onClick={() => setIsVisible(false)} // Fermer le formulaire
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-extrabold text-purple-700 mb-2 text-center">
                        Login
                    </h2>
                    <p className="text-xs font-bold text-gray-600 text-center">
                        a better place to watch anime online for free!
                    </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-3 mt-8">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-600">
                            <Mail className="w-4 h-4" />
                        </span>
                        <input
                            type="email"
                            placeholder="your.email@example.com"
                            className="w-full pl-10 pr-3 py-2 bg-purple-50 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-600">
                            <Lock className="w-4 h-4" />
                        </span>
                        <input
                            type="password"
                            placeholder="password"
                            className="w-full pl-10 pr-3 py-2 bg-purple-50 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-xs text-center mb-2">{error}</p>}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-3 h-3 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <label
                                htmlFor="remember"
                                className="text-xs text-gray-600 cursor-pointer"
                            >
                                Remember me
                            </label>
                        </div>
                        <a
                            onClick={() => handleForgotPassword()}
                            className="text-xs text-purple-600 hover:text-purple-800 cursor-pointer"
                        >
                            Forgot password?
                        </a>
                    </div>

                    <button
                        onClick={handleLogin}
                        className={`w-full ${loading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'} text-white py-2 rounded-md transition-colors duration-200 text-sm`}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <div className="animate-spin rounded-full border-4 border-t-4 border-white w-5 h-5"></div>
                                <span className="ml-2">Logging in...</span>
                            </div>
                        ) : (
                            'Login'
                        )}
                    </button>

                    <div className="text-center text-xs text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-purple-600 hover:text-purple-800">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default LoginForm;

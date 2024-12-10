import { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import mascotImage from '../../assets/pngwing.com.png';
import { Link, useNavigate } from "react-router-dom";
import { authService } from '../../services/authService';

const RegisterForm = ({setIsVisible}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        setError('');

        if (!formData.name || !formData.email || !formData.password || !formData.repeatPassword) {
            setError('All fields are required');
            return;
        }

        if (formData.password !== formData.repeatPassword) {
            setError('Passwords don\'t match');
            return;
        }

        const userData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
        };

        try {
            setIsLoading(true);
            const data = await authService.registerUser(userData);
            console.log(data);
            navigate('/verify', { state: { email: formData.email } });
        } catch (err) {
            console.log(err);
            setError(err.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 rounded-lg shadow-lg flex overflow-hidden max-w-[600px] w-full">
                {/* Image Section */}
                <div className="flex-1 flex items-center justify-center bg-gray-800">
                    <img
                        src={mascotImage}
                        alt="Chopper mascot"
                        className="w-[80%] h-auto object-cover"
                    />
                </div>

                {/* Form Section */}
                <div className="flex-1 p-6 flex flex-col justify-start">
                    <div className="relative flex justify-end">
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="mt-2">
                        <h2 className="text-xl font-extrabold text-purple-700 mb-2 text-center">
                            Register
                        </h2>
                        <p className="text-xs font-bold text-gray-600 text-center">
                            Create your account to start your anime journey!
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 text-xs text-center mt-2">{error}</p>
                    )}

                    {/* Form Fields */}
                    <div className="space-y-3 mt-6">
                        {/* Name Field */}
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-600">
                                <User className="w-4 h-4" />
                            </span>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="w-full pl-10 pr-3 py-2 bg-purple-50 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-600">
                                <Mail className="w-4 h-4" />
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your.email@example.com"
                                className="w-full pl-10 pr-3 py-2 bg-purple-50 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-600">
                                <Lock className="w-4 h-4" />
                            </span>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full pl-10 pr-3 py-2 bg-purple-50 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                            />
                        </div>

                        {/* Repeat Password Field */}
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-600">
                                <Lock className="w-4 h-4" />
                            </span>
                            <input
                                type="password"
                                name="repeatPassword"
                                value={formData.repeatPassword}
                                onChange={handleChange}
                                placeholder="Repeat Password"
                                className="w-full pl-10 pr-3 py-2 bg-purple-50 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                            />
                        </div>

                        {/* Register Button */}
                        <button
                            onClick={handleRegister}
                            className={`w-full py-2 rounded-md transition-colors duration-200 text-sm ${
                                isLoading
                                    ? 'bg-purple-400 text-gray-300 cursor-not-allowed'
                                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                            }`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin h-5 w-5 mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Loading...
                                </span>
                            ) : (
                                'Register'
                            )}
                        </button>

                        <div className="text-center text-xs text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-purple-600 hover:text-purple-800">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
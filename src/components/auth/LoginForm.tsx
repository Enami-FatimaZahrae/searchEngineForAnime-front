import { X } from 'lucide-react';
import mascotImage from '../../assets/ChopperMascot1.jpg';

const LoginForm = () => {
    return (
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
            <div className="relative p-6 flex justify-between items-start border-b">
                <div className="flex items-center space-x-4">
                    <img
                        src={mascotImage}
                        alt="Chopper mascot"
                        className="w-24 h-24"
                    />
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-purple-700">Login</h2>
                        <p className="text-sm text-gray-600">
                            a better place to watch anime online for free!
                        </p>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="p-6 space-y-4">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full px-4 py-2 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    <div className="space-y-2">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="remember"
                                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <label
                                htmlFor="remember"
                                className="text-sm text-gray-600 cursor-pointer"
                            >
                                Remember me
                            </label>
                        </div>
                        <a
                            href="#"
                            className="text-sm text-purple-600 hover:text-purple-800"
                        >
                            Forgot password?
                        </a>
                    </div>

                    <button
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition-colors duration-200"
                    >
                        Login
                    </button>

                    <div className="text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a href="#" className="text-purple-600 hover:text-purple-800">
                            Register
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
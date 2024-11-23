import { X } from 'lucide-react';
import mascotImage from '../../assets/ChopperMascot1-Wbg.png';

const LoginForm = () => {
    return (
        <div className="flex justify-center items-center min-h-screen  px-4">
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
                <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="relative flex justify-end mb-2">
                        <button className="text-gray-400 hover:text-gray-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-purple-700 mb-1">
                            Member Login
                        </h2>
                        <p className="text-xs text-gray-600">
                            9anime - a better place to watch anime online for free!
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full px-3 py-2 bg-purple-50 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-3 py-2 bg-purple-50 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                            />
                        </div>

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
                                href="#"
                                className="text-xs text-purple-600 hover:text-purple-800"
                            >
                                Forgot password?
                            </a>
                        </div>

                        <button
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition-colors duration-200 text-sm"
                        >
                            Login
                        </button>

                        <div className="text-center text-xs text-gray-600">
                            Don't have an account?{' '}
                            <a href="#" className="text-purple-600 hover:text-purple-800">
                                Register
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;

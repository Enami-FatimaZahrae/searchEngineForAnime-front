import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

interface User{
    name: string;
    email: string;
    password: string;

}

interface AuthRequest {
    email: string;
    password: string;
}

export const authService = {
    registerUser: async (userData: User) => {
        try {
            const response = await axios.post(`${API_URL}/register`, userData);
            return response.data;
        }catch(err) {
            throw err.response?.data || "registration failed";
        }
    },

    loginUser: async (authData: AuthRequest) => {
        try {
            const response = await axios.post(`${API_URL}/authenticate`, authData);
            return response.data;
        }catch(err) {
            throw err.response?.data || "Login failed";
        }
    }
};
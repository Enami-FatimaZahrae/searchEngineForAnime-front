import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const API_URL = "http://localhost:8080/api/users";


export const userService = {
    verifyUser: async (email: string, verificationCode: string) => {
        try {
            const response = await axios.post(`${API_URL}/verify`, { email, verificationCode });
            return response.data;
        } catch (error) {
            if (error.response) {
                return error.response.data;
            } else {
                return "Verification failed";
            }
        }
    },

    resendVerificationCode: async (email: string) => {
        console.log("first",email);
        try {
            const response = await axios.post(`${API_URL}/resend-code`, {email});
            return response.data;
        }catch(err) {
            if (err.response) {
                return err.response.data;
            }else{
                return "Sending code failed"
            }
        }
    },

    forgotPassword : async (email: string) => {
        try {
            const response = await axios.post(`${API_URL}/forgot-password`, {email});
            return response.data;
        }catch(err) {
            if (err.response) {
                return err.response.data;
            }else{
                return "Sending code failed"
            }
        }
    },

    resetPassword : async (password: string) => {

        try {
            const response = await axios.post(`${API_URL}/reset-password`, {password});
            return response.data;
        }catch(err) {
            if (err.response) {
                return err.response.data;
            }else{
                return "Reset Password Failed"
            }
        }
    }
}
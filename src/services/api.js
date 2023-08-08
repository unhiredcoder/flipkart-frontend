import axios from "axios";
import { URL } from "../constants/data";

export const authenticateSignUp = async (data) => {
  try {
    const response = await axios.post(`${URL}/signup`, data);
    return response.data; // Return the response data if the request is successful
  } catch (error) {
    const er=error.response.data.message
    console.log(er);
    throw new Error("Error when signup"); // Throw an error with the error message
  }
};


export const authenticateLogin = async (data) => {
  try {
    const response = await axios.post(`${URL}/login`, data);
    return response; // Return the response data if the request is successful
  } catch (error) {
    const er=error.response.data.message
    console.log(er);
    return error.response
  }
}
import axios from "axios";


export const baseUrl = "http://react-hospital-api.test";
export const baseUrlApi = `${baseUrl}api/`;

export const api = axios.create({
    baseURL: baseUrlApi,
    headers: {
        "Content-Type": "application/json",
        // "Authorization": "Bearer " + localStorage.getItem("lara_token"),
    },
});
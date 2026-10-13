import axios from "axios";

// export const baseUrl = "http://laravel_api_hospital.test/";
// export const baseUrlApi = `${baseUrl}api/`;

export const baseUrl = "http://laravel_api_hospital.test/";
export const baseUrlApi = `${baseUrl}api/`;

export const api = axios.create({
    baseURL: baseUrlApi,
    headers: {
        "Content-Type": "application/json",
        // "Authorization": "Bearer " + localStorage.getItem("lara_token"),
    },
});
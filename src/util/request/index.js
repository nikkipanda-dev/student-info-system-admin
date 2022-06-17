import axios from "axios";

export const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: { 
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
    }
})
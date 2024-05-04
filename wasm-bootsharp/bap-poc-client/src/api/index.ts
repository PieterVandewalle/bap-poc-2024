import axiosRoot from 'axios';

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;

const axios = axiosRoot.create({
    baseURL: baseURL,
});

export default axios;
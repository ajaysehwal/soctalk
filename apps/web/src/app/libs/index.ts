import axios from "axios";
export const configureAxios = (token:string | undefined) => {
    const Headers = process.env.AUTH_HEADER || "";
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common[Headers] = token;
    axios.defaults.baseURL = process.env.SERVER_URL;
  };
  
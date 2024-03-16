/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        SERVER_URL:"http://localhost:8000",
        AUTH_HEADER:"X-Authorization",
        ACCESS_TOKEN:'jwt'
    }
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_HOST: "http://localhost:8000/",
    Security_Key:"qwerrtyuiop!@$soctalk//===jwtscript$",
    Socket_Server:'http://localhost:7000'
  },
  skipMiddlewareUrlNormalize: true,

};

export default nextConfig;

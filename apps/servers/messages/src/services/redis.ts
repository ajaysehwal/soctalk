import { Redis } from "ioredis";
export const publisher = new Redis({
  host: "redis-1d9a097b-ajaysehwal000-0acb.a.aivencloud.com",
  port: 11603,
  username: "default",
  password: "AVNS_WVikzbhthlR8HZoS4pe",
});
export const subscribe = new Redis({
  host: "redis-1d9a097b-ajaysehwal000-0acb.a.aivencloud.com",
  port: 11603,
  username: "default",
  password: "AVNS_WVikzbhthlR8HZoS4pe",
});

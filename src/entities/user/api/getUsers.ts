import { request } from "@/shared/api";
import type { User } from "../model/User";

export function getUsers() {
  return request<User[]>("/api/users");
}

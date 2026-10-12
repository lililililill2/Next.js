import { request } from "@/shared/api";
import type { Post } from "../model/Post";

export function getPosts() {
  return request<Post[]>("/api/posts");
}

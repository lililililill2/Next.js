import { request } from "../../../shared/api/request";
import type { Post } from "../model/Post";

export function getPosts() {
  return request<Post[]>("/api/posts");
}

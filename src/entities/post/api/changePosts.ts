import { request } from "@/shared/api";
import type { Post, PostInput } from "../model/Post";

export function createPost(post: PostInput) {
  return request<Post>("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
}

export function updatePost(id: number, post: PostInput) {
  return request<Post>(`/api/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...post, id }),
  });
}

export function deletePost(id: number) {
  return request<void>(`/api/posts/${id}`, { method: "DELETE" });
}

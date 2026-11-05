import type { Post } from "@/entities/post";

export function filterPosts(posts: Post[], search: string) {
  return posts.filter((post) => post.title.includes(search));
}

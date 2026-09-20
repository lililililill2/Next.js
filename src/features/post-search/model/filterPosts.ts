import type { Post } from "../../../entities/post/model/Post";

export function filterPosts(posts: Post[], search: string) {
  return posts.filter((post) => post.title.includes(search));
}

import type { Post } from "../model/Post";

type Props = {
  post: Post;
  authorName?: string;
};

export function PostItem({ post, authorName }: Props) {
  return (
    <div>
      <div>제목: {post.title}</div>
      <br />
      <div>작성자: {authorName}</div>
      <hr />
    </div>
  );
}

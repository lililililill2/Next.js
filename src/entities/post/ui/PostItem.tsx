"use client";

import type { Post } from "../model/Post";
import { usePostStore } from "../model/usePostStore";

type Props = {
  post: Post;
  authorName?: string;
};

export function PostItem({ post, authorName }: Props) {
  const selectedId = usePostStore((state) => state.selectedId);
  const setSelectedId = usePostStore((state) => state.setSelectedId);
  const isSelected = selectedId === post.id;

  return (
    <div>
      <div>제목: {post.title}</div>
      <br />
      <div>작성자: {authorName}</div>
      <button
        type="button"
        aria-expanded={isSelected}
        aria-controls={`post-body-${post.id}`}
        onClick={() => setSelectedId(isSelected ? null : post.id)}
      >
        {isSelected ? "닫기" : "자세히 보기"}
      </button>
      <p id={`post-body-${post.id}`} hidden={!isSelected}>
        {post.body}
      </p>
      <hr />
    </div>
  );
}

"use client";

import { useRef, useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPost,
  updatePost,
  deletePost,
  PostItem,
  usePostStore,
  type Post,
  type PostInput,
} from "@/entities/post";
import type { User } from "@/entities/user";

type Props = {
  posts: Post[];
  users: User[];
};

type Action =
  | { type: "create"; post: PostInput }
  | { type: "update"; id: number; post: PostInput }
  | { type: "delete"; id: number };

export function PostManager({ posts, users }: Props) {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState(users[0]?.id ?? 1);
  const busy = useRef(false);

  function resetForm() {
    setEditingId(null);
    setTitle("");
    setBody("");
    setUserId(users[0]?.id ?? 1);
  }

  const mutation = useMutation({
    mutationFn: async (action: Action) => {
      if (action.type === "create") return createPost(action.post);
      if (action.type === "update") return updatePost(action.id, action.post);
      await deletePost(action.id);
    },
    onSuccess: (savedPost, action) => {
      queryClient.setQueryData<Post[]>(["posts"], (current = []) => {
        if (action.type === "delete") {
          return current.filter((post) => post.id !== action.id);
        }
        if (!savedPost) return current;
        if (action.type === "update") {
          return current.map((post) =>
            post.id === action.id ? { ...savedPost, id: action.id } : post,
          );
        }
        const id = Math.max(savedPost.id, ...current.map((post) => post.id + 1));
        return [{ ...savedPost, id }, ...current];
      });

      if (action.type === "delete") {
        const store = usePostStore.getState();
        if (store.selectedId === action.id) store.setSelectedId(null);
        if (editingId === action.id) resetForm();
      } else {
        resetForm();
      }
    },
    onSettled: () => {
      busy.current = false;
    },
  });

  function send(action: Action) {
    if (busy.current) return;
    busy.current = true;
    mutation.mutate(action);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !body.trim()) return;
    const post = { title: title.trim(), body: body.trim(), userId };
    send(
      editingId === null
        ? { type: "create", post }
        : { type: "update", id: editingId, post },
    );
  }

  function edit(post: Post) {
    if (busy.current) return;
    mutation.reset();
    setEditingId(post.id);
    setTitle(post.title);
    setBody(post.body);
    setUserId(post.userId);
  }

  return (
    <>
      <form onSubmit={submit}>
        <fieldset disabled={mutation.isPending}>
          <legend>{editingId === null ? "게시글 추가" : "게시글 수정"}</legend>
          <label>
            제목
            <input required value={title} onChange={(event) => setTitle(event.target.value)} />
          </label>
          <br />
          <label>
            내용
            <textarea required value={body} onChange={(event) => setBody(event.target.value)} />
          </label>
          <br />
          <label>
            작성자
            <select value={userId} onChange={(event) => setUserId(Number(event.target.value))}>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>
          <br />
          <button type="submit" disabled={!title.trim() || !body.trim()}>
            {editingId === null ? "추가" : "수정 저장"}
          </button>
          {editingId !== null && (
            <button type="button" onClick={() => { resetForm(); mutation.reset(); }}>
              취소
            </button>
          )}
        </fieldset>
      </form>

      {mutation.isPending && <p role="status">처리 중...</p>}
      {mutation.isError && (
        <p role="alert">요청에 실패했습니다. 다시 시도해 주세요.</p>
      )}

      <hr />
      {posts.map((post) => {
        const user = users.find((user) => user.id === post.userId);
        return (
          <div key={post.id}>
            <button type="button" disabled={mutation.isPending} onClick={() => edit(post)}>
              수정
            </button>
            <button
              type="button"
              disabled={mutation.isPending}
              onClick={() => send({ type: "delete", id: post.id })}
            >
              삭제
            </button>
            <PostItem post={post} authorName={user?.name} />
          </div>
        );
      })}
    </>
  );
}

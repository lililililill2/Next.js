"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getPosts } from "@/entities/post";
import { getUsers } from "@/entities/user";

import { PostSearch } from "@/features/post-search";
import { PostManager } from "@/features/post-manage";

import { filterPosts } from "@/features/post-search";

export function HomePage() {
  const [search, setSearch] = useState("");

  const {
    data: posts = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: Infinity,
  });

  const {
    data: users = [],
    isPending: isUsersPending,
    isError: isUsersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isError || isUsersError) {
    return <div role="alert">데이터를 가져오지 못했습니다.</div>;
  }

  if (isPending || isUsersPending) {
    return <div>로딩 중...</div>;
  }

  const filteredPosts = filterPosts(posts, search);

  return (
    <>
      <div>jsonplaceholder 게시글</div>

      <PostSearch search={search} setSearch={setSearch} />

      <hr />

      <PostManager posts={filteredPosts} users={users} />
    </>
  );
}

"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getPosts } from "../../../entities/post/api/getPosts";
import { getUsers } from "../../../entities/user/api/getUsers";

import { PostSearch } from "../../../features/post-search/ui/PostSearch";
import { PostItem } from "../../../entities/post/ui/PostItem";

import { filterPosts } from "../../../features/post-search/model/filterPosts";

export function HomePage() {
  const [search, setSearch] = useState("");

  const {
    data: posts = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isPending) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>에러 발생!</div>;
  }

  const filteredPosts = filterPosts(posts, search);

  return (
    <>
      <div>jsonplaceholder 게시글</div>

      <PostSearch search={search} setSearch={setSearch} />

      <hr />

      {filteredPosts.map((post) => {
        const user = users.find((user) => user.id === post.userId);

        return <PostItem key={post.id} post={post} authorName={user?.name} />;
      })}
    </>
  );
}

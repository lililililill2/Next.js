"use client";

import { useState, useEffect } from "react";
import { getPosts } from "../../../entities/post/api/getPosts";
import { getUsers } from "../../../entities/user/api/getUsers";
import { PostSearch } from "../../../features/post-search/ui/PostSearch";
import { PostItem } from "../../../entities/post/ui/PostItem";
import type { Post } from "../../../entities/post/model/Post";
import type { User } from "../../../entities/user/model/User";
import { filterPosts } from "../../../features/post-search/model/filterPosts";

export function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getPosts().then((data) => {
      setPosts(data);
    });

    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  const filter = filterPosts(posts, search);

  return (
    <>
      <div>jsonplaceholder 게시글</div>

      <PostSearch search={search} setSearch={setSearch} />

      <hr />

      {filter.length === 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        filter.map((post) => {
          const user = users.find((user) => user.id === post.userId);

          return <PostItem key={post.id} post={post} authorName={user?.name} />;
        })
      )}
    </>
  );
}

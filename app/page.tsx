"use client";

import { useState, useEffect } from "react";
import { getPosts, getUsers } from "./data";

function App() {
  const [posts, setPosts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    getPosts().then((data) => {
      setPosts(data);
    });

    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  const filter = posts.filter((post) => post.title.includes(search));

  return (
    <>
      <div>jsonplaceholder 게시글</div>
      <input
        type="text"
        placeholder="입력창"
        onChange={(e) => setSearch(e.target.value)}
      />
      <hr />

      {filter.length === 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        filter.map((post) => {
          const user = users.find((user) => user.id === post.userId);

          return (
            <div key={post.id}>
              <div>제목: {post.title}</div>
              <br />
              <div>작성자:{user?.name}</div>

              <hr />
            </div>
          );
        })
      )}
    </>
  );
}

export default App;

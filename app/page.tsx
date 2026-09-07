"use client";

import { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("에러");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("끝");
      });
  }, []);

  return (
    <>
      <div>jsonplaceholder 제목!</div>

      <hr></hr>

      <div>0.{posts[0]?.title}</div>
      <div>1.{posts[1]?.title}</div>
      <div>2.{posts[2]?.title}</div>
      <div>3.{posts[3]?.title}</div>
    </>
  );
}

export default App;

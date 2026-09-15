export function getPosts() {
  return fetch("/api/posts")
    .then((response) => {
      if (!response.ok) {
        throw new Error("에러");
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log("끝");
    });
}

export function getUsers() {
  return fetch("/api/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error("에러");
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

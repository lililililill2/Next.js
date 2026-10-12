"use client";

import { useQuery } from "@tanstack/react-query";

import { getUsers } from "@/entities/user";
import { UserItem } from "@/entities/user";

export function UserPage() {
  const {
    data: users = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isPending) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>에러 발생!</div>;
  }

  return (
    <div>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}

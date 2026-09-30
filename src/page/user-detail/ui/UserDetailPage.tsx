"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../../../entities/user/api/getUsers";

export function UserDetailPage() {
  const params = useParams<{ id: string }>();

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

  const user = users.find((user) => user.id === Number(params.id));

  return <div>{user?.email}</div>;
}

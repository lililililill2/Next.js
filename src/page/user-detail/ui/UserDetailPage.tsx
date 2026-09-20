"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUsers } from "../../../entities/user/api/getUsers";
import type { User } from "../../../entities/user/model/User";

export function UserDetailPage() {
  const params = useParams<{ id: string }>();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then((data) => {
      if (data) {
        setUsers(data);
      }
    });
  }, []);

  const user = users.find((user) => user.id === Number(params.id));

  return <div>{user?.email}</div>;
}

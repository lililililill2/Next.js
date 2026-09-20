"use client";

import { useEffect, useState } from "react";
import { getUsers } from "../../../entities/user/api/getUsers";
import { UserItem } from "../../../entities/user/ui/UserItem";
import type { User } from "../../../entities/user/model/User";

export function UserPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then((data) => {
      if (data) {
        setUsers(data);
      }
    });
  }, []);

  return (
    <div>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}

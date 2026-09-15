"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type User = {
  id: number;
  email: string;
};

export default function Page() {
  const params = useParams<{ id: string }>();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  return <div>{users[Number(params.id) - 1]?.email}</div>;
}

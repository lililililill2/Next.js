import type { User } from "../model/User";

type Props = {
  user: User;
};

export function UserItem({ user }: Props) {
  return (
    <div>
      <div>이름: {user.name}</div>
      <div>이메일: {user.email}</div>
      <hr />
    </div>
  );
}

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export function PostSearch({ search, setSearch }: Props) {
  return (
    <input
      type="text"
      placeholder="입력창"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

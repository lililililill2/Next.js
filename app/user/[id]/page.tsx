export default async function App({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  return <div>{data[Number(id) - 1]?.email}</div>;
}

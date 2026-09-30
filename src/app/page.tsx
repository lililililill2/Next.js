import { HomePage } from "../page/home/ui/HomePage";
import QueryProvider from "./providers/QueryProvider";

export default function Page() {
  return (
    <QueryProvider>
      <HomePage />
    </QueryProvider>
  );
}

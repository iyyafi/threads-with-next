import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ThreadList from "../components/threadList";
import { getThreadList } from "../hooks/getThreadList";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["reddit", "DotA2"],
    queryFn: getThreadList,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ThreadList />
    </HydrationBoundary>
  );
}

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import ThreadList from "../components/threadList";
import { getThreadList } from "../fetching/getThreadList";
import NavBar from "../components/navBar";

export default async function Home({ searchParams }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["reddit", "DotA2"],
    queryFn: getThreadList({ sort: searchParams.sort }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NavBar />
      <ThreadList />
    </HydrationBoundary>
  );
}

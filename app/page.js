import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import ThreadList from "../components/threadList";
import { getThreadList } from "../fetching/getThreadList";
import { getToken } from "../fetching/getToken";
import NavBar from "../components/navBar";

export default async function Home({ searchParams }) {
  const queryClient = new QueryClient();

  const todayDate = String(new Date().getDate());

  const token = await queryClient.prefetchQuery({
    queryKey: ["reddit", "auth", todayDate],
    queryFn: getToken(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["reddit", "DotA2"],
    queryFn: getThreadList({
      sort: searchParams.sort,
      token: token?.access_token,
    }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NavBar />
      <ThreadList token={token?.access_token} />
    </HydrationBoundary>
  );
}

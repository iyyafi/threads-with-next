import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import ThreadList from "../components/threadList";
import { getThreadList } from "../fetching/getThreadList";
import NavBar from "../components/navBar";

export default async function Home({ searchParams }) {
  const cookieStore = cookies();
  const queryClient = new QueryClient();
  const token = cookieStore.get("token")?.value;
  const tokenExpired = cookieStore.get("token_expired")?.value;
  const todayDate = String(new Date().getDate());

  if (!token || !tokenExpired || tokenExpired !== todayDate) {
    redirect("/api/token");
  }

  await queryClient.prefetchQuery({
    queryKey: ["reddit", "DotA2"],
    queryFn: getThreadList({
      sort: searchParams.sort,
      token: token,
    }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NavBar />
      <ThreadList token={token} />
    </HydrationBoundary>
  );
}

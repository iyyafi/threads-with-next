import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getThreadDetail } from "../../../fetching/getThreadDetail";
import ThreadDetail from "../../../components/threadDetail";
import { cookies } from "next/headers";

export default async function Page({ params }) {
  const cookieStore = cookies();
  const queryClient = new QueryClient();
  const token = cookieStore.get("token")?.value;
  const tokenExpired = cookieStore.get("token_expired")?.value;
  const todayDate = String(new Date().getDate());

  if (!token || !tokenExpired || tokenExpired !== todayDate) {
    redirect("/api/token");
  }

  await queryClient.prefetchQuery({
    queryKey: ["reddit", params.thread, params.id],
    queryFn: getThreadDetail({
      thread: params.thread,
      id: params.id,
      token: token,
    }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ThreadDetail {...params} token={token} />
    </HydrationBoundary>
  );
}

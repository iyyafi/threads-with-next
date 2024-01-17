import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getThreadDetail } from "../../../fetching/getThreadDetail";
import ThreadDetail from "../../../components/threadDetail";

export default async function Page({ params }) {
  const cookieStore = cookies();
  const queryClient = new QueryClient();
  //const token = cookieStore.get("yy_token")?.value;
  //const tokenExpired = cookieStore.get("yy_token_expired")?.value;
  const token = localStorage.getItem("yy_token");
  const tokenExpired = localStorage.getItem("yy_token_expired");
  const todayDate = String(new Date().getDate());

  if (tokenExpired !== todayDate) {
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

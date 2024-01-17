import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getThreadDetail } from "../../../fetching/getThreadDetail";
import { getToken } from "../../../fetching/getToken";
import ThreadDetail from "../../../components/threadDetail";

export default async function Page({ params }) {
  const queryClient = new QueryClient();

  const todayDate = String(new Date().getDate());

  const token = await queryClient.prefetchQuery({
    queryKey: ["reddit", "auth", todayDate],
    queryFn: getToken(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["reddit", params.thread, params.id],
    queryFn: getThreadDetail({
      thread: params.thread,
      id: params.id,
      token: token?.access_token,
    }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ThreadDetail {...params} token={token?.access_token} />
    </HydrationBoundary>
  );
}

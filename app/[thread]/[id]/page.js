import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getThreadDetail } from "../../../hooks/getThreadDetail";
import ThreadDetail from "../../../components/threadDetail";

export default async function Page({ params }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["reddit", params.thread, params.id],
    queryFn: getThreadDetail({ thread: params.thread, id: params.id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ThreadDetail {...params} />
    </HydrationBoundary>
  );
}

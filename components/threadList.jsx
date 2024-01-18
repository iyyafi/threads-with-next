"use client";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fromUnixTime, format } from "date-fns";

import { getThreadList } from "../fetching/getThreadList";
import { getToken } from "../fetching/getToken";
import ThreadCard, { ThreadCardSkeleton } from "./threadCard";

export default function ThreadList() {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "hot";
  const todayDate = String(new Date().getDate());
  const { data: tokens } = useQuery({
    queryKey: ["reddit", "auth", todayDate],
    queryFn: getToken(),
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["reddit", "DotA2", sort],
    queryFn: getThreadList({ sort, token: tokens?.access_token }),
    select: (res) =>
      res.data.children.map((thread) => ({
        id: thread.data.id,
        thread: thread.data.subreddit,
        title: thread.data.title,
        postedBy: thread.data.author,
        timePost: format(fromUnixTime(thread.data.edited), "dd MMM yyyy"),
        commentCount: thread.data.num_comments,
        voteCount: thread.data.score,
      })),
    enabled: !!tokens?.access_token,
  });

  if (isPending)
    return (
      <div className="py-2">
        {[...Array(10)].map((_, i) => (
          <ThreadCardSkeleton key={i} />
        ))}
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="py-2">
      {data.map((item) => (
        <ThreadCard key={item.id} {...item} />
      ))}
    </div>
  );
}

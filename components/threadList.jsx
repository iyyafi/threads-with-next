"use client";
import { useQuery } from "@tanstack/react-query";
import { fromUnixTime, format } from "date-fns";

import { getThreadList } from "../hooks/getThreadList";
import ThreadCard from "./threadCard";

export default function ThreadList() {
  const { isPending, error, data } = useQuery({
    queryKey: ["reddit", "DotA2"],
    queryFn: getThreadList,
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
  });
  console.log(data);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {data.map((item) => (
        <ThreadCard key={item.id} {...item} />
      ))}
    </>
  );
}

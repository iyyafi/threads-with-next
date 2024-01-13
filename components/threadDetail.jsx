"use client";
import { useQuery } from "@tanstack/react-query";
import { fromUnixTime, format } from "date-fns";
import parse from "html-react-parser";

import { getThreadDetail } from "../fetching/getThreadDetail";
import { modelReplies } from "../models/replies";
import ThreadComment from "./threadComment";

export default function ThreadDetail({ thread, id }) {
  const { isPending, error, data } = useQuery({
    queryKey: ["reddit", thread, id],
    queryFn: getThreadDetail({ thread: thread, id: id }),
    select: (res) => {
      return {
        opTitle: res[0].data.children[0].data.title,
        opPostBy: res[0].data.children[0].data.author,
        voteCount: res[0].data.children[0].data.score,
        opTimePost: format(
          fromUnixTime(res[0].data.children[0].data.created_utc),
          "dd MMM yyyy"
        ),
        opContent: res[0].data.children[0].data.selftext_html,
        comment: modelReplies(res[1]),
      };
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div className="px-4">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <span className="text-xs font-bold">{thread}</span>
            <span className="text-xs">{data.opTimePost}</span>
          </div>
          <span className="text-xs">{data.opPostBy}</span>
        </div>
        <h1 className="text-lg font-semibold">{data.opTitle}</h1>
        <div className="text-sm">{parse(parse(data.opContent))}</div>
        <div className=""></div>
        <div>
          {data.comment.map((comment) => (
            <div key={comment.id}>
              <ThreadComment {...comment} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

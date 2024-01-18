"use client";
import { useQuery } from "@tanstack/react-query";
import { fromUnixTime, format } from "date-fns";

import { getThreadDetail } from "../fetching/getThreadDetail";
import { getToken } from "../fetching/getToken";
import { modelReplies } from "../models/replies";
import ThreadComment from "./threadComment";
import { parseHtml } from "../utils/parseHtml";
import ThreadDetailLoading from "./threadDetailLoading";

export default function ThreadDetail({ thread, id }) {
  const todayDate = String(new Date().getDate());
  const { data: tokens } = useQuery({
    queryKey: ["reddit", "auth", todayDate],
    queryFn: getToken(),
  });
  const { isPending, error, data } = useQuery({
    queryKey: ["reddit", thread, id],
    queryFn: getThreadDetail({
      thread: thread,
      id: id,
      token: tokens?.data?.access_token,
    }),
    select: (res) => {
      return {
        opTitle: res[0].data.children[0].data.title,
        opPostBy: res[0].data.children[0].data.author,
        voteCount: res[0].data.children[0].data.score,
        opTimePost: format(
          fromUnixTime(res[0].data.children[0].data.created_utc),
          "dd MMM yyyy",
        ),
        opContent: res[0].data.children[0].data.selftext_html,
        comment: modelReplies(res[1]),
      };
    },
    enabled: !!tokens?.data?.access_token,
  });

  if (isPending) return <ThreadDetailLoading />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div className="px-4 py-6 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <span className="text-xs font-bold">{thread}</span>
            <span className="text-xs">{data.opTimePost}</span>
          </div>
          <span className="text-xs">{data.opPostBy}</span>
        </div>
        <h1 className="text-lg font-semibold">{data.opTitle}</h1>
        <div className="text-sm">{parseHtml(data.opContent)}</div>
        <div>
          {data.comment.map((comment) => (
            <div key={`${comment.link_id}${comment.id}`}>
              <ThreadComment {...comment} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

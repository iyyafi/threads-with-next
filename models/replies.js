import { fromUnixTime, format, isValid } from "date-fns";

export const modelReplies = (replies) =>
  replies.data.children.map((reply) => ({
    id: reply.data.id,
    content: reply.data.body,
    postBy: reply.data.author,
    postTime: format(fromUnixTime(reply.data.created_utc), "dd MMM yyyy"),
    ...(reply.data.replies.data?.children[0]?.body && {
      replies: modelReplies(reply.data.replies),
    }),
  }));

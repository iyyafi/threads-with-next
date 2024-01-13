import { fromUnixTime, format, isValid } from "date-fns";

export const modelReplies = (replies) =>
  replies.data.children.map(
    (reply) =>
      reply.kind !== "more" && {
        id: reply.data.id,
        content: reply.data.body,
        postBy: reply.data.author,
        postTime: format(fromUnixTime(reply.data.created_utc), "dd MMM yyyy"),
        isValidDate: isValid(fromUnixTime(reply.data.created_utc)),
        ...(reply.data &&
          reply.data?.replies && {
            replies: modelReplies(reply.data.replies),
          }),
      }
  );

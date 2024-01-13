import { parseHtml } from "../utils/parseHtml";

export default function ThreadComment(props) {
  if (!props?.content) return false;
  return (
    <div className="border-l-2 border-l-[#E4E4E4] pl-2 py-2 flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <span className="text-xs">{props.postBy}</span>
        <span className="text-xs text-[#576F76]">{props.postTime}</span>
      </div>
      <div className="text-sm">{parseHtml(props.content)}</div>
      {props.replies?.length
        ? props.replies.map((reply) => {
            return (
              <div key={`${reply.link_id}${reply.id}`}>
                <ThreadComment {...reply} />
              </div>
            );
          })
        : null}
    </div>
  );
}

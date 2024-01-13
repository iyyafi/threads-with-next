import parse from "html-react-parser";

export default function ThreadComment(props) {
  return (
    <div className="border-l-2 border-l-[#E4E4E4] pl-2">
      <div className="flex flex-row">
        <span>{props.postBy}</span>
        <span>{props.postTime}</span>
      </div>
      <div className="text-sm">{parse(props?.content || "")}</div>
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

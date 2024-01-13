import parse from "html-react-parser";

export default function ThreadComment(props) {
  return (
    <div className="px-1">
      <div className="flex flex-row">
        <span>{props.postBy}</span>
        <span>{props.postTime}</span>
      </div>
      <div className="text-sm">{parse(props?.content || "")}</div>
      {props.replies?.length
        ? props.replies.map((reply) => {
            return <ThreadComment key={reply.id} {...reply} />;
          })
        : null}
    </div>
  );
}

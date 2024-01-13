import Image from "next/image";
import Link from "next/link";

export default function ThreadCard(props) {
  const { title, postedBy, timePost, commentCount, voteCount, id, thread } =
    props;
  return (
    <Link href={`/${thread}/${id}`}>
      <div className="border-b border-[#ccc] px-4 py-2">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="text-xs font-bold">{postedBy}</span>
            <span className="text-xs text-[#576F76]">{timePost}</span>
          </div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <div className="flex flex-row gap-2">
            <span className="flex h-[32px] flex-row items-center gap-[6px] rounded-full bg-[#EAEDEF] px-3">
              <Image
                src="/upvote.svg"
                alt="Upvote"
                width={16}
                height={16}
                priority
              />
              <span className="text-xs">{voteCount}</span>
              <Image
                src="/downvote.svg"
                alt="Downvote"
                width={16}
                height={16}
                priority
              />
            </span>
            <span className="flex h-[32px] flex-row items-center gap-[6px] rounded-full bg-[#EAEDEF] px-3">
              <Image
                src="/comment.svg"
                alt="Comment"
                width={20}
                height={20}
                priority
              />
              <span className="text-xs">{commentCount}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

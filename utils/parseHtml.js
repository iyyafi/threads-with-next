import parse from "html-react-parser";

export const parseHtml = (content = <></>) => {
  if (typeof content !== "string") return content;
  return parse(parse(content));
};

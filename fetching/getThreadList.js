import axios from "axios";

export function getThreadList({ sort }) {
  return () =>
    axios
      .get(`https://oauth.reddit.com/r/DotA2/${sort}`, {
        headers: {
          Authorization: `bearer ${process.env.NEXT_PUBLIC_REDDIT_TOKEN}`,
        },
      })
      .then((res) => res.data);
}

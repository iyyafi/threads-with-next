import axios from "axios";

export const getThreadList = () =>
  axios
    .get("https://oauth.reddit.com/r/DotA2/hot", {
      headers: {
        Authorization: `bearer ${process.env.REDDIT_TOKEN}`,
      },
    })
    .then((res) => res.data);

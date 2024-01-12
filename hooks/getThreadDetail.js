import axios from "axios";

export const getThreadDetail =
  ({ thread, id }) =>
  () =>
    axios
      .get(`https://oauth.reddit.com/r/${thread}/comments/${id}`, {
        headers: {
          Authorization: `bearer ${process.env.NEXT_PUBLIC_REDDIT_TOKEN}`,
        },
      })
      .then((res) => res.data);

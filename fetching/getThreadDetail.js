import axios from "axios";

export const getThreadDetail =
  ({ thread, id, token }) =>
  () =>
    axios
      .get(`https://oauth.reddit.com/r/${thread}/comments/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => res.data);

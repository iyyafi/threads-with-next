import axios from "axios";

export function getThreadList({ sort, token }) {
  return () =>
    axios
      .get(`https://oauth.reddit.com/r/DotA2/${sort}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => res.data);
}

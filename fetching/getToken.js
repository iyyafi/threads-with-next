import axios from "axios";

export function getToken() {
  return () =>
    axios
      .post(
        `https://www.reddit.com/api/v1/access_token`,
        {
          grant_type: "password",
          username: process.env.NEXT_PUBLIC_REDDIT_USERNAME,
          password: process.env.NEXT_PUBLIC_REDDIT_PASSWORD,
        },
        {
          headers: {
            Authorization: `Basic ${process.env.NEXT_PUBLIC_REDDIT_AUTH}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      )
      .then((res) => {
        return res.data;
      });
}

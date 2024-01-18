import axios from "axios";

export function getToken() {
  return () =>
    axios.get(`https://threads-with-next.vercel.app/api/token`).then((res) => {
      return res.data;
    });
}

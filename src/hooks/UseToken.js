import { useEffect, useState } from "react";
const useToken = (user) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const email = user?.user?.email;
    const name = user?.user?.displayName || user?.user?.name;
    const currentUser = {
      email: email,
      user_name: name,
    };
    if (email) {
      fetch(`https://books-library-server.vercel.app/user?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          const accessToken = data.token;
          localStorage.setItem("accessToken", accessToken);
          setToken(accessToken);
        });
    }
  }, [user]);
  return [token];
};

export default useToken;

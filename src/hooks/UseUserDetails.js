import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Api from "../services/Api";
import { GetUserInfo } from "./query";

const UseUserDetails = () => {
  const [user, setUser] = useState({ email: "", name: "" });
  const [userRoles, setUserRoles] = useState(["VIEW_ALL"]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data } = GetUserInfo(user.email);

  const useUserRegister = (location, navigate) => {
    const queryClient = useQueryClient();
    return useMutation(
      ({ email, password, name }) => Api.user.register(email, name, password),
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries("USER_INFO");
          setUser(data.user);
          setUserRoles(data.user.role);
          setError(data.message);
          localStorage.setItem("accessToken", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          const destination = location?.state?.from || "/";
          navigate(destination);
        },
        onError: ({ response }) => setError(response.data.message),
      }
    );
  };

  const useUserSignIn = (location, navigate) => {
    const queryClient = useQueryClient();
    return useMutation(
      ({ email, password }) => Api.user.login(email, password),
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries("USER_INFO");
          setUser(data.user);
          setUserRoles(data.user.role);
          setError(data.message);
          localStorage.setItem("accessToken", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          const destination = location?.state?.from || "/";
          navigate(destination);
        },
        onError: ({ response }) => setError(response.data.message),
      }
    );
  };

  useEffect(() => {
    if (data.result) {
      setIsLoading(true);
      setUserRoles(data.result.role);
      const user = {
        username: data.result.username,
        email: data.result.email,
        role: data.result.role,
      };
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoading(false);
    }
  }, [data]);

  // LOGOUT
  const logout = () => {
    setUser({ email: "", username: "" });
    localStorage.clear("user");
    localStorage.clear("accessToken");
  };

  // SET USER TO STATE GLOBALLY
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    if (
      (user.email === "" && userDetails !== null) ||
      (user.email === undefined && userDetails !== null)
    ) {
      setUser(userDetails);
    }
  }, [user.email]);

  return {
    useUserRegister,
    logout,
    useUserSignIn,
    isLoading,
    setIsLoading,
    user,
    error,
    userRoles,
  };
};

export default UseUserDetails;

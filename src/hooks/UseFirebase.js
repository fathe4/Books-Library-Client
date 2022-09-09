import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useEffect, useLayoutEffect, useState } from "react";
import FirebaseInitialization from "../Firebase/firebase.init";

FirebaseInitialization();

const UseFirebase = () => {
  const [user, setUser] = useState({ email: "", name: "" });
  const [userRoles, setUserRoles] = useState(["VIEW_ALL"]);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUserRoleLoading, setIsUserRoleLoading] = useState(false);
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  // REGISTER WITH EMAIL AND PASSWORD
  const RegisterUser = (email, password, name, location, navigate) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUser = { email, displayName: name };
        setUser(newUser);
        addUserToDB(email, name, "POST");
        setError("");
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            const destination = location?.state?.from || "/";
            navigate(destination);
          })
          .catch((error) => {});
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
        setIsUserRoleLoading(true);
      });
  };

  // SET TOKEN
  useLayoutEffect(() => {
    async function fetchData() {
      if ((isUserRoleLoading && user.email) || user.email) {
        await fetch(`http://localhost:5000/user?email=${user.email}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.token) {
              const accessToken = data.token;
              localStorage.setItem("accessToken", accessToken);
              setToken(accessToken);
              setUserRoles(data.result.role);
            } else {
              setError(data.error);
            }
          })
          .finally(() => setIsUserRoleLoading(false));
      }
    }
    fetchData();
  }, [user.email, isUserRoleLoading, token]);

  // SIGN IN WITH USER AND EMAIL
  const signIn = (email, password, location, navigate) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const destination = location?.state?.from || "/";
        navigate(destination);
        setError("");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  const signInWithGoogle = (location, navigate) => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        addUserToDB(user.email, user.displayName, "POST");
        setError("");
        const destination = location?.state?.from || "/";
        navigate(destination);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  // OBSERVE A USER
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setIsLoading(true);
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
      return () => unsubscribed;
    });
  }, [auth]);

  // LOGOUT
  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // ADD USER TO DATABASE
  const addUserToDB = async (email, name, method) => {
    const user = { name, email, role: ["VIEW_ALL"] };
    await fetch("http://localhost:5000/addUser", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        fetch(`http://localhost:5000/user?email=${email}`)
          .then((res) => res.json())
          .then((data) => {
            const accessToken = data.token;
            localStorage.setItem("accessToken", accessToken);
            setToken(accessToken);
          });
      })
      .finally(() => setIsUserRoleLoading(true));
  };

  return {
    RegisterUser,
    logout,
    signIn,
    isLoading,
    setIsLoading,
    user,
    error,
    token,
    signInWithGoogle,
    userRoles,
    setIsUserRoleLoading,
  };
};

export default UseFirebase;

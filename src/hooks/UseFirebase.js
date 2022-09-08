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
  const [isUserRoleLoading, setIsUserRoleLoading] = useState(true);
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  // REGISTER WITH EMAIL AND PASSWORD
  const RegisterUser = (email, password, name, location, navigate) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUser = { email, displayName: name };
        setUser(newUser);
        setIsUserRoleLoading(false);
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
      .finally(() => setIsLoading(false));
  };

  // SET TOKEN
  useLayoutEffect(() => {
    if (isUserRoleLoading || user.email) {
      fetch(`https://books-library-server.vercel.app/user?email=${user.email}`)
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
  }, [user.email, isUserRoleLoading]);

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
    await fetch("https://books-library-server.vercel.app/addUser", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then()
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

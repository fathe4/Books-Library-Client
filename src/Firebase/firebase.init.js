import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const FirebaseInitialization = () => {
    initializeApp(firebaseConfig);
}

export default FirebaseInitialization;
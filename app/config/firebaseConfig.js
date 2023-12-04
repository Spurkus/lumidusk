import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { FIREBASE_API_KEY } from "@env";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "lumidusk.firebaseapp.com",
  projectId: "lumidusk",
  storageBucket: "lumidusk.appspot.com",
  messagingSenderId: "331675614033",
  appId: "1:331675614033:web:b1a8dd01920eeb026f7170",
  measurementId: "G-GTWX38CC64",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };

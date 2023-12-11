import {
  ReactNode,
  FunctionComponent,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import * as firebaseAuth from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import * as SplashScreen from "expo-splash-screen";

type User = firebaseAuth.User | null;
type FirebaseAuthContextProps = { children: ReactNode };
type ContextState = { user: User };

const FirebaseAuthContext = createContext<ContextState | undefined>(undefined);

// FirebaseAuthProvider component
const FirebaseAuthProvider: FunctionComponent<FirebaseAuthContextProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Hide the splash screen once authentication state is resolved
    SplashScreen.hideAsync().catch(() => {});

    return unsubscribe;
  }, []);

  if (loading) {
    // No need to render anything here, as Expo splash screen will be shown automatically
    return null;
  }

  return (
    <FirebaseAuthContext.Provider value={{ user }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

function useFirebaseAuth() {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider",
    );
  }
  return context.user;
}

export { FirebaseAuthProvider, useFirebaseAuth };

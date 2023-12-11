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

type User = firebaseAuth.User | null;
type FirebaseAuthContextProps = { children: ReactNode };
type ContextState = { user: User };

const FirebaseAuthContext = createContext<ContextState | undefined>(undefined);

const FirebaseAuthProvider: FunctionComponent<FirebaseAuthContextProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(null);
  const value = { user };

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(auth, (user) => {
      console.log(user?.email);
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <FirebaseAuthContext.Provider value={value}>
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

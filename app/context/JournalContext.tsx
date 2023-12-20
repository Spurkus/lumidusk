import {
  FunctionComponent,
  ReactNode,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

type ContextState = {
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
};

type JournalContextProps = { children: ReactNode };
const JournalContext = createContext<ContextState | undefined>(undefined);

const JournalProvider: FunctionComponent<JournalContextProps> = ({
  children,
}) => {
  const [update, setUpdate] = useState(false);
  const contextValue: ContextState = {
    update,
    setUpdate,
  };

  useEffect(() => {
    setUpdate(false);
  }, [update]);

  return (
    <JournalContext.Provider value={contextValue}>
      {children}
    </JournalContext.Provider>
  );
};

function useJournalData() {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error("useJournalData must be used within a JournalProvider");
  }
  return context;
}

export { JournalProvider, useJournalData };

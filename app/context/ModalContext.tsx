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
import ModalComponent from "../components/ModalComponent";

type ContextState = {
  setTitle: Dispatch<SetStateAction<string>>;
  setText: Dispatch<SetStateAction<string>>;
  setHeight: Dispatch<SetStateAction<number>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  setButtons: Dispatch<
    SetStateAction<{ label: string; onPress: () => void }[]>
  >;
  toggleModal: () => void;
  setBackDropPress: Dispatch<SetStateAction<{ onBackdropPress: () => void }>>;
};

type ModalContextProps = { children: ReactNode };
const ModalContext = createContext<ContextState | undefined>(undefined);

const ModalProvider: FunctionComponent<ModalContextProps> = ({ children }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [height, setHeight] = useState(1);
  const [buttons, setButtons] = useState([
    {
      label: "Close",
      onPress: () => setVisible(false),
    },
  ]);
  const [backDropPress, setBackDropPress] = useState({
    onBackdropPress: () => setVisible(false),
  });
  const [visible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible(!visible);
  };

  const contextValue: ContextState = {
    setTitle,
    setText,
    setHeight,
    setVisible,
    setButtons,
    toggleModal,
    setBackDropPress,
  };

  useEffect(() => {
    // Resetting all the things when its hidden so stuff doesn't carry over
    if (!visible) {
      setTitle("");
      setText("");
      setHeight(1);
      setButtons([{ label: "Close", onPress: () => setVisible(false) }]);
      setBackDropPress({
        onBackdropPress: () => setVisible(false),
      });
    }
  }, [visible]);

  return (
    <ModalContext.Provider value={contextValue}>
      <ModalComponent
        title={title}
        text={text}
        height={height}
        visible={visible}
        buttons={buttons}
        toggleModal={toggleModal}
        backDropPress={backDropPress}
      />
      {children}
    </ModalContext.Provider>
  );
};

function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

export { ModalProvider, useModal };

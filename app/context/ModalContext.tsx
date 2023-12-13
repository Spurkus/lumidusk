import {
  FunctionComponent,
  ReactNode,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
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
      onPress: () => {},
    },
  ]);
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
  };

  return (
    <ModalContext.Provider value={contextValue}>
      <ModalComponent
        title={title}
        text={text}
        height={height}
        visible={visible}
        buttons={buttons}
        toggleModal={toggleModal}
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

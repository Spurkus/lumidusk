import { FunctionComponent, Dispatch, SetStateAction } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";

type ModalComponentProps = {
  title: string;
  text: string;
  height: number;
  visible: boolean;
  toggleModal: () => void;
  button?: string;
  buttonFunction?: () => void;
};

const ModalComponent: FunctionComponent<ModalComponentProps> = ({
  title,
  text,
  height,
  visible,
  toggleModal,
  button,
  buttonFunction,
}) => {
  return (
    <Modal
      className={`my-auto self-center rounded-3xl bg-egggrey px-16 py-6 max-h-[${height}]`}
      isVisible={visible}
      onBackdropPress={() => toggleModal()}
      style={{ maxHeight: height }}
    >
      <Text
        className="mb-2 text-center text-eggwhite"
        style={{ fontFamily: "ClashGrotesk-Medium", fontSize: 34 }}
      >
        {title}
      </Text>
      <Text
        className="mb-8 text-center text-eggwhite"
        style={{ fontFamily: "ClashGrotesk-Regular", fontSize: 20 }}
      >
        {text}
      </Text>
      <TouchableOpacity
        className="h-[40px] w-[160px] items-center justify-center self-center rounded-2xl bg-eggorange shadow-eggorange"
        style={styles.shadowButton}
        onPress={buttonFunction ? buttonFunction : toggleModal}
      >
        <Text
          className="text-grey"
          style={{ fontFamily: "Satoshi-Bold", fontSize: 18 }}
        >
          {button ? button : "Close"}
        </Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  shadowButton: {
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
});

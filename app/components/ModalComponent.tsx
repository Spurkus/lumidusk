import { FunctionComponent, Dispatch, SetStateAction } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";

type ModalComponentProps = {
  title: string;
  text: string;
  visible: boolean;
  toggleModal: () => void;
};

const ModalComponent: FunctionComponent<ModalComponentProps> = ({
  title,
  text,
  visible,
  toggleModal,
}) => {
  return (
    <View>
      <Modal
        className="my-auto max-h-[200px] self-center rounded-3xl bg-egggrey px-16 py-6"
        isVisible={visible}
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
          onPress={toggleModal}
        >
          <Text
            className="text-grey"
            style={{ fontFamily: "Satoshi-Bold", fontSize: 18 }}
          >
            Close
          </Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  shadowButton: {
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
});

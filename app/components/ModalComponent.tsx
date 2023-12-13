import { FunctionComponent, Dispatch, SetStateAction } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";

type ModalComponentProps = {
  title: string;
  text?: string;
  height: number;
  visible: boolean;
  toggleModal: () => void;
  buttons: { label: string; onPress: () => void }[];
  backDropPress?: { onBackdropPress: () => void };
};

const ModalComponent: FunctionComponent<ModalComponentProps> = ({
  title,
  text,
  height,
  visible,
  toggleModal,
  buttons,
  backDropPress,
}) => {
  return (
    <Modal
      className={`my-auto max-w-[375px] self-center rounded-3xl bg-egggrey px-16 py-6 max-h-[${height}]`}
      isVisible={visible}
      onBackdropPress={() => {
        backDropPress ? backDropPress.onBackdropPress() : toggleModal();
      }}
      style={{ maxHeight: height }}
    >
      <Text
        className="mb-2 text-center text-eggwhite"
        style={{ fontFamily: "ClashGrotesk-Medium", fontSize: 34 }}
      >
        {title}
      </Text>
      {text ? (
        <Text
          className="mb-8 text-center text-eggwhite"
          style={{ fontFamily: "ClashGrotesk-Regular", fontSize: 20 }}
        >
          {text}
        </Text>
      ) : (
        <></>
      )}
      <View className="flex flex-row justify-center space-x-4">
        {buttons &&
          buttons.map((button, index) => (
            <TouchableOpacity
              key={index}
              className="h-[40px] items-center justify-center self-center rounded-2xl bg-eggorange px-8 shadow-eggorange"
              style={styles.shadowButton}
              onPress={button.onPress}
            >
              <Text
                className="text-grey"
                style={{ fontFamily: "Satoshi-Bold", fontSize: 18 }}
              >
                {button.label}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
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

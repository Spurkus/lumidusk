import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { auth } from "../config/firebaseConfig";
import { signInAnonymously, updateProfile } from "firebase/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Routes";
import { FirebaseError } from "firebase/app";
import { useModal } from "../context/ModalContext";

type GuestLoginProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList
  >;
};

const GuestLogin = ({ navigation }: GuestLoginProps) => {
  const modal = useModal();

  const handleGuest = () => {
    modal.setTitle("Are you sure?");
    modal.setText(
      "If login as a guest, your journals will be lost if you sign out or delete the app",
    );
    modal.setHeight(240);
    modal.setButtons([
      {
        label: "Cancel",
        onPress: () => modal.setVisible(false),
      },
      {
        label: "Confirm",
        onPress: async () => {
          try {
            const userCredential = await signInAnonymously(auth);
            await updateProfile(userCredential.user, { displayName: "guest" });
            navigation.navigate("Home");
            modal.setVisible(false);
          } catch (error: FirebaseError | unknown) {
            modal.setVisible(false);
            modal.setTitle("Error");
            modal.setHeight(240);
            if (!(error instanceof FirebaseError)) {
              modal.setText("Login error");
            } else {
              modal.setText("Login error: " + error.message);
            }
            modal.setVisible(true);
          }
        },
      },
    ]);
    modal.toggleModal();
  };
  return (
    <TouchableOpacity onPress={handleGuest}>
      <Text
        className="text-egglightgrey"
        style={{ fontFamily: "Satoshi-Bold", fontSize: 16 }}
      >
        continue as guest
      </Text>
    </TouchableOpacity>
  );
};

export default GuestLogin;

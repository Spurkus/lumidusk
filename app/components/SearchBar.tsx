import { View, TextInput, TouchableOpacity } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";

type SearchBarProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  return (
    <View className="relative flex-row">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        size={20}
        color="gray"
        style={{
          marginLeft: 32,
          marginTop: 13.5,
          position: "absolute",
          zIndex: 1,
        }}
      />
      <TextInput
        className="mx-4 mb-1 h-12 flex-1 rounded-2xl bg-[#E8E6EA] px-4 py-1 pl-11"
        style={{
          fontFamily: "Satoshi-Regular",
          fontSize: 18,
        }}
        placeholder="Search"
        onChangeText={(text) => setSearch(text)}
        value={search}
      />
      {search && (
        <TouchableOpacity
          onPress={() => {
            setSearch("");
          }}
          style={{
            position: "absolute",
            right: 28,
            top: 13.5,
            zIndex: 1,
          }}
        >
          <FontAwesomeIcon
            icon={faXmark}
            size={20}
            color="black"
            style={{ padding: 1 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

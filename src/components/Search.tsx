import React from "react";
import { View, Button, TextInput } from "react-native";

const Search = () => {
  const [text, onChangeText] = React.useState("");
  return (
    <View style={{ gap: 5, maxHeight: 35, flex: 1, flexDirection: "row" }}>
      <TextInput
        value={text}
        onChangeText={onChangeText}
        style={{ borderWidth: 2, borderColor: "black" }}
      />

      <Button onPressOut={() => console.log(text)} title="bonjour" />
    </View>
  );
};

export default Search;

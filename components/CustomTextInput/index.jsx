import TextInput from "react-native-text-input-interactive";

export default function CustomTextInput({ value, setValue, placeholder }) {
  return (
    <TextInput
      value={value}
      onChangeText={(text) => {
        setValue(text);
      }}
      placeholder={placeholder}
    />
  );
}

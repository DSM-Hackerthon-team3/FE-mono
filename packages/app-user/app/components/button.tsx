import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { color } from "../../../design-token/src/theme";

interface IButtonProps {
  children?: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
}

export const Button = ({ children, onPress, disabled }: IButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttoncontainer,
        { backgroundColor: disabled ? color.main[100] : color.main[400] },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttoncontainer: {
    backgroundColor: color.main[400],
    padding: 16,
    borderRadius: 10,
  },
  text: {
    color: color.white,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
});

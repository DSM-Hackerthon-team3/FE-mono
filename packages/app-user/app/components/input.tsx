import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { color, font } from "../../../design-token/src/theme";
import Eye from "../assets/eye.svg";
import EyeOff from "../assets/eye-off.svg";

interface IProp {
  value?: string;
  onChange: (text: string, id?: string) => void;
  placeholder: string;
  multiLine?: number;
  password?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  id?: string;
}

export const Input = ({
  value,
  onChange,
  placeholder,
  multiLine,
  password,
  disabled,
  required,
  error,
  label,
  id,
  ...props
}: IProp) => {
  const [visible, setVisible] = useState(false);
  const [focus, setFocus] = useState(false);

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text>*</Text>}
        </Text>
      )}
      <View
        style={{
          ...styles.inputContainer,
          backgroundColor: color.gray[50],
          alignItems: !!multiLine ? "flex-start" : "center",
        }}
      >
        {(error || focus) && (
          <View
            pointerEvents="none"
            style={{
              ...styles.border,
              borderColor: color.gray[50],
            }}
          />
        )}
        <TextInput
          {...props}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          secureTextEntry={!!password && !visible}
          value={value}
          onChangeText={(text) => onChange(text, id)}
          placeholder={placeholder}
          multiline={!!multiLine}
          numberOfLines={!!multiLine ? multiLine : 1}
          editable={!!!disabled}
          style={styles.input}
          placeholderTextColor={color.gray[700]}
        />
        {password && (
          <Pressable onPress={() => setVisible(!visible)}>
            {visible ? (
              <Eye width={24} height={24} />
            ) : (
              <EyeOff width={24} height={24} />
            )}
          </Pressable>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 5,
    padding: 12,
    position: "relative",
  },
  border: {
    zIndex: 40,
    borderWidth: 1,
    top: 0,
    left: 0,
    width: "110%",
    borderRadius: 8,
    position: "absolute",
  },
  input: {
    verticalAlign: "top",
    fontSize: 14,
    fontFamily: "Regular",
    width: "100%",
    flexShrink: 1,
  },
  label: {
    color: color.black,
    fontSize: 12,
    fontWeight: "400",
  },
  error: {
    color: color.error,
    fontSize: 12,
    alignSelf: "flex-end",
    marginTop: 4,
  },
});

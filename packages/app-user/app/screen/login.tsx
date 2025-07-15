import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Input } from "../components/input";
import { Layout } from "../components/layout";
import { Button } from "../components/button";
import { color } from "../../../design-token/src/theme";

export const Login = () => {
  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={Keyboard.dismiss}
      activeOpacity={1}
    >
      <Layout style={{ justifyContent: "space-between" }}>
        <View style={{ gap: 54 }}>
          <View style={{ gap: 4 }}>
            <Text style={styles.title}>
              JOB<Text style={{ color: color.main[400] }}>:D</Text>AM
            </Text>
            <Text style={{ fontSize: 16 }}>
              로그인 후 진로 탐색을 시작해보세요!
            </Text>
          </View>
          <View style={styles.inputGroup}>
            <Input
              label="아이디"
              onChange={() => {}}
              placeholder="아이디를 입력하세요"
              error=""
            />
            <Input
              label="비밀번호"
              onChange={() => {}}
              placeholder="비밀번호를 입력하세요"
              error=""
              password
            />
          </View>
        </View>
        <View style={{ width: "100%", gap: 13 }}>
          <Text>
            계정이 없으신가요?{" "}
            <Text
              style={{
                textDecorationLine: "underline",
                color: color.main[600],
              }}
            >
              회원가입
            </Text>
          </Text>
          <Button onPress={() => {}}>로그인</Button>
        </View>
      </Layout>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 42,
    fontWeight: "bold",
  },
  inputGroup: {
    width: "100%",
    gap: 38,
  },
});

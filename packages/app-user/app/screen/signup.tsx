import { useState } from "react";
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
import { RadioButton } from "react-native-paper";

export const Signup = () => {
  const [step, setStep] = useState<number>(0);
  const explainList = [
    "아이디를 입력해주세요!",
    "비밀번호를 입력해주세요!",
    "회원가입 후 진로 탐색을 시작해보세요!",
  ];
  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false,
  });
  const [gender, setGender] = useState<"male" | "female" | null>(null);

  const isRequiredChecked = agreements.terms && agreements.privacy;

  const handleAllAgree = () => {
    const newValue = !agreements.all;
    setAgreements({
      all: newValue,
      terms: newValue,
      privacy: newValue,
      marketing: newValue,
    });
  };

  const handleSingleAgree = (key: "terms" | "privacy" | "marketing") => {
    const newAgreements = {
      ...agreements,
      [key]: !agreements[key],
    };
    newAgreements.all =
      newAgreements.terms && newAgreements.privacy && newAgreements.marketing;
    setAgreements(newAgreements);
  };

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
            <Text style={{ fontSize: 16 }}>{explainList[step]}</Text>
          </View>
          <View style={styles.inputGroup}>
            {step === 0 && (
              <Input
                label="아이디"
                onChange={() => {}}
                placeholder="아이디를 입력해주세요"
                error=""
              />
            )}
            {step === 1 && (
              <>
                <Input
                  label="비밀번호"
                  onChange={() => {}}
                  placeholder="8~25자 내로 생성(대소문자, 숫자, 특수문자 포함)"
                  error=""
                />
                <Input
                  label="비밀번호 확인"
                  onChange={() => {}}
                  placeholder="비밀번호를 다시 입력해주세요"
                  error=""
                  password
                />
              </>
            )}
            {step === 2 && (
              <>
                <View style={{ gap: 8 }}>
                  <Text>성별</Text>
                  <View style={{ flexDirection: "row", gap: 12 }}>
                    <TouchableOpacity
                      onPress={() => setGender("male")}
                      activeOpacity={0.8}
                    >
                      <View
                        style={[
                          styles.gender,
                          {
                            borderWidth: 2,
                            borderColor:
                              gender === "male"
                                ? color.main[400]
                                : "transparent",
                          },
                        ]}
                      >
                        <Text
                          style={{
                            color:
                              gender === "male"
                                ? color.main[400]
                                : color.gray[700],
                          }}
                        >
                          남자
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setGender("female")}
                      activeOpacity={0.8}
                    >
                      <View
                        style={[
                          styles.gender,
                          {
                            borderWidth: 2,
                            borderColor:
                              gender === "female"
                                ? color.main[400]
                                : "transparent",
                          },
                        ]}
                      >
                        <Text
                          style={{
                            color:
                              gender === "female"
                                ? color.main[400]
                                : color.gray[700],
                          }}
                        >
                          여자
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ gap: 8 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <RadioButton
                      color="#0000ff"
                      value="all"
                      status={agreements.all ? "checked" : "unchecked"}
                      onPress={handleAllAgree}
                    />
                    <Text>전체동의</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <RadioButton
                      color="#0000ff"
                      value="terms"
                      status={agreements.terms ? "checked" : "unchecked"}
                      onPress={() => handleSingleAgree("terms")}
                    />
                    <Text>이용약관 동의 (필수)</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <RadioButton
                      color="#0000ff"
                      value="privacy"
                      status={agreements.privacy ? "checked" : "unchecked"}
                      onPress={() => handleSingleAgree("privacy")}
                    />
                    <Text>개인정보 취급방침 동의 (필수)</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <RadioButton
                      color="#0000ff"
                      value="marketing"
                      status={agreements.marketing ? "checked" : "unchecked"}
                      onPress={() => handleSingleAgree("marketing")}
                    />
                    <Text>마케팅 정보 수신 동의 (선택)</Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
        <View style={{ width: "100%", gap: 13 }}>
          <Text>
            계정이 이미 있으신가요?{" "}
            <Text
              style={{
                textDecorationLine: "underline",
                color: color.main[600],
              }}
            >
              로그인
            </Text>
          </Text>
          <Button
            onPress={() => setStep(step + 1)}
            //  disabled={!isRequiredChecked}
          >
            {step === 2 ? "완료" : "다음"}
          </Button>
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
  gender: {
    paddingHorizontal: 28,
    paddingVertical: 12,
    backgroundColor: color.gray[50],
    borderRadius: 5,
  },
});

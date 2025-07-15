import {
  Platform,
  ScrollViewProps,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { color } from "../../../design-token/src/theme";

interface IProp extends ScrollViewProps {
  children: React.ReactElement | React.ReactElement[];
  Header?: React.ReactElement;
  Footer?: React.ReactElement;
  bottomPad?: boolean;
  scrollAble?: boolean;
}

export const Layout = ({
  children,
  Header,
  Footer,
  bottomPad,
  scrollAble,
  ...props
}: IProp) => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <>
      <View
        style={{
          height: top,
          width: "100%",
        }}
      />
      {scrollAble ? (
        <View
          style={{
            flex: 1,
            paddingBottom: !!!bottomPad ? bottom : 0,
          }}
        >
          <View style={{ width: "100%", zIndex: 200 }}>{Header}</View>
          <ScrollView>
            <View {...props} style={[styles.childrenContainer, props.style]}>
              {children}
            </View>
          </ScrollView>
          {Footer}
        </View>
      ) : (
        <View
          {...props}
          style={{
            ...styles.container,
            paddingBottom: !!!bottomPad ? bottom : 0,
            ...(props.style as object),
          }}
        >
          <View style={{ width: "100%", zIndex: 200 }}>{Header}</View>
          <View style={[styles.childrenContainer, props.style, { zIndex: 10 }]}>
            {children}
          </View>
          {Footer}
        </View>
      )}
      {!!bottomPad && (
        <View
          style={{
            ...styles.bottomPad,
            height: (Platform.OS === "ios" ? 50 : 60) + bottom,
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    alignItems: "center",
  },
  childrenContainer: {
    position: "relative",
    width: "100%",
    flex: 1,
    paddingHorizontal: 24,
    flexShrink: 1,
    gap: 32,
    paddingVertical: 24,
  },
  bottomPad: {
    bottom: 0,
    width: "100%",
    zIndex: 10,
    flexShrink: 0,
  },
});

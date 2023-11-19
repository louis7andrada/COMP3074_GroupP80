import { StyleSheet, View } from "react-native";

export default function Column({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    display: flex
  },
});

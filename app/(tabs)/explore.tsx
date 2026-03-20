import { StyleSheet, Text, View } from "react-native";

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.text}>This can become prompts, insights, or history later.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 12,
  },
  text: {
    color: "#CBD5E1",
    fontSize: 16,
    textAlign: "center",
  },
});
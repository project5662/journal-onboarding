import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Journal</Text>

        <Text style={styles.subtitle}>
          A quiet place to return to yourself.
        </Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/email")}
      >
        <Text style={styles.buttonText}>Begin</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F0E8",
    paddingHorizontal: 28,
    paddingVertical: 40,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 48,
    lineHeight: 54,
    color: "#1B1B18",
    fontWeight: "700",
    marginTop: 90,
    marginBottom: 16,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 28,
    color: "#6E6A61",
    maxWidth: 260,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#1B1B18",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 999,
    marginBottom: 24,
  },
  buttonText: {
    color: "#F3F0E8",
    fontSize: 16,
    fontWeight: "600",
  },
});
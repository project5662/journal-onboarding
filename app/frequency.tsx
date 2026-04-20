import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useOnboarding } from "../store/onboarding";

export default function FrequencyScreen() {
  const router = useRouter();
  const { setFrequency } = useOnboarding();

  const handleSelect = (value: string) => {
    setFrequency(value);
    router.push("/reflection" as any);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.eyebrow}>A gentle rhythm</Text>

        <Text style={styles.title}>How often would you like to return here?</Text>

        <Text style={styles.text}>
          Choose a pace that feels natural, not forced.
        </Text>
      </View>

      <View style={styles.options}>
        <Pressable
          style={styles.option}
          onPress={() => handleSelect("Daily")}
        >
          <Text style={styles.optionText}>Daily</Text>
        </Pressable>

        <Pressable
          style={styles.option}
          onPress={() => handleSelect("A few times per week")}
        >
          <Text style={styles.optionText}>A few times each week</Text>
        </Pressable>

        <Pressable
          style={styles.option}
          onPress={() => handleSelect("Once a week")}
        >
          <Text style={styles.optionText}>Once a week</Text>
        </Pressable>

        <Pressable
          style={styles.option}
          onPress={() => handleSelect("Whenever I feel like it")}
        >
          <Text style={styles.optionText}>Whenever it feels right</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F0E8",
    paddingHorizontal: 28,
    paddingTop: 72,
    paddingBottom: 36,
    justifyContent: "space-between",
  },
  eyebrow: {
    color: "#8A806E",
    fontSize: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 42,
    lineHeight: 48,
    color: "#1B1B18",
    fontWeight: "700",
    marginBottom: 14,
    letterSpacing: -1,
  },
  text: {
    fontSize: 17,
    lineHeight: 28,
    color: "#6E6A61",
    maxWidth: 310,
  },
  options: {
    marginBottom: 12,
  },
  option: {
    backgroundColor: "#E8E1D4",
    borderWidth: 1,
    borderColor: "#D3C8B6",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 12,
  },
  optionText: {
    color: "#1B1B18",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
  },
});
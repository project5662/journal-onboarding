import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useOnboarding } from "../store/onboarding";

export default function IntentScreen() {
  const router = useRouter();
  const { setIntent } = useOnboarding();

  const handleSelect = (value: string) => {
    setIntent(value);
    router.push("/frequency");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.eyebrow}>A little guidance</Text>

        <Text style={styles.title}>What feels present?</Text>

        <Text style={styles.text}>
          Choose the feeling you want this space to hold with you.
        </Text>
      </View>

      <View style={styles.options}>
        <Pressable
          style={styles.option}
          onPress={() => handleSelect("calm")}
        >
          <Text style={styles.optionText}>I feel overwhelmed or stressed</Text>
        </Pressable>

        <Pressable
          style={styles.option}
          onPress={() => handleSelect("cool")}
        >
          <Text style={styles.optionText}>I carry anger or frustration</Text>
        </Pressable>

        <Pressable
          style={styles.option}
          onPress={() => handleSelect("ground")}
        >
          <Text style={styles.optionText}>My thoughts feel anxious or restless</Text>
        </Pressable>

        <Pressable
          style={styles.option}
          onPress={() => handleSelect("reflect")}
        >
          <Text style={styles.optionText}>I want to understand myself better</Text>
        </Pressable>

        <Pressable
          style={styles.option}
          onPress={() => handleSelect("clarity")}
        >
          <Text style={styles.optionText}>I want more clarity and focus</Text>
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
    maxWidth: 300,
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
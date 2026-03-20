import { useRouter } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useOnboarding } from "../store/onboarding";

export default function NameScreen() {
  const router = useRouter();
  const { name, setName } = useOnboarding();

  const valid = name.trim().length > 1;

  const content = (
    <TouchableWithoutFeedback
      onPress={Platform.OS === "web" ? undefined : Keyboard.dismiss}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.eyebrow}>A little closer</Text>

          <Text style={styles.title}>What should I call you?</Text>

          <Text style={styles.text}>
            Just your name is enough.
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor="#8C877F"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <Pressable
            style={[styles.button, !valid && styles.disabled]}
            disabled={!valid}
            onPress={() => router.push("/intent")}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  if (Platform.OS === "web") {
    return <View style={styles.flex}>{content}</View>;
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={24}
    >
      {content}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: "#F3F0E8",
  },
  container: {
    flex: 1,
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
    maxWidth: 280,
  },
  form: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#E8E1D4",
    borderWidth: 1,
    borderColor: "#D3C8B6",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 18,
    color: "#1B1B18",
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#1B1B18",
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: "center",
  },
  disabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: "#F3F0E8",
    fontSize: 16,
    fontWeight: "600",
  },
});
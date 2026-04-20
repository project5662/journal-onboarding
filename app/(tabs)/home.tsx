import { useRouter } from "expo-router";
import { useState } from "react";
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
import { getEmotionTheme } from "../../constants/emotion-theme";
import { useOnboarding } from "../../store/onboarding";

export default function TabsHomeScreen() {
  const router = useRouter();
  const {
    name,
    intent,
    setName,
    setIntent,
    setFrequency,
    setEmail,
    setUserId,
  } = useOnboarding();

  const [entry, setEntry] = useState("");
  const theme = getEmotionTheme(intent);

  const handleLogout = () => {
    setName("");
    setIntent("");
    setFrequency("");
    setEmail("");
    setUserId("");
    router.replace("/");
  };

  const content = (
    <TouchableWithoutFeedback
      onPress={Platform.OS === "web" ? undefined : Keyboard.dismiss}
    >
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View>
          <Text style={[styles.eyebrow, { color: theme.subtext }]}>
            {name ? `Welcome back, ${name}` : "Welcome back"}
          </Text>

          <Text style={[styles.title, { color: theme.text }]}>
            How are you today?
          </Text>
        </View>

        <View
          style={[
            styles.promptCard,
            {
              backgroundColor: theme.card,
            },
          ]}
        >
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Reflect here..."
            placeholderTextColor={theme.subtext}
            multiline
            value={entry}
            onChangeText={setEntry}
          />
        </View>

        <Pressable
          style={[
            styles.logoutButton,
            {
              borderColor: theme.accent,
            },
          ]}
          onPress={handleLogout}
        >
          <Text style={[styles.logoutText, { color: theme.accent }]}>
            Log out
          </Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );

  if (Platform.OS === "web") {
    return content;
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
  },
  container: {
    flex: 1,
    padding: 28,
    justifyContent: "center",
  },
  eyebrow: {
    fontSize: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 48,
    lineHeight: 54,
    fontWeight: "700",
    marginBottom: 36,
    letterSpacing: -1,
  },
  promptCard: {
    borderWidth: 0,
    borderRadius: 20,
    padding: 22,
    marginBottom: 28,
  },
  input: {
    fontSize: 22,
    lineHeight: 34,
    minHeight: 180,
    textAlignVertical: "top",
    padding: 0,
    borderWidth: 0,
  },
  logoutButton: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "500",
  },
});
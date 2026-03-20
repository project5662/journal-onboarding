import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { getEmotionTheme } from "../constants/emotion-theme";
import { useOnboarding } from "../store/onboarding";

export default function JournalScreen() {
  const [text, setText] = useState("");
  const { intent } = useOnboarding();
  const theme = getEmotionTheme(intent);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.prompt, { color: theme.text }]}>
        Hur mår du idag?
      </Text>

      <TextInput
        style={[styles.input, { color: theme.text }]}
        placeholder="Börja skriva..."
        placeholderTextColor={theme.subtext}
        multiline
        autoFocus
        value={text}
        onChangeText={setText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  prompt: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 24,
  },
  input: {
    fontSize: 20,
    lineHeight: 34,
    flex: 1,
    textAlignVertical: "top",
  },
});
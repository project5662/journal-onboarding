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
import { getEmotionTheme } from "../constants/emotion-theme";
import { useOnboarding } from "../store/onboarding";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

function getWowCopy(intent: string, name: string) {
  switch (intent) {
    case "calm":
      return {
        eyebrow: "A quieter space",
        title: name
          ? `${name}, this space is here to soften the noise.`
          : "This space is here to soften the noise.",
        text: "You don’t need to carry everything at once.",
      };
    case "cool":
      return {
        eyebrow: "A cooler space",
        title: name
          ? `${name}, this space is here to make room for what burns.`
          : "This space is here to make room for what burns.",
        text: "Meet it with distance and honesty.",
      };
    case "ground":
      return {
        eyebrow: "A steadier space",
        title: name
          ? `${name}, this space is here to bring you back to ground.`
          : "This space is here to bring you back to ground.",
        text: "A place to land when thoughts move too fast.",
      };
    case "clarity":
      return {
        eyebrow: "A clearer space",
        title: name
          ? `${name}, this space is here to help what matters come into focus.`
          : "This space is here to help what matters come into focus.",
        text: "Less noise. More clarity.",
      };
    default:
      return {
        eyebrow: "A reflective space",
        title: name
          ? `${name}, this space is ready to meet you as you are.`
          : "This space is ready to meet you as you are.",
        text: "A quiet place to return to yourself.",
      };
  }
}

export default function WowScreen() {
  const router = useRouter();

  const {
    userId,
    accessToken,
    email,
    name,
    intent,
    frequency,
    setUserId,
    setEmail,
    setName,
    setIntent,
    setFrequency,
  } = useOnboarding();

  const [entry, setEntry] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedProfile, setSavedProfile] = useState(false);
  const [message, setMessage] = useState("");

  const theme = getEmotionTheme(intent);
  const copy = getWowCopy(intent, name);

  const saveProfileIfNeeded = async () => {
    if (saving || savedProfile) return;

    setSaving(true);
    setMessage("");

    try {
      await fetch(`${supabaseUrl}/rest/v1/profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${accessToken}`,
          Prefer: "resolution=merge-duplicates",
        },
        body: JSON.stringify({
          id: userId,
          email,
          name,
          intent,
          frequency,
          onboarding_completed: true,
        }),
      });

      setSavedProfile(true);
    } catch (error) {
      setMessage("Network error.");
    } finally {
      setSaving(false);
    }
  };

  const handleChangeText = async (text: string) => {
    setEntry(text);

    if (!savedProfile && text.trim().length > 0) {
      await saveProfileIfNeeded();
    }
  };

  const handleLogout = () => {
    setUserId("");
    setEmail("");
    setName("");
    setIntent("");
    setFrequency("");
    router.replace("/");
  };

  const content = (
    <TouchableWithoutFeedback
      onPress={Platform.OS === "web" ? undefined : Keyboard.dismiss}
    >
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View>
          <Text style={[styles.eyebrow, { color: theme.accent }]}>
            {copy.eyebrow}
          </Text>

          <Text style={[styles.title, { color: theme.text }]}>
            {copy.title}
          </Text>

          <Text style={[styles.text, { color: theme.subtext }]}>
            {copy.text}
          </Text>
        </View>

        <View
          style={[
            styles.promptCard,
            { backgroundColor: theme.card },
          ]}
        >
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="Reflect here..."
            placeholderTextColor={theme.subtext}
            multiline
            autoFocus
            value={entry}
            onChangeText={handleChangeText}
          />
        </View>

        {!!message && <Text style={styles.message}>{message}</Text>}

        <Pressable
          style={[
            styles.logoutButton,
            { borderColor: theme.accent },
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
    fontSize: 42,
    lineHeight: 48,
    fontWeight: "700",
    marginBottom: 16,
    letterSpacing: -1,
  },
  text: {
    fontSize: 17,
    lineHeight: 28,
    maxWidth: 320,
    marginBottom: 36,
  },
  promptCard: {
    borderRadius: 20,
    padding: 22,
  },
  input: {
    fontSize: 22,
    lineHeight: 34,
    minHeight: 200,
    textAlignVertical: "top",
    padding: 0,
    borderWidth: 0,
  },
  message: {
    color: "#9B5C4B",
    fontSize: 14,
    marginTop: 18,
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
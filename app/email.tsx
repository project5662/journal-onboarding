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
import { useOnboarding } from "../store/onboarding";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export default function Email() {
  const { setEmail, setUserId, setAccessToken, setName, setIntent, setFrequency } = useOnboarding();
  const router = useRouter();

  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [email, setLocalEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const valid = email.includes("@") && password.length >= 6;

  const handleAuth = async () => {
    if (!valid || loading) return;

    setMessage("");
    setLoading(true);

    try {
      const endpoint =
        mode === "signup"
          ? `${supabaseUrl}/auth/v1/signup`
          : `${supabaseUrl}/auth/v1/token?grant_type=password`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        setMessage("Unexpected server response.");
        return;
      }

      if (!response.ok) {
        setMessage(data?.msg || data?.message || "Something went wrong");
        return;
      }

      setEmail(email);

      const token = data?.access_token;

      if (mode === "signup") {
        const authUserId = data?.user?.id;
        if (!authUserId) {
          setMessage("Could not create account. Please try again.");
          return;
        }
        setUserId(authUserId);
        if (token) setAccessToken(token);
        router.push("/name");
        return;
      }

      const authUserId = data?.user?.id;
      if (!authUserId || !token) {
        setMessage("Could not read user session.");
        return;
      }

      setUserId(authUserId);
      setAccessToken(token);

      const profileResponse = await fetch(
        `${supabaseUrl}/rest/v1/profiles?id=eq.${authUserId}&select=*`,
        {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!profileResponse.ok) {
        setMessage("Could not load profile.");
        return;
      }

      const profiles = await profileResponse.json();

      const profile = profiles?.[0];

      if (profile?.onboarding_completed) {
        setName(profile.name || "");
        setIntent(profile.intent || "");
        setFrequency(profile.frequency || "");
        router.replace("/(tabs)/home" as any);
      } else {
        router.push("/name");
      }
    } catch {
      setMessage("Network or server error.");
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <TouchableWithoutFeedback
      onPress={Platform.OS === "web" ? undefined : Keyboard.dismiss}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.eyebrow}>
            {mode === "signup" ? "Begin" : "Return"}
          </Text>

          <Text style={styles.title}>
            {mode === "signup" ? "Enter your email" : "Welcome back"}
          </Text>

          <Text style={styles.text}>
            {mode === "signup"
              ? "A few quiet steps, and your space will be ready."
              : "Sign in to continue where you left off."}
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#8C877F"
            value={email}
            onChangeText={setLocalEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#8C877F"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {!!message && <Text style={styles.message}>{message}</Text>}

          <Pressable
            style={[styles.button, (!valid || loading) && styles.disabled]}
            disabled={!valid || loading}
            onPress={handleAuth}
          >
            <Text style={styles.buttonText}>
              {loading
                ? mode === "signup"
                  ? "Creating..."
                  : "Signing in..."
                : mode === "signup"
                ? "Continue"
                : "Sign in"}
            </Text>
          </Pressable>

          <Pressable
            style={styles.switchButton}
            onPress={() =>
              setMode((prev) => (prev === "signup" ? "signin" : "signup"))
            }
          >
            <Text style={styles.switchText}>
              {mode === "signup"
                ? "I already have an account"
                : "I need to create an account"}
            </Text>
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
    maxWidth: 290,
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
    marginBottom: 14,
  },
  message: {
    color: "#9B5C4B",
    fontSize: 14,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#1B1B18",
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 4,
  },
  disabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: "#F3F0E8",
    fontSize: 16,
    fontWeight: "600",
  },
  switchButton: {
    marginTop: 18,
    alignItems: "center",
  },
  switchText: {
    color: "#6E6A61",
    fontSize: 15,
  },
});
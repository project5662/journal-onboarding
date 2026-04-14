import { createContext, ReactNode, useContext, useState } from "react";

type OnboardingContextType = {
  userId: string;
  setUserId: (value: string) => void;
  accessToken: string;
  setAccessToken: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  intent: string;
  setIntent: (value: string) => void;
  frequency: string;
  setFrequency: (value: string) => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [intent, setIntent] = useState("");
  const [frequency, setFrequency] = useState("");

  return (
    <OnboardingContext.Provider
      value={{
        userId,
        setUserId,
        accessToken,
        setAccessToken,
        email,
        setEmail,
        name,
        setName,
        intent,
        setIntent,
        frequency,
        setFrequency,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error("useOnboarding must be used inside OnboardingProvider");
  }

  return context;
}
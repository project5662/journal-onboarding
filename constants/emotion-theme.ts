export const emotionThemes = {
  calm: {
    background: "#0F1A17",
    card: "#16231F",
    border: "#2D473F",
    text: "#F3F4EF",
    subtext: "#A8B3AD",
    accent: "#7FA38D",
  },
  cool: {
    background: "#111827",
    card: "#172033",
    border: "#2C3B55",
    text: "#F5F7FA",
    subtext: "#AAB6C4",
    accent: "#7A96B8",
  },
  ground: {
    background: "#1A1814",
    card: "#262219",
    border: "#3A3428",
    text: "#F6F1E8",
    subtext: "#B8AE9B",
    accent: "#A08F72",
  },
  reflect: {
    background: "#10141C",
    card: "#171D28",
    border: "#2B3342",
    text: "#F3F5F8",
    subtext: "#A4AFBF",
    accent: "#7E8DA3",
  },
  clarity: {
    background: "#F3F0E8",
    card: "#E8E1D4",
    border: "#D3C8B6",
    text: "#1B1B18",
    subtext: "#6E6A61",
    accent: "#8A806E",
  },
} as const;

export type EmotionThemeKey = keyof typeof emotionThemes;

export function getEmotionTheme(intent: string) {
  return emotionThemes[intent as EmotionThemeKey] ?? emotionThemes.reflect;
}
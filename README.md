## Journal Onboarding

Setup

1. Install dependencies

npm install

2. Environment variables

Create a .env file in the root of the project

Copy the contents from .env.example

Fill in the values with the keys you received

Example:

EXPO_PUBLIC_SUPABASE_URL=your_url
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_key

3. Run the app

npx expo start or npx expo start --tunnel

## Running the app

You can open the app in:

Expo Go

Android emulator

iOS simulator

Web

## Notes

The app will NOT work without .env

please Do NOT commit your .env file

Uses Expo + React Native + Supabase
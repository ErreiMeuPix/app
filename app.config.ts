import "dotenv/config";

import { ConfigContext, ExpoConfig } from "@expo/config";
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Errei Meu Pix",
  owner: "erreimeupix",
  slug: "erreimeupix",
  scheme: "erreimeupix",
  orientation: "portrait",
  updates: {
    fallbackToCacheTimeout: 0,
  },
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  version: "0.0.1",
  ios: {
    supportsTablet: false,
    usesAppleSignIn: true,
    bundleIdentifier: "app.erreimeupix",
    buildNumber: "0.0.7",
    infoPlist: {
      CFBundleURLTypes: [
        {
          CFBundleURLSchemes: [
            "XXX",
          ],
        },
      ],
    },
  },
  android: {
    package: "app.erreimeupix",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#0FDC6D",
    },
  },
  plugins: [
    [
      "expo-build-properties",
      {
        android: {
          compileSdkVersion: 33,
          targetSdkVersion: 33,
          buildToolsVersion: "33.0.0",
        },
      },
    ],
    "expo-router",
    "@react-native-google-signin/google-signin",
    "expo-apple-authentication",
  ],
  extra: {
    eas: {
      projectId: "a6d1ade4-0eb5-4668-9443-ec436fc7364d",
    },
  },
});

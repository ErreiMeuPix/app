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
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  version: "0.0.1",
  ios: {
    supportsTablet: false,
    bundleIdentifier: "app.erreimeupix",
    buildNumber: "0.0.1",
    infoPlist: {
      CFBundleURLTypes: [
        {
          CFBundleURLSchemes: [
            "com.googleusercontent.apps.696135610397-5shrtht51rebc1i4936pi66edhn6g47k",
          ],
        },
      ],
    },
  },
  android: {
    package: "app.erreimeupix",
    versionCode: 1,
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
  ],
  extra: {
    eas: {
      projectId: process.env.PROJECT_EAS_ID,
    },
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    GOOGLE_WEB_CLIENT_ID: process.env.GOOGLE_WEB_CLIENT_ID,
    GOOGLE_IOS_CLIENT_ID: process.env.GOOGLE_IOS_CLIENT_ID,
  },
});

import {
	ExpoConfig, ConfigContext
} from "@expo/config";
export default ({ config
}: ConfigContext): ExpoConfig => ({
	...config,
	name: "ErreiMeuPix",
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
		backgroundColor: "#ffffff"
	},
	version: "0.0.1",
	ios: {
		supportsTablet: false,
		bundleIdentifier: "app.erreimeupix",
		buildNumber: "0.0.1"
	},
	android: {
		package: "app.erreimeupix",
		versionCode: 1
	},
	plugins: [
		"expo-router",
		"@react-native-google-signin/google-signin"
	],
	extra: {
		eas: {
			projectId: "a6d1ade4-0eb5-4668-9443-ec436fc7364d",
		},
		// KLUBBS_API_URL: process.env.ENVIRONMENT_KLUBBS_API_URL,
	},
});

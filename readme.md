<!-- Criar build de desenvolvimento EXPO -->
eas build --profile development --platform android

<!-- Rodar em dev cliente mode EXPO -->
npx expo start --dev-client



<!-- Rodar funcões EDGE sem verificar JWT -->
npx supabase functions serve --no-verify-jwt
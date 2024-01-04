<!-- Para gerar build de desenvolvimento utilizar as envs no eas.development.json e alterar para eas.json -->


<!-- Criar build de desenvolvimento EXPO -->
eas build --profile development --platform android

<!-- Rodar em dev cliente mode EXPO -->
npx expo start --dev-client


<!-- Rodar funcões EDGE sem verificar JWT -->
npx supabase functions serve --no-verify-jwt

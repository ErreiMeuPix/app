
# Errei meu PIX

Seu pix de volta, em instantes

![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
## Criar build de desenvolvimento EXPO

Isso gera um build de desenvolvimento para ser executado em um device físico ou emulador

```bash
  eas build --profile development --platform android
```

Após o build é necessário rodar o expo em modo dev

```bash
  npx expo start --dev-client
```





<!-- Rodar funcões EDGE sem verificar JWT -->
npx supabase functions serve --no-verify-jwt
## Modificação de versões

É necessário modificar a versão de compilação no arquivo app.config.ts e também nos respectivos arquivos abaixo

| Modelo            | Arquivo                                                          |
| ----------------- | ---------------------------------------------------------------- |
| IOS               | app.config.ts            |
| ANDROID           | android/app/build.gralde |

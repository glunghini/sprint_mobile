# Ford Dealer Intelligence — React Native + Expo

Aplicativo mobile multiplataforma (iOS e Android) desenvolvido com React Native e Expo.

## Estrutura do Projeto

```
FordApp/
├── app/                        # Telas (Expo Router)
│   ├── _layout.tsx             # Layout raiz + navegação
│   ├── index.tsx               # Tela de Login
│   ├── register.tsx            # Tela de Cadastro
│   ├── home.tsx                # Home com slider e serviços
│   ├── comparacao.tsx          # Comparação Ford vs Concorrentes
│   └── relatorios.tsx          # Dashboards e relatórios
├── src/
│   ├── components/
│   │   ├── FordLogo.tsx        # Logo SVG da Ford
│   │   └── Theme.ts            # Cores e constantes visuais
│   ├── data/
│   │   ├── carsDatabase.ts     # Dataset de carros (do CSV)
│   │   └── storage.ts          # AsyncStorage (usuário logado)
│   └── assets/
│       └── images.ts           # Referências de imagens
├── assets/                     # Imagens PNG (slider, carro misterioso)
│   ├── slider1.png
│   ├── slider2.png
│   ├── slider3.png
│   └── mystery_car.png
├── app.json
├── package.json
└── babel.config.js
```

## Como Rodar

### 1. Instalar dependências
```bash
npm install
```

### 2. Iniciar o servidor Expo
```bash
npx expo start
```

### 3. Rodar no dispositivo
- **iOS**: pressione `i` no terminal (requer macOS + Xcode) ou escaneie o QR no Expo Go
- **Android**: pressione `a` (requer Android Studio) ou escaneie o QR no Expo Go

### 4. Build para produção
```bash
# Android APK
npx eas build --platform android --profile preview

# iOS IPA
npx eas build --platform ios --profile preview
```

## Funcionalidades

| Tela | Funcionalidade |
|------|---------------|
| Login | Autenticação com e-mail e senha |
| Cadastro | Tipo: Interno Ford ou Concessionária |
| Home | Slider automático de imagens + navegação |
| Comparação | Ford Ranger Raptor vs 13 concorrentes (dados do CSV) |
| Relatórios | 3 abas: Vendas, Mercado, Satisfação |

## Tecnologias

- React Native 0.76
- Expo SDK 52
- Expo Router 4 (navegação baseada em arquivos)
- AsyncStorage (persistência de sessão)
- react-native-svg (gráficos e logo)
- expo-linear-gradient (gradientes)

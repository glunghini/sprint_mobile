# Ford Performance: Comparador de Veículos

Aplicativo desenvolvido para a disciplina de **Big Data Analytics (FIAP)**. O
projeto tem como foco a comparação técnica de veículos Ford contra
concorrentes diretos do mercado (pickups), com dashboards e relatórios de
apoio à decisão para concessionárias e equipe interna da Ford.

---

## Índice

- [Funcionalidades](#funcionalidades)
- [Telas do aplicativo](#telas-do-aplicativo)
- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como rodar em desenvolvimento](#como-rodar-em-desenvolvimento)
- [Gerando o APK (Expo EAS Build)](#gerando-o-apk-expo-eas-build)
- [Equipe](#equipe)

---

## Funcionalidades

- **Login e Cadastro:** acesso para colaboradores internos e concessionárias,
  com seleção de departamento ou concessionária vinculada ao usuário.
- **Home:** visão geral com destaque de modelo Ford, resumo rápido da base de
  dados, vitrine de concorrentes mapeados e atalhos para os módulos do app.
- **Comparativo Inteligente:** escolha um modelo Ford e um concorrente,
  filtrando por marca, e veja o "Duelo" com ficha técnica completa
  (potência, torque, motor, câmbio, tração, suspensão, dimensões, tanque,
  carga útil, multimídia e destaques off-road) com barras comparativas.
- **Dashboards Dinâmicos (Relatórios):** três painéis — Vendas, Mercado e
  Satisfação — com KPIs, gráfico de linha (vendas x meta), gráfico de rosca
  (share de mercado), ranking de vendedores e avaliações de clientes.
- **Interface Premium:** identidade visual consistente (cores, tipografia e
  componentes) inspirada na Ford em todas as telas do app.

## Telas do aplicativo

| Tela | Arquivo | Descrição |
|---|---|---|
| Login | `app/index.tsx` | Autenticação e link para cadastro |
| Cadastro | `app/register.tsx` | Criação de conta (concessionária ou interno Ford) |
| Home | `app/home.tsx` | Painel inicial com destaques e atalhos |
| Comparação | `app/comparacao.tsx` | Seleção de veículos Ford x concorrente |
| Duelo (Detalhe) | `app/comparacao-detalhe.tsx` | Ficha técnica comparativa completa |
| Relatórios | `app/relatorios.tsx` | Dashboards de Vendas, Mercado e Satisfação |

> Adicione aqui os prints/gifs de cada tela antes da entrega final, por
> exemplo: `![Home](./docs/screenshots/home.png)`.

## Tecnologias

- [React Native](https://reactnative.dev/) `0.76`
- [Expo](https://expo.dev/) SDK `52` + [Expo Router](https://docs.expo.dev/router/introduction/) `4`
- [TypeScript](https://www.typescriptlang.org/)
- [react-native-svg](https://github.com/software-mansion/react-native-svg) (gráficos dos relatórios)
- [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)
- [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/) (persistência local do usuário logado)

## Estrutura do projeto

```
sprint_mobile/
├─ app/                     # Telas (expo-router, roteamento por arquivo)
│  ├─ _layout.tsx           # Stack de navegação
│  ├─ index.tsx             # Login
│  ├─ register.tsx          # Cadastro
│  ├─ home.tsx               # Home
│  ├─ comparacao.tsx         # Seleção de veículos
│  ├─ comparacao-detalhe.tsx # Ficha técnica comparativa
│  └─ relatorios.tsx         # Dashboards
├─ src/
│  ├─ components/           # Theme (cores/fontes)
│  ├─ data/                 # Base de veículos + storage do usuário
│  └─ assets/
├─ assets/                  # Imagens, logo, ícones, splash
├─ app.json                 # Configuração do app Expo
├─ eas.json                 # Perfis de build (EAS Build)
└─ package.json
```

## Como rodar em desenvolvimento

Pré-requisitos: [Node.js](https://nodejs.org/) 18+ e o app **Expo Go**
instalado no celular (ou um emulador Android/iOS configurado).

```bash
# 1. Clone o repositório
git clone https://github.com/glunghini/sprint_mobile.git
cd sprint_mobile

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npx expo start
```

Escaneie o QR Code com o app **Expo Go** (Android) ou a câmera (iOS), ou
pressione `a` no terminal para abrir num emulador Android já configurado.

## Gerando o APK (Expo EAS Build)

O projeto já vem com `eas.json` configurado para gerar um **APK instalável**
(não um AAB de loja), pronto para testar em aparelho físico ou emulador.

```bash
# 1. Instale a CLI do EAS (uma vez só, globalmente)
npm install -g eas-cli

# 2. Faça login com sua conta Expo (crie uma gratuita em https://expo.dev se
#    ainda não tiver)
eas login

# 3. Vincule o projeto a um projeto EAS (gera um projectId em app.json)
eas init

# 4. Rode o build de Android usando o perfil "preview", que já está
#    configurado para gerar .apk
eas build --platform android --profile preview
```

O comando sobe o build para os servidores da Expo (gratuito, com fila
compartilhada) e, ao final, mostra um link para baixar o `.apk` — também
disponível em https://expo.dev, na seção **Builds** do projeto.

Para instalar no celular: baixe o `.apk` pelo link e abra o arquivo no
Android (é preciso permitir instalação de fontes desconhecidas nas
configurações do aparelho). Para emulador, arraste o `.apk` para dentro do
Android Studio Emulator ou use `adb install nome-do-arquivo.apk`.

> Alternativa sem instalar nada localmente: rode `eas build` diretamente do
> [expo.dev](https://expo.dev) conectando o repositório do GitHub.

### Perfis disponíveis em `eas.json`

| Perfil | Uso | Saída |
|---|---|---|
| `development` | Build com cliente de desenvolvimento (dev client), para depurar | `.apk` |
| `preview` | Build de teste, para compartilhar com a equipe/professor | `.apk` |
| `production` | Build final de entrega | `.apk` |

## Equipe

557538 – David Cordeiro

555619 – Tiago Morais

557065 – Vinicius Augusto

556892 – Guilherme Lunghini

99856 – Marchel Augusto
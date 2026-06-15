# Weather App

Aplicativo mobile desenvolvido com React Native e Expo para consulta de informações climáticas em tempo real.

O aplicativo permite pesquisar cidades, visualizar as condições climáticas atuais, acompanhar a previsão das próximas horas e utilizar a localização atual do dispositivo para obter informações meteorológicas de forma rápida e intuitiva.

## Funcionalidades

* Consulta do clima atual
* Busca de cidades por nome
* Geolocalização
* Previsão por hora
* Histórico de locais pesquisados
* Limpeza do histórico de pesquisas

## Tecnologias Utilizadas

* React Native
* Expo
* Expo Go
* TypeScript
* OpenWeather API
* Pexels API

## Arquitetura

O projeto segue o padrão MVVM (Model-View-ViewModel), promovendo uma melhor separação entre interface, lógica de negócio e gerenciamento de estado.

```text
src/
├── components/
├── hooks/
├── model/
├── services/
├── stores/
├── utils/
├── view/
└── viewmodel/
```

## Como rodar o projeto

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/weather-app.git
```

Acesse a pasta do projeto:

```bash
cd weather-app
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto:

```env
EXPO_PUBLIC_OPENWEATHER_API_KEY=SUA_CHAVE
EXPO_PUBLIC_PEXELS_API_KEY=SUA_CHAVE
```

Inicie o servidor:

```bash
npx expo start
```

Instale o aplicativo **Expo Go** em seu dispositivo Android ou iOS.

Após iniciar o projeto, escaneie o QR Code exibido no terminal ou navegador utilizando o Expo Go para executar o aplicativo em seu dispositivo móvel.

## Capturas de Tela

<table align="center">
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/26a8ffa4-062e-4c18-bfb3-d7bdeeb24872" width="250" />
      <br>
      <strong>Tela Inicial</strong>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/f209f60e-f7c5-456a-89e8-1a850ca0db9c" width="250" />
      <br>
      <strong>Busca de Localização</strong>
    </td>
  </tr>
</table>

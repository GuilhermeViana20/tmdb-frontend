# Nome do Projeto

Aplicação front-end feita com Vue.js.

## Tecnologias

- Vue 3
- Axios
- Bootstrap

## Configuração

1. Copie `.env.example` para `.env` e configure a variável:

    ```bash
    cp .env.example .env
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Rode o projeto:

    ```bash
    npm run dev
    ```

## Variáveis de ambiente

- VITE_API_BASE_URL: URL base da API para consumir os dados (ex: http://localhost:8080/api)

## Funcionalidades

- Busca de filmes via API externa
- Paginação
- Marcar/Desmarcar favoritos

## Estrutura

- Componentes em /src/components
- Páginas em /src/views
- Rotas em /src/router
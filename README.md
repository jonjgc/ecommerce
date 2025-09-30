# Loja Online - Aplicação Full-Stack

Esta é uma aplicação de e-commerce completa. O projeto é dividido em uma API backend RESTful e um frontend reativo.

## Sobre o Projeto

O projeto consiste em uma aplicação web completa. O **backend**, construído com **NestJS**, gerencia toda a lógica de negócio, incluindo produtos, usuários, autenticação e um sistema de carrinho de compras. O **frontend**, construído com **Next.js**, consome a API e fornece uma interface de usuário interativa para clientes e administradores.

## Funcionalidades

-   **Cadastro de Usuários:** Com confirmação de conta por e-mail (simulada).
-   **Autenticação:** Sistema de login seguro com JSON Web Tokens (JWT).
-   **Gerenciamento de Produtos:**
    -   Listagem pública de produtos, com suporte a filtros e paginação.
    -   Criação, atualização e remoção de produtos restrita a usuários administradores.
-   **Carrinho de Compras:** Usuários autenticados podem adicionar e remover produtos do carrinho.
-   **Cache:** Uso de Redis para cachear a lista de produtos, otimizando a performance.
-   **Tema Dark/Light:** Interface com suporte a tema claro e escuro.

## Tecnologias Utilizadas

### Backend
-   **NestJS com **TypeScript**
-   **PostgreSQL** como banco de dados relacional
-   **TypeORM** para o mapeamento objeto-relacional e migrations
-   **Redis** para cache de dados
-   **Swagger** para documentação interativa da API
-   **Passport.js** para estratégias de autenticação (JWT)

### Frontend
-   **Next.js** com **React** e **TypeScript**
-   **Styled Components** para estilização CSS-in-JS
-   **Axios** para requisições HTTP à API
-   **React Context API** para gerenciamento de estado global (Autenticação, Carrinho, Tema)
-   **React Hot Toast** para notificações

## Como Executar o Projeto Localmente

### Pré-requisitos

Antes de começar, garanta que você tenha os seguintes serviços instalados e rodando na sua máquina:
-   Node.js (v16 ou superior)
-   NPM
-   PostgreSQL
-   Docker (para rodar o Redis facilmente)

### Passo a Passo

A instalação é dividida em duas partes: primeiro o **backend**, depois o **frontend**. É recomendado usar dois terminais diferentes para rodar os servidores simultaneamente.

#### 1. Clonar o Repositório
```bash
git clone <https://github.com/jonjgc/ecommerce.git>
cd <backend>
```

#### 2. Configurar e Iniciar o Backend

*Em um terminal:*
```bash
1.  **Clone o repositório:**
    ```bash
    git clone <url-do-seu-repositorio>
    ```

2.  **Navegue até a pasta do backend:**
    ```bash
    cd loja-online/backend
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    -   Renomeie o arquivo `.env.example` para apenas `.env`.
    -   Abra o arquivo `.env` e preencha com suas credenciais do PostgreSQL, um segredo para o JWT,
     as informações do Redis, e as credenciais do Mailtrap.

5.  **Inicie os serviços (Redis):**
    -   O Redis é necessário para a funcionalidade de cache. Certifique-se de que o Docker Desktop
     esteja rodando.
     
        execute o comando abaixo:
        ```bash
        docker run --name ux-redis -p 6379:6379 -d redis
        ```
    -   *Nota: Certifique-se também de que seu servidor PostgreSQL esteja em execução.*

6.  **Execute as migrations do banco de dados:**
    ```bash
    npm run migration:run
    ```

7.  **Crie um usuário administrador para testes:**
    -   Este comando irá popular o banco de dados com uma conta de administrador pronta para uso.
    ```bash
    npm run seed
    ```

8.  **Inicie a aplicação:**
    ```bash
    npm run start:dev
    ```
```
**Backend pronto!** O servidor da API estará rodando em `http://localhost:3000`.

#### 3. Configurar e Iniciar o Frontend

*Abra um **novo terminal** (mantenha o terminal do backend rodando):*
```bash
# 1. Navegue até a pasta do frontend (a partir da raiz do projeto)
cd frontend

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
# Copie o arquivo de exemplo (use 'copy' no Windows)
cp .env.example .env.local

# O arquivo .env.local já vem configurado para se conectar ao backend em http://localhost:3000.

# 4. Inicie o servidor do frontend
npm run dev
```
 A interface estará acessível em `http://localhost:3001` no seu navegador.

## Endpoints e Documentação da API

A documentação completa e interativa da API do backend foi gerada com Swagger e está disponível em:

**`http://localhost:3000/api-docs`**

Lá você pode visualizar e testar todos os endpoints.

### Testando a Aplicação Completa

1.  Acesse `http://localhost:3001/register` para criar uma nova conta.
2.  Acesse `http://localhost:3001/login` para entrar na aplicação.
3.  Para testar as funcionalidades de administrador (como gerenciar produtos), você precisará alterar manualmente o campo `isAdmin` do seu usuário para `true` diretamente no banco de dados.
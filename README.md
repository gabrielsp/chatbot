# 🤖 Chatbot Inteligente

Um sistema completo de chatbot com interface web moderna e backend robusto, desenvolvido com React, TypeScript, Node.js e MongoDB.

## 🖼️ Screenshots

### Dashboard
![Dashboard](docs/dashboard.png)

### Home Page
![Home Page](docs/home-page.png)

### Login Page
![Login Page](docs/login-page.png)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Sobre o Projeto

Este projeto consiste em uma plataforma completa de chatbot que permite aos usuários criar, configurar e gerenciar chatbots personalizados. O sistema inclui autenticação, dashboard administrativo, upload de documentos para treinamento do chatbot e integração com múltiplas plataformas de autenticação social.

### Principais Características

- **Interface Moderna**: Design responsivo com glassmorphism e animações suaves
- **Autenticação Completa**: Login/registro com JWT, OAuth (Google, Apple, Facebook)
- **Dashboard Administrativo**: Estatísticas, gráficos e gerenciamento de usuários
- **Upload de Documentos**: Suporte a PDF, DOCX, TXT, HTML e planilhas
- **Configuração Flexível**: Personalização de mensagens de boas-vindas e dados da empresa
- **API RESTful**: Backend robusto com validação e tratamento de erros

## ✨ Funcionalidades

### Frontend
- 🏠 Página inicial com apresentação do produto
- 🔐 Sistema de autenticação completo
- 📊 Dashboard com estatísticas e gráficos
- ⚙️ Configuração personalizada do chatbot
- 👥 Gerenciamento de usuários
- 📁 Upload e processamento de documentos
- 🌙 Modo escuro/claro
- 📱 Design responsivo

### Backend
- 🔒 Autenticação JWT e OAuth
- 📧 Sistema de emails
- 📊 Processamento de documentos (PDF, DOCX, TXT, etc.)
- 🗄️ Banco de dados MongoDB
- 🚀 API RESTful
- ⚡ Rate limiting
- 🛡️ Validação de dados
- 📝 Logs estruturados

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento
- **Chart.js** - Gráficos e visualizações
- **React Quill** - Editor de texto rico
- **Axios** - Cliente HTTP
- **AOS** - Animações on scroll

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Tipagem estática
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação
- **Passport.js** - Estratégias de autenticação
- **Multer** - Upload de arquivos
- **Nodemailer** - Envio de emails
- **Helmet** - Segurança
- **Morgan** - Logs HTTP

## 📁 Estrutura do Projeto

```
chatbot/
├── chatbot-frontend/          # Aplicação React
│   ├── src/
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── pages/            # Páginas da aplicação
│   │   ├── contexts/         # Contextos React
│   │   ├── services/         # Serviços de API
│   │   ├── hooks/            # Custom hooks
│   │   └── styles/           # Estilos globais
│   └── public/               # Arquivos estáticos
│
└── chatbot-backend/           # API Node.js
    ├── src/
    │   ├── controllers/      # Controladores
    │   ├── models/           # Modelos MongoDB
    │   ├── routes/           # Rotas da API
    │   ├── middlewares/      # Middlewares
    │   ├── services/         # Serviços
    │   ├── utils/            # Utilitários
    │   └── config/           # Configurações
    └── logs/                 # Logs da aplicação
```

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **MongoDB** (local ou MongoDB Atlas)
- **Git**

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/gabrielsp/chatbot.git
cd chatbot
```

### 2. Configure o Backend

```bash
cd chatbot-backend

# Instale as dependências
npm install

# Crie o arquivo de variáveis de ambiente
cp .env.example .env
```

### 3. Configure o Frontend

```bash
cd ../chatbot-frontend

# Instale as dependências
npm install

# Crie o arquivo de variáveis de ambiente
cp .env.example .env
```

## ⚙️ Configuração

### Backend (.env)

```env
# Servidor
PORT=3000
NODE_ENV=development

# Banco de dados
MONGODB_URI=mongodb://localhost:27017/chatbot
# ou para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/chatbot

# JWT
JWT_SECRET=sua_chave_secreta_jwt
JWT_REFRESH_SECRET=sua_chave_refresh_jwt

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua_senha_de_app

# OAuth
GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret
APPLE_CLIENT_ID=seu_apple_client_id
APPLE_TEAM_ID=seu_apple_team_id
APPLE_KEY_ID=seu_apple_key_id
APPLE_PRIVATE_KEY=sua_apple_private_key
FACEBOOK_APP_ID=seu_facebook_app_id
FACEBOOK_APP_SECRET=seu_facebook_app_secret

# Frontend URL
FRONTEND_URL=http://localhost:5173

# API Key para Python
PYTHON_API_KEY=sua_api_key_python
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Chatbot Inteligente
```

## 🏃‍♂️ Uso

### Desenvolvimento

#### Backend
```bash
cd chatbot-backend

# Modo desenvolvimento
npm run dev

# Modo produção
npm run build
npm start
```

#### Frontend
```bash
cd chatbot-frontend

# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

### Produção

1. **Backend:**
   ```bash
   cd chatbot-backend
   npm run build
   npm start
   ```

2. **Frontend:**
   ```bash
   cd chatbot-frontend
   npm run build
   # Servir os arquivos da pasta dist com nginx, apache, etc.
   ```

## 🔌 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Esqueci a senha
- `POST /api/auth/reset-password` - Resetar senha
- `POST /api/auth/refresh-token` - Renovar token
- `GET /api/auth/verify-email/:token` - Verificar email

### OAuth
- `GET /api/auth/google` - Login Google
- `GET /api/auth/google/callback` - Callback Google
- `GET /api/auth/apple` - Login Apple
- `GET /api/auth/apple/callback` - Callback Apple
- `GET /api/auth/facebook` - Login Facebook
- `GET /api/auth/facebook/callback` - Callback Facebook

### Chatbot
- `GET /api/chatbot/config` - Obter configuração
- `PUT /api/chatbot/config` - Atualizar configuração
- `POST /api/chatbot/upload` - Upload de arquivo
- `POST /api/chatbot/users` - Adicionar usuário da plataforma
- `POST /api/chatbot/message` - Enviar mensagem
- `GET /api/chatbot/config-for-python` - Config para Python (API Key)

### Usuários
- `GET /api/users/profile` - Perfil do usuário
- `PUT /api/users/profile` - Atualizar perfil
- `PUT /api/users/password` - Alterar senha
- `GET /api/users/stats` - Estatísticas do usuário

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença de GABRIELSP e só deve ser utilizada para fins de conhecimento e aprendizagem. NÃO DEVE SER UTILIZADO EM PRODUÇÃO.

## 📞 Suporte

Se você tiver alguma dúvida ou problema, abra uma [issue](https://github.com/gabrielsp/chatbot/issues) no GitHub.

---

**Desenvolvido com ❤️ por GABRIELSP** 
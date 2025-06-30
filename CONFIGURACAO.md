# ⚙️ Guia de Configuração

Este arquivo contém instruções detalhadas para configurar o projeto Chatbot Inteligente.

## 📋 Arquivos de Configuração

### Backend (.env)

Crie um arquivo `.env` na pasta `chatbot-backend/` com o seguinte conteúdo:

```env
# Servidor
PORT=3000
NODE_ENV=development

# Banco de dados
MONGODB_URI=mongodb://localhost:27017/chatbot
# ou para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/chatbot

# JWT
JWT_SECRET=sua_chave_secreta_jwt_aqui
JWT_REFRESH_SECRET=sua_chave_refresh_jwt_aqui

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua_senha_de_app_gmail

# OAuth - Google
GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret

# OAuth - Apple
APPLE_CLIENT_ID=seu_apple_client_id
APPLE_TEAM_ID=seu_apple_team_id
APPLE_KEY_ID=seu_apple_key_id
APPLE_PRIVATE_KEY=sua_apple_private_key

# OAuth - Facebook
FACEBOOK_APP_ID=seu_facebook_app_id
FACEBOOK_APP_SECRET=seu_facebook_app_secret

# Frontend URL
FRONTEND_URL=http://localhost:5173

# API Key para Python
PYTHON_API_KEY=sua_api_key_python_aqui
```

### Frontend (.env)

Crie um arquivo `.env` na pasta `chatbot-frontend/` com o seguinte conteúdo:

```env
# API URL
VITE_API_URL=http://localhost:3000/api

# Nome da aplicação
VITE_APP_NAME=Chatbot Inteligente

# URL do frontend (para callbacks OAuth)
VITE_FRONTEND_URL=http://localhost:5173
```

## 🔧 Configurações Específicas

### MongoDB

1. **Local:**
   - Instale o MongoDB em sua máquina
   - Inicie o serviço: `mongod`
   - Use a URI: `mongodb://localhost:27017/chatbot`

2. **MongoDB Atlas:**
   - Crie uma conta em [MongoDB Atlas](https://cloud.mongodb.com)
   - Crie um cluster
   - Obtenha a string de conexão
   - Use a URI: `mongodb+srv://usuario:senha@cluster.mongodb.net/chatbot`

### Gmail (Para envio de emails)

1. Ative a verificação em duas etapas na sua conta Google
2. Gere uma senha de app:
   - Vá em Configurações da Conta Google
   - Segurança > Verificação em duas etapas > Senhas de app
   - Gere uma senha para "Email"
3. Use essa senha no campo `EMAIL_PASS`

### OAuth - Google

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto
3. Ative a API Google+ 
4. Crie credenciais OAuth 2.0
5. Configure as URLs de redirecionamento:
   - `http://localhost:3000/api/auth/google/callback` (desenvolvimento)
   - `https://seudominio.com/api/auth/google/callback` (produção)

### OAuth - Apple

1. Acesse [Apple Developer](https://developer.apple.com)
2. Crie um App ID
3. Configure Sign in with Apple
4. Gere uma chave privada
5. Obtenha as credenciais necessárias

### OAuth - Facebook

1. Acesse [Facebook Developers](https://developers.facebook.com)
2. Crie um novo app
3. Configure Facebook Login
4. Obtenha App ID e App Secret

## 🔑 Geração de Chaves

### JWT Secret

```bash
# Gere uma chave aleatória
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Python API Key

```bash
# Gere uma chave aleatória
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🚀 Verificação da Configuração

### Backend

```bash
cd chatbot-backend
npm run dev
```

Verifique se:
- O servidor inicia na porta 3000
- A conexão com MongoDB é estabelecida
- Não há erros de configuração no console

### Frontend

```bash
cd chatbot-frontend
npm run dev
```

Verifique se:
- O servidor inicia na porta 5173
- A aplicação carrega sem erros
- A conexão com a API está funcionando

## 🔍 Troubleshooting

### Erro de CORS
- Verifique se `FRONTEND_URL` está configurado corretamente
- Certifique-se de que o frontend está rodando na URL especificada

### Erro de Conexão com MongoDB
- Verifique se o MongoDB está rodando
- Confirme se a URI está correta
- Teste a conexão: `mongosh "sua_uri_aqui"`

### Erro de Email
- Verifique se a senha de app do Gmail está correta
- Confirme se a verificação em duas etapas está ativa
- Teste o envio de email manualmente

### Erro de OAuth
- Verifique se as credenciais estão corretas
- Confirme se as URLs de redirecionamento estão configuradas
- Verifique se as APIs estão ativadas no console do provedor

## 📝 Notas Importantes

- **Nunca commite** os arquivos `.env` no Git
- Mantenha as chaves secretas seguras
- Use variáveis de ambiente diferentes para desenvolvimento e produção
- Faça backup das configurações importantes
- Teste todas as funcuralidades após a configuração 
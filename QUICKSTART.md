# 🚀 Início Rápido

Este guia te ajudará a configurar e executar o projeto Chatbot Inteligente em poucos minutos.

## ⚡ Setup Rápido

### 1. Clone e Instale

```bash
# Clone o repositório
git clone https://github.com/gabrielsp/chatbot.git
cd chatbot

# Instale todas as dependências
npm run install:all
```

### 2. Configure o MongoDB

**Opção A - MongoDB Local:**
```bash
# Instale o MongoDB (se ainda não tiver)
# macOS: brew install mongodb-community
# Ubuntu: sudo apt install mongodb
# Windows: Baixe do site oficial

# Inicie o MongoDB
mongod
```

**Opção B - MongoDB Atlas (Recomendado):**
1. Acesse [MongoDB Atlas](https://cloud.mongodb.com)
2. Crie uma conta gratuita
3. Crie um cluster
4. Obtenha a string de conexão

### 3. Configure as Variáveis de Ambiente

#### Backend
```bash
cd chatbot-backend
cp .env.example .env
```

Edite o arquivo `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/chatbot
# ou para Atlas: mongodb+srv://usuario:senha@cluster.mongodb.net/chatbot

JWT_SECRET=sua_chave_secreta_aqui
JWT_REFRESH_SECRET=sua_chave_refresh_aqui

FRONTEND_URL=http://localhost:5173
```

#### Frontend
```bash
cd ../chatbot-frontend
cp .env.example .env
```

Edite o arquivo `.env`:
```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Execute o Projeto

```bash
# Volte para a pasta raiz
cd ..

# Execute ambos os projetos simultaneamente
npm run dev
```

🎉 **Pronto!** O projeto está rodando em:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev                    # Executa frontend e backend
npm run dev:backend           # Apenas backend
npm run dev:frontend          # Apenas frontend

# Build
npm run build                 # Build de ambos
npm run build:backend         # Build apenas backend
npm run build:frontend        # Build apenas frontend

# Produção
npm start                     # Inicia backend em produção
npm run start:frontend        # Preview do frontend buildado

# Limpeza
npm run clean                 # Remove node_modules e dist
npm run install:all           # Reinstala todas as dependências
```

## 🧪 Testando a Aplicação

1. **Acesse:** http://localhost:5173
2. **Registre-se** com um novo usuário
3. **Faça login** na aplicação
4. **Explore o dashboard** e configure seu chatbot
5. **Teste o upload** de documentos

## 🔍 Verificando se Tudo Funciona

### Backend
- ✅ Servidor rodando na porta 3000
- ✅ Conexão com MongoDB estabelecida
- ✅ Logs aparecendo no console

### Frontend
- ✅ Aplicação carregando sem erros
- ✅ Página inicial exibida
- ✅ Navegação funcionando

### API
- ✅ Endpoint `/api/auth/register` respondendo
- ✅ Endpoint `/api/chatbot/config` funcionando
- ✅ Upload de arquivos operacional

## 🚨 Problemas Comuns

### Erro de CORS
```bash
# Verifique se as URLs estão corretas no .env
FRONTEND_URL=http://localhost:5173
VITE_API_URL=http://localhost:3000/api
```

### Erro de MongoDB
```bash
# Teste a conexão
mongosh "sua_uri_aqui"
```

### Porta já em uso
```bash
# Mude a porta no .env
PORT=3001  # Backend
# E atualize VITE_API_URL no frontend
VITE_API_URL=http://localhost:3001/api
```

### Dependências não instaladas
```bash
npm run install:all
```

## 📚 Próximos Passos

1. **Configure OAuth** (Google, Apple, Facebook) - veja [CONFIGURACAO.md](CONFIGURACAO.md)
2. **Configure emails** para recuperação de senha
3. **Personalize** o design e funcionalidades
4. **Deploy** em produção

## 🆘 Precisa de Ajuda?

- 📖 Leia o [README.md](README.md) completo
- ⚙️ Consulte o [CONFIGURACAO.md](CONFIGURACAO.md) detalhado
- 🐛 Abra uma [issue](https://github.com/gabrielsp/chatbot/issues) no GitHub

---

**Boa sorte com seu chatbot! 🤖✨** 
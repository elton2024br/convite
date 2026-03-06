<div align="center">
  <h1>✨ Convite Digital — Monte Verde</h1>
  <p><strong>Landing Page de Convite para o Pré-Lançamento do Complexo Imobiliário e Turístico</strong></p>
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=for-the-badge&logo=tailwind-css" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB" />
</div>

<br>

## 📌 Sobre o Projeto

Este repositório contém o código-fonte do **convite digital oficial** para o pré-lançamento do Complexo Imobiliário e Turístico Monte Verde. O projeto foi desenhado sob o conceito de *"Quiet Luxury"* (luxo discreto), proporcionando uma experiência imersiva, responsiva e elegante.

O MVP foi dividido em uma arquitetura moderna e escalável, unindo um visual sofisticado no **Frontend** a um sistema de confirmação de presença (RSVP) rápido e seguro no **Backend**.

---

## 🏗️ Estrutura do Repositório (Codebase)

O projeto é dividido em dois serviços principais que se comunicam através de uma API.

### 🖥️ 1. Frontend (`/frontend`)
O lado do cliente. É onde a mágica visual acontece:
- **Core:** Desenvolvido puramente em React 19 (criado com CRA + Craco).
- **Estilização:** TailwindCSS 3 para um sistema de utilitários css rápido, junto a mais de 40 componentes Radix UI personalizados.
- **Animações:** Framer Motion é quem dá o tom para títulos que surgem em cascata (fade in) e botões dinâmicos.
- **Fluxo Visual em 3 Atos:** 
  1. O *Hero* (vídeo imersivo)
  2. Os *Detalhes* (data e hora com forte destaque tipográfico)
  3. O *CTA* (confirmação direta via WhatsApp e navegação pelo Google Maps).

### ⚙️ 2. Backend (`/backend`)
A engrenagem do RSVP (Répondez s'il vous plaît):
- **API:** Construída com Python 3 via FastAPI para máxima performance assíncrona.
- **Banco de Dados:** Conexão assíncrona ao MongoDB usando o Motor AsyncIOMotorClient.
- Servidor REST contendo rotas para consultar detalhes de eventos e gravar/listar presenças confirmadas.

---

## 🎨 Identidade Visual e Guidelines

A aparência do site segue diretrizes estritas documentadas em `design_guidelines.json`:
* **Tipografia:** `Fira Sans` para corpos de texto moderno e limpos; `Playfair Display` para toques luxuosos e acentos institucionais.
* **Paleta da Natureza:** Verde Profundo (`#2D4A2D`), Verde Musgo (`#6B7B3A`), Tons de Areia (`#D4C5A0`) e Ouro Velho (`#C4973B`).
* **Interface (UI):** Abundância de *Negative Space*, botões com bordas arredondadas (*pill-shaped*), sobreposições *Glassmorphic* e transições polidas.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) & [Yarn](https://yarnpkg.com/)
- [Python 3.9+](https://www.python.org/)
- [MongoDB](https://www.mongodb.com/) (Local ou Atlas)

### Iniciando o Backend (API)
1. Navegue até o diretório: `cd backend`
2. Instale os requerimentos: `pip install -r requirements.txt`
3. Crie um arquivo `.env` na raiz do `/backend` com as variáveis:
   ```env
   MONGO_URL=sua_connection_string_aqui
   DB_NAME=monte_verde_db
   ```
4. Suba a aplicação: `uvicorn server:app --reload`

### Iniciando o Frontend (Web)
1. Navegue até o diretório: `cd frontend`
2. Instale os pacotes: `yarn install`
3. Crie o arquivo `.env` (se necessário) apontando para a sua API local.
4. Rode a interface: `yarn start`
5. Acesse http://localhost:3000 no navegador.

---

<div align="center">
  <p>Feito para a experiência perfeita. 🏔️</p>
</div>

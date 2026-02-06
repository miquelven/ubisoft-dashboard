# Ubisoft Dashboard

Um painel de controle moderno e responsivo para visualização de dados da Ubisoft, construído com Next.js e Chakra UI.

## Sobre o Projeto

Este projeto é uma aplicação web que apresenta dados de jogos e jogadores da Ubisoft em um dashboard interativo. Ele foi desenvolvido para demonstrar o uso de tecnologias modernas de front-end na criação de interfaces de usuário ricas e informativas.

## Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)**: Um framework React para produção.
- **[React](https://reactjs.org/)**: Uma biblioteca JavaScript para construir interfaces de usuário.
- **[TypeScript](https://www.typescriptlang.org/)**: Um superconjunto de JavaScript que adiciona tipagem estática.
- **[Chakra UI](https://chakra-ui.com/)**: Uma biblioteca de componentes de interface de usuário simples, modular e acessível.
- **[Recharts](https://recharts.org/)**: Uma biblioteca de gráficos para React.
- **[ESLint](https://eslint.org/)**: Uma ferramenta de linting para identificar e corrigir problemas no código JavaScript/TypeScript.
- **[Tailwind CSS](https://tailwindcss.com/)**: Um framework CSS utilitário para estilização rápida.

## Como Começar

Siga estas instruções para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

Você precisará ter o [Node.js](https://nodejs.org/en/) (versão 20 ou superior) e o [npm](https://www.npmjs.com/) instalados em sua máquina.

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/ubisoft-dashboard.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd ubisoft-dashboard
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

### Executando a Aplicação

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) em seu navegador para ver a aplicação em funcionamento.

## Estrutura de Pastas

A estrutura de pastas do projeto está organizada da seguinte forma:

```
ubisoft-dashboard/
├── app/                # Contém todas as rotas, layouts e páginas da aplicação.
│   ├── analytics/      # Página de análise de dados.
│   ├── games/          # Páginas relacionadas a jogos.
│   ├── players/        # Página de listagem de jogadores.
│   └── ...
├── components/         # Componentes React reutilizáveis.
│   ├── layout/         # Componentes de layout (Header, Sidebar, etc.).
│   ├── ui/             # Componentes de UI genéricos (Botões, Inputs, etc.).
│   └── ...
├── public/             # Arquivos estáticos (imagens, fontes, etc.).
├── services/           # Serviços para buscar dados (ex: de uma API).
├── package.json        # Dependências e scripts do projeto.
└── ...
```

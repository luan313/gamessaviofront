# GamesSavio Frontend

GamesSavio é uma plataforma moderna de descoberta e acompanhamento de jogos, projetada para gamers que desejam monitorar preços, ler avaliações e compartilhar suas experiências.

![GamesSavio Banner](/public/placeholder-game.jpg)

## 🚀 Funcionalidades

- **Home Page Moderna**: Interface imersiva com carrosséis de jogos em alta e ofertas.
- **Perfil de Usuário**: Sistema de níveis, conquistas, estatísticas detalhadas e feed de atividades.
- **Monitoramento de Preços**: Acompanhe a variação de preços dos seus jogos favoritos.
- **Sistema de Avaliações**: Crie e leia reviews detalhados da comunidade.
- **Exploração por Categorias**: Encontre jogos por gênero e popularidade.

## 🛠️ Tecnologias Utilizadas

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI**: [Shadcn/ui](https://ui.shadcn.com/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Cliente HTTP**: [Axios](https://axios-http.com/)

## 📂 Estrutura do Projeto

```
gamessaviofront/
├── app/                # Páginas e rotas do Next.js
│   ├── profile/        # Página de perfil do usuário
│   ├── games/          # Listagem e detalhes de jogos
│   └── ...
├── components/         # Componentes React reutilizáveis
│   ├── ui/             # Componentes base (Shadcn)
│   ├── profile/        # Componentes específicos do perfil
│   └── ...
├── services/           # Camada de serviços para chamadas API
├── types/              # Definições de tipos TypeScript
└── lib/                # Utilitários e configurações
```

## 🚦 Como Executar

1. **Clone o repositório**
   ```bash
   git clone https://github.com/luan313/gamessaviofront.git
   cd gamessaviofront
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env.local` na raiz do projeto (se necessário) para configurar a URL da API.

4. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

5. **Acesse o projeto**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## 📝 Licença

Este projeto está sob a licença MIT.

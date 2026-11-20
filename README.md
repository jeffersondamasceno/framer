# Framer

Marketplace de exposição e comercialização de obras de arte e peças artesanais produzidas por artistas e artesãos independentes.

## Sobre

O Framer é um sistema de comércio eletrônico voltado na comercialização de obras de arte e peças artesanais originais, desenvolvido como parte de um Trabalho de Conclusão de Curso.

O propósito da plataforma é ampliar a visibilidade de artistas independentes, facilitar a comercialização direta de suas produções, e proporcionar um ambiente voltado à descoberta e aquisição de obras autorais.

Um dos principais diferenciais do Framer é a avaliação de evidências relacionadas à autoria e ao processo de produção de obras, com o objetivo de verificar se há elementos suficientes para sustentar que determinada produção não foi realizada com o uso de inteligência artificial generativa.

A avaliação não pretende identificar ou afirmar que uma obra foi gerada por inteligência artificial, mas sim analisar evidências que contribuam para sustentar sua origem humana. Com evidências insuficientes, o sistema não apresentará confirmação de que a obra não foi produzida por IA.

Para tal, a plataforma também usará de recursos de documentação do processo criativo, permitindo que artistas apresentem registros de diferentes etapas de produção por meio de imagens, vídeos, e esboços, que serão cautelosamente analisados por revisores humanos.

Além disso, como um marketplace, o Framer oferecerá recursos de gerenciamento de perfis e portfólios, publicação de obras, pesquisa e filtragem de produtos, carrinho de compras, e gerenciamento de pedidos.

Assim, o projeto visa contribuir tanto para a comercialização de produções artísticas e artesanais independentes quanto para a valorização da autoria, da transparência e da confiança no mercado de arte digital.

## Objetivos

### Objetivo geral 

Desenvolver uma plataforma virtual especializada na comercialização de obras de arte e peças artesanais produzidas por artistas e artesãos independentes, incorporando mecanismos de avaliação de evidências que contribuam para sustentar que as obras não foram produzidas por inteligência artificial generativa.

### Objetivos específicos

- Implementar mecanismos de autenticação e gerenciamento de usuários;
- Permitir o gerenciamento de perfis e portfólios de artistas;
- Desenvolver um catálogo de obras com recursos de pesquisa e filtragem;
Implementar funcionalidades de carrinho de compras e gerenciamento de pedidos;
- Possibilitar a comunicação entre artistas e compradores;
- Desenvolver mecanismos para registrar e documentar o processo criativo das obras;
- Apresentar informações sobre o resultado da avaliação sem afirmar que uma obra foi produzida por inteligência artificial;
- Comunicar quando as evidências disponíveis forem insuficientes para sustentar que uma obra não foi produzida por IA.

## Tecnologias utilizadas

### Front-End
- React
- TypeScript
- CSS

### Back-end
- Node.js
- NestJS

### Banco de Dados
- PostgreSQL

### Desenvolvimento
- Visual Studio Code

## Versionamento de código
- Git
- GitHub

## Arquitetura
O sistema é separado em três camadas principais:

- **Front-End:** Lida com a interação com os usuários e os elementos visuais;
- **Back-End:** É responsável pelas regras de negócio, processamento de requisições, e comunicação com o banco de dados;
- **Banco de Dados:** Garante a persistência das informações.

A comunicação entre front-end e back-end ocorrerá usando uma API REST.

## Estrutura do projeto

```text
framer/
│
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   │   └── banner.png
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── Banner/
│   │   │   ├── Button/
│   │   │   ├── home/
│   │   │   ├── SignUpForm/
│   │   │   └── TextField/
│   │   ├── data/
│   │   │   └── mockArtwork.ts
│   │   ├── pages/
│   │   │   ├── AuthPage.tsx
│   │   │   └── HomePage.tsx
│   │   ├── styles/
│   │   │   ├── auth.css
│   │   │   └── home.css
│   │   ├── types/
│   │   │   └── artwork.ts
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

### Organização do Front-End

- `assets/`: Armazenamento de imagens e recursos estáticos;
- `components/`: Componentes reutilizáveis da inteface; 
- `data/`: Dados simulados (mocks);
- `pages/`: Páginas da aplicação;
- `styles/`: Arquivos de estilização;
- `types/`: Interfaces e tipagens TypeScript das entidades do sistema.
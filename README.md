# API de Estudo Backend

Este projeto faz parte do meu aprendizado em desenvolvimento backend na Rocketseat.

## 💻 Tecnologias

- Node.js: Plataforma de desenvolvimento de aplicações JavaScript.
- Fastify: Framework web para node.js que ajuda na construção de APIs.
- SQLite: Banco de dados relacional leve e simples.
- TypeScript: Linguagem de programação que adiciona tipagem estática ao JavaScript.
- Knex: Query builder para node.js que funciona com SQLite, Postgres, MySQL e SQL Server.

## 📝 Aprendizados
- Gerenciar criações, consultas e teste para transações bancarias.
- Configurar ambiente de desenvolvimento, teste e produção.
- Entender e aplicar boas práticas de programação.
- Escrever testes automatizados para garantir a qualidade do código.

### Fundamentos de Backend

### Migrations
- Oque são migrations? Migrations são um sistema de versionamento para o banco de dados. Ela permite que você crie, altere e gerencie o esquema do banco de dados de forma organizada e controlada entre as equipes de desenvolvimento.

### Metodo up e down
- O metodo up é responsavel por criar a tabela.
- O metodo down é responsavel por dropar a tabela.
- Tudo que o up faz, o down deve fazer o contrario.

- Uma migration não pode ser alterada, para isso você deve criar uma nova migration.
- `migration:latest` -> aplica todas as migrations que ainda não foram aplicadas.
- `migration:rollback` -> desfaz a ultima migration.

### Alteração de tabela
- `alterTable` -> altera a tabela.
- Esta tabela sera responsavel por adicionar uma coluna a uma tabela existente.
- `index` -> Significa que a coluna sera indexada, ou seja, sera criado um indice para a coluna, o que pode melhorar o desempenho da consulta.

### Query Builder
- O query builder é uma ferramenta que permite que você construa consultas de forma mais facil e legivel.
- `where` -> filtra os dados.
- `select` -> seleciona os dados.

### Env
- O env é um arquivo que contem as variaveis de ambiente do projeto.
- `env.example` -> arquivo que contem as variaveis de ambiente do projeto.
- `env` -> arquivo que contem as variaveis de ambiente do projeto.

### Requisitos funcionais
- [x] O usuário deve poder criar uma nova transação
- [x] O usuário deve poder obter um resumo da sua conta
- [x] O usuário deve poder listar todas as transações criadas
- [x] O usuário deve poder visualizar uma transação especifica

### Regras de negócio
- [x] A transação pode ser do tipo crédito que somara ao valor total ou débito que subtraira do valor total.
- [ ] Deve ser possível identificar o usuário entre as requisições.
- [ ] O usuário só pode visualizar, criar, listar e deletar transações que ele criou.

### Requisitos não funcionais


### Rotas e Plugins
- O Plugin permite separarmos as rotas do projeto em arquivos diferentes, deixando o codigo mais organizado alem de outras funcionalidades.
- `app.register` -> registra um plugin no projeto.
- `prefix` -> define um prefixo para as rotas do plugin.


### Request e Response
- `request` -> objeto que contem os dados da requisição.
- `response` -> objeto que contem os dados da resposta.
- `body` -> corpo da requisição, onde existe os dados enviados pelo usuario.
- `params` -> parametros da rota, geralmente sao os dados da rota.
- `query` -> query params, geralmente sao os dados enviados para filtros.

### Tipagem no knex
- `knex.d.ts` -> arquivo que contem as tipagens do knex o 'd' significa que é um arquivo de definição de tipo.

### Rotas parametrizadas
- `:id` -> parametro da rota, geralmente sao os dados da rota.
- `zod` -> biblioteca que permite que você valide os dados da rota.
- `first()` -> metodo que retorna o primeiro registro da consulta evitando o uso de loops.

### Fazendo summary da tabela usando query builder
- `sum('amount', { as: 'amount' })` -> metodo que faz a soma dos valores de uma coluna e renomeia a coluna.
- `first()` -> metodo que retorna o primeiro registro da consulta evitando o uso de loops.

### Cookies
- `cookies()` -> Formas de manter contexto entre requisições garantindo que o historico de acesso do usuario seja mantido.
- São como parametros que são enviados automaticamente para o servidor, mas são armazenados no navegador do usuario.
- `path=/` -> Significa que o cookie sera valido para todas as rotas.
- `maxAge=60*60*24*7` -> Significa que o cookie sera valido por 7 dias.


### Middleware
- Middleware é uma função que é executada antes de uma requisição ser processada pela aplicação.
- `app.use` -> registra um middleware no projeto.
- `checkSessionIdExists` -> middleware que verifica se o usuario esta logado.
- `preHandler` -> executa o middleware antes de executar a rota.
- `addHook('preHandler', callback)` -> executa o middleware antes de executar a rota de uma maneira global usando em server.ts.


### Testes automatizados
- `definição` -> São formas da gente manter confiança na hora de fazer manutenções, adicionar novas funcionalidades e refatorações no código a longo prazo e garantir o funcionamento do sistema.
- `testes unitarios` -> Testar exclusivamente uma unidade do sistema em si. Por exemplo uma função.
- `testes de integração` -> Testar a comunicação entre as unidades. Geralmente é feito com banco de dados.
- `testes de aceitação` -> Simular um usuário utilizando a aplicação.
# Steps
- `teste de integração frontend` -> `abra a página de login, digite um email e senha, clique em entrar`
- `teste de integração backend` -> `Chamadas HTTP` -> `Websockets` -> `Eventos`

### Pirâmide de testes (Qual começar?)
- `E2E` -> Não dependem de nenhuma tecnologia ou arquitetura. São mais lentos. (poucos testes e2e)
- `Integração` -> Dependem um pouco mais de tecnologia ou arquitetura. (mais testes integração)
- `Unitários` -> Mais isolados, menos acoplados. (muitos testes unitarios)

- `Testes se isolam de qualquer contexto, testes jamais devem depender de outros testes. Se um depender do outro, talvez eles deveriam ser um só.`

### Vitest
- É um framework de teste para node.js, que facilita a escrita de testes e garante agilidade e ecalabilidade. 
- `describe` -> Define um grupo de testes.
- `it` -> Define um teste.
- `beforeAll` -> Executa uma função antes de todos os testes.
- `afterAll` -> Executa uma função depois de todos os testes.
- `it.todo` -> Define um teste que ainda não foi implementado.

### Ambiente de teste
- Ao usar o vitest, o node_env ja vem configurado como teste, então não é necessario informar no .env. Com isso informamos apenas a url do banco de dados de teste.
- Geralmente o teste precisa se adaptar ao código e não o contrario.
- `NODE_ENV=test` -> Define o ambiente de teste. (Não precisa ser informado no .env quando estamos usando o vitest ou jest)
- `DATABASE_URL=./db/test.db` -> Define a url do banco de dados de teste.
- `execSync` -> Executa um comando no terminal.
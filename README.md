## Como rodar o projeto:
# Deve-se atentar a instalação das dependências e a criação do arquivo .env, onde terá as variáveis de ambiente
# necessárias para a integração do sistema. Elas estarão salvas em um arquivo Word, no e-mail para contato do TCC.
# rachidtcccontato@gmail.com

# Na pasta raíz, tem um diretório chamado extra-features, sendo possível visualizar todos end-points do projeto.
# E sempre que houver alterações nos end-points, deve ser atualizado a collection correspondente.

# Deve gerar o Refresh token no link: https://developers.google.com/oauthplayground, adicionar os scopos
# https://mail.google.com/ e https://www.googleapis.com/auth/gmail.send.
# Tendo ele em mãos, deve adicioná-lo ao arquivo .env no campo REFRESH_TOKEN_URL.

# Link para acessar o Swagger da aplicação: http://localhost:3000/api

## Installation
```bash
$ npm install
```
## Running the app
```bash
# development
$ npm run start
# watch mode
$ npm run start:dev
# watch mode + debug
$ npm run start:debug
# production mode
$ npm run start:prod
```

## Test
```bash
# unit tests
$ npm run test
# e2e tests
$ npm run test:e2e
# test coverage
$ npm run test:cov
```
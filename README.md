<h1>Tech Chalange</h1>

## Architecture

- `Architecture` : Hexagonal

  A aquitetura do segue o modelo de diretórios listado a baixo utilizado o NODE js como linguagem de progamação e MONGO como storage database.

```bash
    --app/
        |__ application/
            |__ api/
                |__ controllers/
                |__ routes/
            |__ core/
            |__ database/
            |__ repositories/
        |__ domain/
            |__ cases/
            |__ entity/
        |__ tests/
            ...
        ...
```

## Data Base

Banco de dados do projeto é feito com MariaDB, dentro do arquivo de conexão com o banco de dados exite um processo no qual já é criado toda a base de dados assim que for executado o build do projeto.
Cada nova tabela desenvolvida DEVE ser adicionado o create no arquivo para que seja atualizado em todas as imagens.

```bash
  path: src/config/mariaDBConnect.js
  example:
  await db.query(`
        CREATE TABLE IF NOT EXISTS  cliente (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(200) not null,
            email VARCHAR(245) not null unique,
            cpf_cnpj VARCHAR(20) not null unique,
            birthday date not null,
            created datetime null,
            modified datetime null
        )  ENGINE=INNODB;

        ...
  `);
```

## Install Application

1. Docker DEVE estar instalado na sua maquina.

2. Baixar o Projeto na sua maquina

```bash
git clone https://github.com/sap1enza/web_cafeteria.git
```

3. Build Project
   `Para Criar o projeto digite o codigo abaixo no console`

```bash
docker-compose up -d --build
```

## Running tests

Aplicação realiza testes unitários com ...

```bash
    npm run test
```

## Autenticação

Foi utilizado o JWT para autenticação de endpoints. O script a baixo retorna o token para autenticação, qual o typo de requisição e o tempo de expiração

```bash
curl -X 'POST' \
  'http://localhost:3000/api/v1/user/auth' \
  -H 'accept: application/json' \
  -d ''
```

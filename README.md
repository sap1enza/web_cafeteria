<h1>Tech Chalange</h1>

## Architecture

- `Architecture` : Hexagonal

  A aquitetura do segue o modelo de diretórios listado a baixo utilizado o NODE js como linguagem de progamação e MONGO como storage database.

```bash
    --src/
      |__ core/
      |__contextoUm/
        |__ application/
        |__ domain/
        |__ core/
      ...
    --tests/
        |__contextoUm/
            |__ application/
            |__ domain/
              |__ entity/

        ...
```

## Install Application

1. Docker DEVE estar instalado na sua maquina.

2. Baixar o Projeto na sua maquina

```bash
git clone ....
```

3. Build Project
   `Para Criar o projeto digite o codigo abaixo no console`

```bash
docker-compose up -d --build
```

## Running tests

Aplicação realiza testes unitários com ...

```bash
    juntest ...
```

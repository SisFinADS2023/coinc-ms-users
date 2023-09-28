# ms-users

## Utilização

1. Copie o arquivo .env.sample e renomeie para .env
2. Insira o usuário, senha e nome da database


### Setup

Defina as credenciais da aws:

```
$ npm install
```

```
$ npx serverless config credentials -o --provider aws --key [aws-key] --secret [aws-secret]

```

ou:


```
$ serverless config credentials -o --provider aws --key [aws-key] --secret [aws-secret]

```

### Deploy

```
$ npx serverless deploy
```

```
$ npm serverless deploy
```

### Invocar uma lambda?

Após o deploy, você pode invokar uma função implantada utilizando o comando:

```bash
serverless invoke local --function getUser
```

Ou remotamente:

```brash
serverless invoke --function getUser
```

### Testes

Os testes unitários podem ser executados via npm:

```
npm test
```

ou via npx:

```
npx jest
```

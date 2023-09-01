# ms-users

## Usage

### Setup

Setting aws credentials first:

```
$ npm install 
```

```
$ npx serverless config credentials -o --provider aws --key [aws-key] --secret [aws-secret]
```

### Jest

```
npm install --save-dev ts-jest

npx ts-jest config:init 
```

### Deployment

In order to deploy the example, you need to run the following command:

```
$ npx serverless deploy
```

### Invocation

After successful deployment, you can invoke the deployed function by using the following command:

```bash
serverless invoke --function hello
```

Which should result in response similar to the following:

```json
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"Go Serverless v3.0! Your function executed successfully!\",\n  \"input\": {}\n}"
}
```

### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local --function hello
```

Which should result in response similar to the following:

```
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"Go Serverless v3.0! Your function executed successfully!\",\n  \"input\": \"\"\n}"
}
```

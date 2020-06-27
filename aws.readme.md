## AWS Set console profile
export AWS_PROFILE=lindon

## AWS Console login
$(aws ecr get-login --no-include-email --region eu-central-1)

## AWS Technologies
 - Amplify - https://eu-central-1.console.aws.amazon.com/amplify/home?region=eu-central-1#/
 - AppSync - https://eu-central-1.console.aws.amazon.com/appsync/home?region=eu-central-1#/
 - DynamoDB - https://eu-central-1.console.aws.amazon.com/dynamodb/home?region=eu-central-1#gettingStarted:

## Install Amplify and Configure

```
npm i aws-amplify -g
amplify configure // follow instructions
```

For more check this: https://aws-amplify.github.io/docs/

## Create new user for your project
```
amplify configure
```

https://docs.amplify.aws/start/getting-started/installation/q/integration/angular#option-1-watch-the-video-guide

## Create new Angular project

```
npm install -g @angular/cli
ng new myAmplifyProject
cd myAmplifyProject
```

```
(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
};
```

```
amplify init
```

### Install Amplify libraries

```
npm install @aws-amplify/api @aws-amplify/pubsub
```

```
npm install aws-amplify @aws-amplify/ui-angular
ng serve
```

For more check this tutorial: https://docs.amplify.aws/start/getting-started/setup/q/integration/angular#angular-6-support

# Todo Model
- id
- useId
- title
- description
- isCompleted
- isFavorite
- dueDate
- created
- updated

## GraphQL
GraphQL endpoint: https://y6q4ahgbcncefnzfv2zyjzrjpy.appsync-api.eu-central-1.amazonaws.com/graphql
GraphQL API KEY: da2-exgu57xl5zetxlr7mkbmvps4si

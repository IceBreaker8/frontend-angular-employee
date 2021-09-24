# Employeeamangerapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## ERRORS:
`npm add -D graphql` If you experience GraphQL problems.

https://github.com/aws-amplify/amplify-js/issues/2365#issuecomment-660666391

## Guide 

https://medium.com/workfall/how-to-build-an-angular-authentication-application-using-aws-amplify-3cdc6e67cfc2

## Docs

https://docs.amplify.aws/start/q/integration/angular

https://docs.amplify.aws/ui/auth/authenticator/q/framework/angular#installation
# ========= Deployment ==========
## Install AWS CLI

https://aws.amazon.com/cli/

## Configure AWS CLI

`> aws configure`

## Deploy to S3

`aws sync s3 sync dist/<project> s3://<bucketName>`

## Enable CORS in S3

## Cloudfront not updating from S3 (Invalidation)

https://stackoverflow.com/questions/30154461/aws-cloudfront-not-updating-on-update-of-files-in-s3

## Cloudfront secure EC2 elastic beanstalk

https://www.youtube.com/watch?v=V8vR7rA0ubs

## Configure Eslint for Unit Testing

https://eslint.org/docs/user-guide/getting-started

`> npx eslint src/app`
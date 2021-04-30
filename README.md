# FinancialHouse

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

NG-ZORRO Angular UI library used (https://ng.ant.design/) version 8.5.1

![Alt Text](https://financial-house-homework.herokuapp.com/assets/img/financial-house.gif)

DEMO: https://financial-house-homework.herokuapp.com/

## Important Explanation

* **MOCK & Cross Origin**

API throws Cross Origin error. There are no related properties like "Access-Control-Allow-Origin", "Access-Control-Allow-Methods" in response headers.
Mock data used, because of CORS problem. So all data comes from JSON files instead of API calls. ("assets/mock/*") Don't have enough time to add Mock Server like WireMock etc.

* **Preloading Strategy**

`PreloadAllModules` used as Preloading Strategy. It loads all the lazy-loading module as quickly as possible.
https://angular.io/api/router/PreloadingStrategy

* **Exception Handling (DefaultInterceptor.ts)**

Global Error Interceptor added. But there is not enough information for exception handling in the document and also mock data is not enough for testing Exceptions.

* **APP Initializer (SetupService.ts)**

APP Initializer added to get information before APP loaded. (Initialize User informations, get Roles and Permissions, Token validations etc.)

* **Authentication & Authorization**

`AuthInterceptor.ts` added as a HTTP interceptor to add token to Authorization header for HTTP requests.

* **Unsubscribe rxjs observable**

RxJS take(1) operator is automatically unsubscribes after the first execution.
So `pipe(take(1))` is used to unsubscribe observables.

Helpful Article: 
*https://medium.com/angular-in-depth/the-best-way-to-unsubscribe-rxjs-observable-in-the-angular-applications-d8f9aa42f6a0*

## Docker Settings

Docker Compose used. 

**Build**

`docker-compose build`

**Run**

You can use `docker-compose up` or `docker-compose up -d` for daemon mode to run as a container.
Port 80 assigned.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

**Run with Prod settings**

`npm run start:prod`

**Run with Test settings**

`npm run start:test`

**Run with Local settings**

`npm run start:local`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

**Prod build**

`npm run build:prod`

**Test build**

`npm run build:test`

**Local build**

`npm run build:local`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

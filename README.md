# How to run
In one cmd, type "node server.js" to run the server. This server is also the api server, and it connects to the mysql database.
In another cmd, type "ng serve" to serve the web application.
Note: The web application calls on the server for information. If you just ran the web application, you'll notice missing information if you went to the URL.

# To run locally
By default, the api server configs are local. host is "localhost" and port is 3000. Ensure this is in server.js as well as the session storage in app.component.ts

# Snow

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

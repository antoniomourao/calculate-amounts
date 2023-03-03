 
#Calculate Amount

This solution was setup by running dotnet command: 
```
dotnet new angular -o calculate-amount
````

## Run Application
On VS Code terminal run the following commands:
To do the first build run: 
```
dotnet build
```
To run the application run:
```
dotnet run
```
note: right bellow the above command there will be listed some URLs, just click on the first one to open in a browser. That will launch the SPA and the application will start in some seconds

## Setup Technical Requirements
Update Angular to the latest version:
```
ng update @angular/cli @angular/core
```
Remove references to bootstrap

Install [Angular Material](https://material.angular.io/)
```
ng add @angular/material
```

#.NET Core Project
In order to have the controllers working it was required to changed this file 'ClientApp/proxy.conf.js' and set context to "api":
```js
    context: [
      "/api",
   ],
```
#Calculate Amount

This solution was setup by running dotnet command: 
```
dotnet new angular -o calculate-amount
````

## Run Application
First build 
```
dotnet build
```
To run the application
```
dotnet run
```
note: it's required to click on one of the URLs listed in order to open the application.

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
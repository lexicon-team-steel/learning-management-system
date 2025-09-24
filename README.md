# Learning management system - LMS

This is a fullstack project. Backend is built using .NET, Entity Framework and C# while frontend is built using React, Typescript and Material UI.

## Set up project

Follow the guide below to run this project locally.

### Backend

Add a `secrets.json` file in the `LMS.API` directory with the the following content:

```
{
  "password": "password",
  "JwtSettings": {
    "secretkey": "ThisMustBeRealltLongDontWorkIfNot!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  }
}
```

#### For Mac:

- If you don't have Entity Framework you need to install this globally using `dotnet tool install --global dotnet-ef`.
- Go to the Backend directory `cd Backend`.
- Connect LMS.API with LMS.Infrastructure using `dotnet ef database update --project LMS.Infrastructure --startup-project LMS.API`.
- Go to the LMS.API directory `cd LMS.API`.
- Start backend with `dotnet run`.

#### For Windows:

- Open NuGet Package Manager.
- Run `Update-Database`.
- Start Backend with run button.

Now you should be able to view the api documentation on [http://localhost:5166/swagger/](http://localhost:5166/swagger/).

### Frontend

- Go to the Frontend directory `cd Frontend`.
- Run `nvm use` to get the correct node version.
- Run `npm i` and then `npm run dev`.

Now you should be able to access the project on [http://localhost:5173/](http://localhost:5173/).

You can log in with `teacher@test.com` and `student@test.com` and the password is `password`.

## Other commands

### Backend

- `dotnet format` -> formatts Backend project.

### Frontend

- `npm run lint ` -> Runs ESLint and lists issues.
- `npm run lint:fix` -> Runs ESLint and fixes issues that can be fixed automatically.
- `npm run format` -> Runs Prettier and auto-formatts the Frontend project.

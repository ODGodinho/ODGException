<h1 align="center">
    <a href="https://github.com/ODGodinho">
        <img
            src="https://raw.githubusercontent.com/ODGodinho/Stanley-TheTemplate/main/public/images/Stanley.jpg"
            alt="Stanley Imagem" width="500"
        />
    </a>
    <br />
    ODG Exception By Dragons Gamers
    <br />
</h1>

<h4 align="center">Exception class with previews ๐จ!</h4>

<p align="center">

[![codecov](https://codecov.io/gh/ODGodinho/ODGException/branch/main/graph/badge.svg?token=JCLIEK2OFN)](https://codecov.io/gh/ODGodinho/ODGException)
[![Stargazers](https://img.shields.io/github/stars/ODGodinho/ODGException?color=F430A4)](https://github.com/ODGodinho/ODGException/stargazers)
[![Made by ODGodinho](https://img.shields.io/badge/made%20by-ODGodinho-%2304A361)](https://www.linkedin.com/in/victor-alves-odgodinho/)
[![Forks](https://img.shields.io/github/forks/ODGodinho/ODGException?color=CD4D34)](https://github.com/ODGodinho/ODGException/network/members)
![Repository size](https://img.shields.io/github/repo-size/ODGodinho/ODGException)
[![GitHub last commit](https://img.shields.io/github/last-commit/ODGodinho/ODGException)](https://github.com/ODGodinho/ODGException/commits/master)
[![License](https://img.shields.io/badge/license-MIT-brightgreen)](https://opensource.org/licenses/MIT)
[![StyleCI](https://github.styleci.io/repos/577124284/shield?branch=main)](https://github.styleci.io/repos/577124284?branch=main)

</p>

# Table of Contents

- [๐ Benefits](#-benefits)
- [๐ Libraries](#-libraries)
- [๐ Dependencies](#-dependencies)
- [โฉ Get Started](#-get-started)
  - [๐ Installation](#-installation)
  - [๐ป Prepare to develop](#-prepare-to-develop)
  - [๐ Start Project](#-start-project)
  - [๐จ Build and Run](#-build-and-run)
  - [๐งช Teste Code](#-teste-code)

---

## ๐ Benefits

- ๐ Instance Error with previews error
- ๐ Code quality guaranteed

## ๐ Libraries

- [Node.js 16](https://nodejs.org/?n=dragonsgamers)
- [Typescript](https://www.typescriptlang.org/?n=dragonsgamers)
- [Eslint](https://eslint.org/?n=dragonsgamers)
- [ODG-Linter-JS](https://github.com/ODGodinho/ODG-Linter-Js?n=dragonsgamers)
- [EditorConfig](https://editorconfig.org/?n=dragonsgamers)
- [ReviewDog](https://github.com/reviewdog/action-eslint)

## ๐ Dependencies

- [Node.js](https://nodejs.org) 16 or later
- [Yarn](https://yarnpkg.com/) Optional/Recommended
- [ODG TsConfig](https://github.com/ODGodinho/tsconfig) Last Version

## โฉ Get Started

---

### ๐ Installation

Run commands:

```powershell
yarn add @odg/exception
```

### ๐ป Prepare To Develop

Create custom exception

```typescript
import { Exception } from "@odg/exception";

class MyException extends Exception {

}
```

Instance Exception

```typescript
try {
    // code
} catch (error) {
    throw new MyException("message", error, "EXCEPTION_CODE");
}
```

Props

```typescript
interface Exception {
    message: string; // Message of exception
    code?: string | number; // Code of exception
    stack: string; // Stack of Exception
    preview?: UnknownException; // Preview exception parsed to UnknownException class
    original?: unknown // Original Preview Exception (Error, Exception, string, unknown)
}
```

### ๐ Start Project

First install dependencies with the following command

```bash
yarn install
# or
npm install
```

## ๐จ Build and Run

To build the project, you can use the following command

> if you change files, you need to run `yarn build` and `yarn test` again

```bash
yarn build && yarn test
```

## ๐งช Teste Code

To Test execute this command

```bash
yarn test
# or
yarn test:watch
```

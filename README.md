# Budget Babe - Fullstack React Native App

Welcome to Budget Babe, a budgeting app designed to help users manage their finances efficiently. This app is currently in its BETA phase and is built using MongoDB, GraphQL, Apollo Client, React Native, Native Base, React and React Bootstrap.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Budget Babe is a mobile application that empowers users to track their income, expenses, and savings goals. With a user-friendly interface and robust functionality, it simplifies financial management.

## Features

- User registration and authentication
- Dashboard displaying financial summaries
- Income and expense tracking
- Budget creation and management
- Savings goals tracking
- SendGrid password reset web interface using React
- MongoDB database for data storage
- GraphQL for database queries and mutations
- Apollo Client for managing both local and remote data with GraphQL
- React Native for the mobile app
- Native Base for universal UI design systems
- React Bootstrap for web interface design

## Getting Started

To get started with Budget Babe, follow these steps:

1. Clone this repository to your local machine.
2. Install the required dependencies as mentioned in the [Installation](#installation) section.
3. Configure your MongoDB database connection.
4. Start the server and the React Native app.
5. Explore and enjoy using Budget Babe!

## Installation

### Server

1. Navigate to the `server` directory: `cd server`

2. Install server dependencies: `npm install`

3. Create a `.env` file in the `server` directory with the following content, replacing `<your-mongodb-uri>` with your MongoDB connection URI: `1. SendGrid API key 2. JWT secret 3. JWT expiration`

4. Start the server: `npm start` or `npm run watch`

### React Native App

1. Navigate to the `client` directory: `cd client` `cd BudgeBabe`

2. Install app dependencies: `npm install`

3. Start the React Native app on your emulator or device: `npx expo start` or `npx expo start --tunnel`

### React Web Reset Interface

1. Navigate to the `web` directory: `cd web`

2. Install app dependencies: `npm install`

3. Start the React Web App: `npm start`

### Using ngrok For Local Development (Optional)

1. In the root level, install app dependecy: `npm install ngrok -g`

2. Open a new terminal and start ngrok: `ngrok http <your_local_host_port>` (Please note this will have to be updated every 2 hours)

3. Paste your new URL into `client/BudgetBabe/apollo/client.js` and `web/apollo/apollo.js` in the HTTP URI Link and `server/server.js` in the cors origins.

## Usage

1. Register or log in to your Budget Babe account.
2. Add your income sources and expenses to start tracking your finances.
3. Create budgets and set savings goals.
4. Enjoy managing your finances with Budget Babe!

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork this repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`
3. Commit your changes and push to your forked repository.
4. Submit a pull request to the main repository.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)



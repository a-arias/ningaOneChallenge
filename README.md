# NinjaOneChallenge

## Project Overview

This repository contains automated tests written on TestCafe. The tests cover both API validations and UI validations for ninjaOne proyect.

## Prerequisites
### Operating system
- Node.js (v14.x or higher)
- TestCafe (v1.15.x or higher)
- npm or yarn package manager

### Frontend application
- Install the frontend application:
https://github.com/Yastrenky/devices-clientapp

### Backend application
- Install backend of the application:
https://github.com/NinjaRMM/devicesTask_serverApp

## API Information
- Base URL: 
http://localhost:3001

- Endpoints:

- `GET /devices`

- `GET /devices/:id`

- `POST /devices`

- `DELETE /devices/:id`


## Installation
Ensure you have the required dependencies installed by running:

`npm install`

or

`yarn install`

## Test Structure

The project is organized as follows:

`/tests`: Contains the TestCafe test files.

`/reports`: (Optional) Directory for storing test reports and screenshots.

`/config`: Configuration files.


## Running Tests
To run all tests in the project, use the following command:
`npm run test`

or headless mode

`npm run testHeadless`


## Running Specific Test Files
`npx testcafe chrome tests/<test-file-name>.js`



## Debugging Tests
To debug your tests, use the `--debug-on-fail` flag to pause the execution when a test fails



## Environment-Specific Configurations
To configure different environment configuration, create a .env file in the root directory with the following URLS as example:
```bash
BASE_URL=http://localhost:3001
API_URL=http://localhost:3000/devices
```


## Test Reports
Test reports can be generated in various formats (e.g., spec, json, xunit). By default, the tests will run with the spec reporter. To generate a different report, you can specify the reporter type:

`npx testcafe chrome tests/ --reporter <reporter-type>`

Example:

`npx testcafe chrome tests/ --reporter xunit > reports/test-results.spec`


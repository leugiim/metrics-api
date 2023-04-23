# Metrics-API

---

## Project Overview

**Metrics-API** is an application for business metrics tracking and analysis. The application has an API that allows to retrieve and manipulate data from companies and metrics. Data is stored in a Firestore database. The application is built with Node.js and Express, using TypeScript, and is documented with Swagger. The frontend part is developed with Sveltekit.

## Installation

To install the project dependencies, run the following command:

```bash
npm install
```

## Project Configuration

In this case, because this is a project for an interview, I will remove from **.gitignore** the file **.env** but the right way is create it in local project.

It is necessary to create a file called **.env** that contains the necessary configuration for the correct operation of the project. Below are the environment variables used:

- **URL**
- **PORT**
- **SWAGGER_PORT**
- **JWT_SECRET**
- **FIREBASE_API_KEY**
- **FIREBASE_AUTH_DOMAIN**
- **FIREBASE_PROJECT_ID**
- **FIREBASE_STORAGE_BUCKET**
- **FIREBASE_MESSAGING_SENDER_ID**
- **FIREBASE_APP_ID**
- **FIREBASE_MEASUREMENT_ID**

## Running the Project in Development Mode

Once the dependencies are installed, you can run the project in development mode with the following command:

```bash
npm run dev
```

When you run this command, the development server will start on the port specified in the **.env** file or on port 3000 by default.

## Documentation

The documentation for the API can be found at [/docs](http://localhost:3000/docs) where you can find a Swagger file that describes all the available routes and operations in the API. You can access the documentation in interactive format from your browser by going to the following URL:

[http://localhost:3000/docs](http://localhost:3000/docs)

Replace <port> with the port number on which the development server is running.

## Future Improvements

- **Encrypting passwords:** Currently, passwords are not encrypted as this was a project for an interview and I wanted to be able to easily modify passwords for testing purposes without having to constantly hash them.
- **Adding metric type:** Adding metric type (errors, warnings, info, etc.) would allow for different colors to be displayed on the front-end and allow filtering by type.
- **Caching company data results:** Currently, all metrics are obtained at once, so it would be beneficial to implement a cron job or similar mechanism to pre-calculate graphs that are displayed on the front-end.
- **Implementing real-time data updates.**
- **Adding change password functionality.**
- **Adding password recovery functionality:** Sending an email to the client to verify their identity.
- **Improving test coverage:** Due to time constraints and the need to mock data, not all of the application has been covered by tests.
- **Adding end-to-end tests.**
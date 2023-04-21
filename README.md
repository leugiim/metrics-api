# metrics-api

---

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

When you run this command, the development server will start on the port specified in the configuration file in the **.env** file or on port 3000 by default.

## Documentation

The documentation for the API can be found at [/docs](http://localhost:3000/docs) where you can find a Swagger file that describes all the available routes and operations in the API. You can access the documentation in interactive format from your browser by going to the following URL:

[http://localhost:3000/docs](http://localhost:3000/docs)

Replace <port> with the port number on which the development server is running.

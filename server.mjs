import "rootpath";
import "dotenv/config";
import express from "express";
import cors from "cors";
import errorHandlers from "./_middleware/error-handler.js";
import treesRouter from "./trees/trees.controller.js";
import logsRouter from "./logs/logs.controller.js";
import { errorHandler } from "supertokens-node/framework/express/index.js";
import { middleware } from "supertokens-node/framework/express/index.js";
import supertokens from "supertokens-node/index.js";
import Session from "supertokens-node/recipe/session/index.js";
import EmailPassword from "supertokens-node/recipe/emailpassword/index.js";

const app = express();
const uri = process.env.CONNECTION_URI;
const api = process.env.API_KEY;

supertokens.init({
  framework: "express",
  supertokens: {
    // These are the connection details of the app you created on supertokens.com
    connectionURI: uri,
    apiKey: api,
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/session/appinfo
    appName: "Cbr Backend",
    apiDomain: "https://cbr-node.herokuapp.com",
    websiteDomain: "https://demo.kebuncibangbara.xyz",
    apiBasePath: "/",
    websiteBasePath: "/",
  },
  recipeList: [
    EmailPassword.init(), // initializes signin / sign up features
    Session.init(),
  ],
});

const allowedDomain = [
  "http://localhost:3000",
  "https://demo.kebuncibangbara.xyz",
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: allowedDomain,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);

// api routes
app.use(middleware());
app.use("/trees", treesRouter);
app.use("/logs", logsRouter);

// global error handlers
app.use(errorHandler());
app.use(errorHandlers);

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
app.listen(port, () => console.log("Server listening on port " + port));

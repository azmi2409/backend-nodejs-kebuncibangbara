import "rootpath";
import "dotenv/config";
import express from "express";
import cors from "cors";
import errorHandlers from "./_middleware/error-handler";
import treesRouter from "./trees/trees.controller";
import logsRouter from "./logs/logs.controller";
import { errorHandler } from "supertokens-node/framework/express";
import { middleware } from "supertokens-node/framework/express";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import { verifySession } from "supertokens-node/recipe/session/framework/express";

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
    apiDomain: "http://localhost:4000",
    websiteDomain: "http://localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/",
  },
  recipeList: [
    EmailPassword.init(), // initializes signin / sign up features
    Session.init(),
  ],
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(/*{
  origin: "https://demo.kebuncibangbara.xyz",
  allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
  credentials: true,
}*/));

// api routes
app.use(middleware());
app.get("/getJWT", verifySession(), async (req, res) => {
  let session = req.session;

  let jwt = session.getAccessTokenPayload()["jwt"];

  res.json({ token: jwt });
});
app.use("/trees", treesRouter);
app.use("/logs", logsRouter);

// global error handler
app.use(errorHandler());
app.use(errorHandlers);

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
app.listen(port, () => console.log("Server listening on port " + port));

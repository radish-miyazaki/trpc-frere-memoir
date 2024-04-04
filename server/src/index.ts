import express from "express";
import cors from "cors";
import { env } from "./utils/env";
import { trpcMiddleware } from "./router";

const app = express();

app.use(cors({ origin: [env.WEBAPP_ORIGIN] }));
app.use("/trpc", trpcMiddleware);

const port = env.PORT;
app.listen(port, () => console.log(`Server is listening at port ${port}`));

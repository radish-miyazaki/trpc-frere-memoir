import { envsafe, port, str, url } from "envsafe";

export const env = envsafe({
  NODE_ENV: str({
    devDefault: "development",
    choices: ["development", "test", "production"],
  }),
  PORT: port({
    default: 3000,
  }),
  WEBAPP_ORIGIN: url({
    devDefault: "http://localhost:5173",
  }),
});

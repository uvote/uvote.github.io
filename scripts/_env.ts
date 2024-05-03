import { existsSync } from "node:fs";
import { EOL } from "node:os";

import read from "read-file-utf8";
import write from "write-file-utf8";

const environmentVariableNames = [
  "LOCAL_NICKNAME_REGISTRY_ADDRESS",
  "LOCAL_POLL_FACTORY_BASIC_ADDRESS",
  "LOCAL_PRIVATE_KEY",
] as const;
export type EnvironmentVariableName = (typeof environmentVariableNames)[number];

/** Insert or update environment variable into .env file. */
export const putEnv = async (key: EnvironmentVariableName, value: string) => {
  const dotEnvFilepath = ".env";

  // Read .env file, if any. Fallback to .example.env file.
  const envExists = existsSync(dotEnvFilepath);
  const envContent = await read(envExists ? dotEnvFilepath : ".example.env");
  const previousRows = envContent.split(EOL);

  const updatedRows = [];

  let foundRow = false;
  const newRow = `${key}=${value}`;

  for (const row of previousRows) {
    // Substitute environment variable related row.
    if (row.startsWith(key)) {
      updatedRows.push(newRow);
      foundRow = true;
    } else {
      // otherwise copy row as is.
      updatedRows.push(row);
    }
  }

  // If no environment variable related row was found, create a new one.
  if (!foundRow) updatedRows.push(newRow);

  // Write .env file.
  write(dotEnvFilepath, updatedRows.join(EOL));
};

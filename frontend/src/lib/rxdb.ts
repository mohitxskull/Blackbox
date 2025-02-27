import { createRxDatabase } from "rxdb";
import { getRxStorageMemory } from "rxdb/plugins/storage-memory";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";

import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { addRxPlugin } from "rxdb/plugins/core";
import { env } from "@/configs/env";

if (env.NEXT_PUBLIC_NODE_ENV === "development") {
  addRxPlugin(RxDBDevModePlugin);
}

export const encryptedDb = await createRxDatabase({
  name: "encrypted-blackbox",
  storage: getRxStorageDexie(),
});

export const unencryptedDb = await createRxDatabase({
  name: "unencrypted-blackbox",
  storage: getRxStorageMemory(),
});

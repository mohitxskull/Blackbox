import { V1VaultObjectShowRoute } from "@blackbox/backend/blueprint";
import { Dispatch, SetStateAction } from "react";

export type EncryptedSecureObject =
  V1VaultObjectShowRoute["output"]["secureObject"];

export type SetReactState<T> = Dispatch<SetStateAction<T>>;

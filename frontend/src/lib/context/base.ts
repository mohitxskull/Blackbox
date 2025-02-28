import { SetReactState } from "@/types";
import { BlackboxPages } from "@/types/context";
import {
  V1AuthSessionRoute,
  V1VaultShowRoute,
} from "@blackbox/backend/blueprint";
import { createSafeContext } from "@mantine/core";

export type BlackboxContextProps = {
  children: React.ReactNode;
  session: V1AuthSessionRoute["output"]["session"];
  vault: V1VaultShowRoute["output"]["vault"];
};

export type BlackboxProviderValues = {
  activePage: BlackboxPages;
  setActivePage: SetReactState<BlackboxPages>;
  vaultKey: string | null;
  setVaultKey: SetReactState<string | null>;
  masterKey: string | null;
  setMasterKey: SetReactState<string | null>;
  session: V1AuthSessionRoute["output"]["session"];
  vault: V1VaultShowRoute["output"]["vault"];
};

export const [BlackboxProvider, useBlackboxContext] =
  createSafeContext<BlackboxProviderValues>(
    'The component was not found in the tree under the "BlackboxProvider"',
  );

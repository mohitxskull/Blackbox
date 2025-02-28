import { SetReactState } from "@/types";
import { BlackboxPages } from "@/types/context";
import {
  V1AuthSessionRoute,
  V1VaultShowRoute,
} from "@blackbox/backend/blueprint";
import { createSafeContext } from "@mantine/core";
import { UseQueryResult } from "@tanstack/react-query";

export type BlackboxContextProps = {
  children: React.ReactNode;
};

export type BlackboxProviderValues = {
  activePage: BlackboxPages;
  setActivePage: SetReactState<BlackboxPages>;
  vaultKey: string | null;
  setVaultKey: SetReactState<string | null>;
  masterKey: string | null;
  setMasterKey: SetReactState<string | null>;
  sessionQ: UseQueryResult<V1AuthSessionRoute["output"]>;
  vaultQ: UseQueryResult<V1VaultShowRoute["output"]>;
};

export const [BlackboxProvider, useBlackboxContext] =
  createSafeContext<BlackboxProviderValues>(
    'The component was not found in the tree under the "BlackboxProvider"',
  );

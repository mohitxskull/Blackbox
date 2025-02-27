import { SetReactState } from "@/types";
import { BlackboxPages } from "@/types/context";
import { createSafeContext } from "@mantine/core";

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
};

export const [BlackboxProvider, useBlackboxContext] =
  createSafeContext<BlackboxProviderValues>(
    'The component was not found in the tree under the "BlackboxProvider"',
  );

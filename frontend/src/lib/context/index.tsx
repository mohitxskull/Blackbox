import { useState } from "react";
import { BlackboxContextProps, BlackboxProvider } from "./base";
import { BlackboxPages } from "@/types/context";
import { cobalt } from "@/configs/cobalt";
import { useSession } from "../hooks/use_session";

const getVaultVersion = (): number | null => {
  if (!window) {
    throw new Error("Window is not available");
  }

  const rawVersion = window.localStorage.getItem("vaultVersion");

  if (!rawVersion) {
    return null;
  }

  return parseInt(rawVersion, 10);
};

const setVaultVersion = (version: number) => {
  if (!window) {
    throw new Error("Window is not available");
  }

  window.localStorage.setItem("vaultVersion", version.toString());
};

export const BlackboxContext = (props: BlackboxContextProps) => {
  const sessionQ = useSession();

  const vaultQ = cobalt.useQuery({
    endpoint: "V1_VAULT_SHOW",
    input: {},
  });

  const [activePage, setActivePage] = useState<BlackboxPages>("home");

  const [masterKey, setMasterKey] = useState<string | null>(null);

  const [vaultKey, setVaultKey] = useState<string | null>(null);

  return (
    <>
      <BlackboxProvider
        value={{
          activePage,
          setActivePage,
          masterKey,
          setMasterKey,
          vaultKey,
          setVaultKey,
          sessionQ,
          vaultQ,
        }}
      >
        {props.children}
      </BlackboxProvider>
    </>
  );
};

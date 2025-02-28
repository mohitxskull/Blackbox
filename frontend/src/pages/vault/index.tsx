import { VaultLayout } from "@/components/layout/vault";
import { LocalQueryLoader } from "@/components/query_loader";
import { cobalt } from "@/configs/cobalt";
import { cobaltServer } from "@/configs/cobalt_server";
import { BlackboxContext } from "@/lib/context";
import { useSession } from "@/lib/hooks/use_session";
import { Center, Loader } from "@mantine/core";

export const getServerSideProps = cobaltServer.secure();

export default function Page() {
  const sessionQ = useSession();

  const vaultQ = cobalt.useQuery({
    endpoint: "V1_VAULT_SHOW",
    input: {},
  });

  return (
    <>
      <>
        <LocalQueryLoader
          query={sessionQ}
          isLoading={
            <>
              <Center h="100vh">
                <Loader />
              </Center>
            </>
          }
        >
          {({ session }) => (
            <>
              <LocalQueryLoader
                query={vaultQ}
                isLoading={
                  <>
                    <Center h="100vh">
                      <Loader />
                    </Center>
                  </>
                }
              >
                {({ vault }) => (
                  <>
                    <BlackboxContext vault={vault} session={session}>
                      <>
                        <VaultLayout />
                      </>
                    </BlackboxContext>
                  </>
                )}
              </LocalQueryLoader>
            </>
          )}
        </LocalQueryLoader>
      </>
    </>
  );
}

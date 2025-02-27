import { AppLayout } from "@/components/layout/app";
import { LocalQueryLoader } from "@/components/query_loader";
import { VaultHomePage } from "@/components/ui/home";
import { VaultSettingPage } from "@/components/ui/setting";
import { cobaltServer } from "@/configs/cobalt_server";
import { useSession } from "@/lib/hooks/use_session";
import { activePageAtom } from "@/lib/jotai";
import { Show } from "@folie/cobalt/components";
import { Center, Text } from "@mantine/core";
import { useAtomValue } from "jotai";

export const getServerSideProps = cobaltServer.secure();

export default function Page() {
  const activePage = useAtomValue(activePageAtom);

  const session = useSession();

  return (
    <>
      <AppLayout fullPage>
        <>
          <LocalQueryLoader query={session}>
            {({ session }) => (
              <>
                <Show>
                  <Show.When isTrue={activePage === "home"}>
                    <VaultHomePage />
                  </Show.When>

                  <Show.When isTrue={activePage === "setting"}>
                    <VaultSettingPage session={session} />
                  </Show.When>

                  <Show.Else>
                    <Center h="100%">
                      <Text fs="italic" fw="bold">
                        “How on earth did you get here?”
                      </Text>
                    </Center>
                  </Show.Else>
                </Show>
              </>
            )}
          </LocalQueryLoader>
        </>
      </AppLayout>
    </>
  );
}

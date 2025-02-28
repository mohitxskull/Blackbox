import { AppLayout } from "@/components/layout/app";
import { LocalQueryLoader } from "@/components/query_loader";
import { VaultHomePage } from "@/components/ui/home";
import { VaultSettingPage } from "@/components/ui/setting";
import { cobaltServer } from "@/configs/cobalt_server";
import { useBlackboxContext } from "@/lib/context/base";
import { Show } from "@folie/cobalt/components";
import { Center, Loader, Text } from "@mantine/core";

export const getServerSideProps = cobaltServer.secure();

export default function Page() {
  const { activePage, sessionQ } = useBlackboxContext();

  return (
    <>
      <AppLayout fullPage>
        <>
          <LocalQueryLoader
            query={sessionQ}
            isLoading={
              <>
                <Center h="100%">
                  <Loader />
                </Center>
              </>
            }
          >
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

import { useBlackboxContext } from "@/lib/context/base";
import { Show } from "@folie/cobalt/components";
import { VaultHomePage } from "../ui/home";
import { AppShell, Button, Center, Group, Text } from "@mantine/core";
import { VaultSettingPage } from "../ui/setting";
import { setting } from "@/configs/setting";
import { Logo } from "../logo";
import { useSignOut } from "@/lib/hooks/use_sign_out";
import { askConfirmation } from "@/lib/helpers/confirmation_modal";

export const VaultLayout = () => {
  const [signOutM, signOut] = useSignOut();

  const { activePage, setActivePage } = useBlackboxContext();

  return (
    <>
      <AppShell
        header={{ height: setting.header.height }}
        padding="md"
        layout="alt"
      >
        <AppShell.Header withBorder={false} bg="transparent">
          <Group justify="space-between" px="md" h="100%">
            <Logo onClick={() => setActivePage("home")} />

            <Group gap="xs">
              <Button
                size="sm"
                fw="500"
                variant="transparent"
                px="xs"
                disabled={signOutM.isPending}
                onClick={() => setActivePage("setting")}
              >
                Setting
              </Button>

              <Button
                fw="500"
                variant="transparent"
                disabled={signOutM.isPending}
                c="red"
                px="xs"
                onClick={() => {
                  askConfirmation({
                    message: "Are you sure you want to logout?",
                    confirmLabel: "Logout",
                    onConfirm: () => signOut({}),
                  });
                }}
              >
                Logout
              </Button>
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Main h="100vh" bg={setting.bg}>
          <Show>
            <Show.When isTrue={activePage === "home"}>
              <VaultHomePage />
            </Show.When>

            <Show.When isTrue={activePage === "setting"}>
              <VaultSettingPage />
            </Show.When>

            <Show.Else>
              <Center h="100%">
                <Text fs="italic" fw="bold">
                  “How on earth did you get here?”
                </Text>
              </Center>
            </Show.Else>
          </Show>
        </AppShell.Main>
      </AppShell>
    </>
  );
};

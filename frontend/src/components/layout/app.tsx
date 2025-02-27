import { AppShell, Button, Group, MantineSpacing } from "@mantine/core";
import { setting } from "@/configs/setting";
import { Logo } from "../logo";
import { useSignOut } from "@/lib/hooks/use_sign_out";
import { askConfirmation } from "@/lib/helpers/confirmation_modal";
import { useSetAtom } from "jotai";
import { activePageAtom } from "@/lib/jotai";

type Props = {
  children: React.ReactNode;
  fullPage?: boolean;
  padding?: MantineSpacing;
};

export const AppLayout = (props: Props) => {
  const [mutation, signout] = useSignOut();

  const setActivePage = useSetAtom(activePageAtom);

  return (
    <>
      <AppShell
        header={{ height: setting.header.height }}
        padding={props.padding ?? "md"}
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
                disabled={mutation.isPending}
                onClick={() => setActivePage("setting")}
              >
                Setting
              </Button>

              <Button
                fw="500"
                variant="transparent"
                disabled={mutation.isPending}
                c="red"
                px="xs"
                onClick={() => {
                  askConfirmation({
                    message: "Are you sure you want to logout?",
                    confirmLabel: "Logout",
                    onConfirm: () => signout({}),
                  });
                }}
              >
                Logout
              </Button>
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Main h={props.fullPage ? `100vh` : "100%"} bg={setting.bg}>
          {props.children}
        </AppShell.Main>
      </AppShell>
    </>
  );
};

import {
  Avatar,
  Container,
  Group,
  Space,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import BoringAvatar from "boring-avatars";
import { SettingGeneralUpdateForm } from "./update_form";
import { SettingPasswordUpdateForm } from "./password_update_form";
import { SettingVaultUpdateForm } from "./vault_update_form";
import { useBlackboxContext } from "@/lib/context/base";

export const VaultSettingPage = () => {
  const { vault, session } = useBlackboxContext();

  return (
    <>
      <Container mt="xl">
        <Stack>
          <Group>
            <Avatar size="xl" radius="md">
              <BoringAvatar
                name={session.id}
                square
                variant="beam"
                colors={["#141414", "#c9c9c9"]}
              />
            </Avatar>

            <Stack gap={0}>
              <Title order={3}>
                {session.firstName} {session.lastName}
              </Title>

              <Text c="dimmed">{session.email}</Text>
            </Stack>
          </Group>

          <Space h="md" />

          <Tabs defaultValue="general">
            <Tabs.List>
              <Tabs.Tab value="general">General</Tabs.Tab>
              <Tabs.Tab value="security">Security</Tabs.Tab>
              <Tabs.Tab value="vault">Vault</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="general" pt="xl">
              <SettingGeneralUpdateForm />
            </Tabs.Panel>

            <Tabs.Panel value="security" pt="xl">
              <SettingPasswordUpdateForm />
            </Tabs.Panel>

            <Tabs.Panel value="vault" pt="xl">
              <SettingVaultUpdateForm vault={vault} />
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Container>
    </>
  );
};

import { V1AuthSessionRoute } from "@blackbox/backend/blueprint";
import {
  Avatar,
  Container,
  Divider,
  Group,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import BoringAvatar from "boring-avatars";
import { SettingGeneralUpdateForm } from "./update_form";
import { SettingPasswordUpdateForm } from "./password_update_form";

type Props = {
  session: V1AuthSessionRoute["output"]["session"];
};

export const VaultSettingPage = (props: Props) => {
  return (
    <>
      <Container mt="xl">
        <Stack>
          <Group>
            <Avatar size="xl" radius="md">
              <BoringAvatar
                name={props.session.id}
                square
                variant="beam"
                colors={["#141414", "#c9c9c9"]}
              />
            </Avatar>

            <Stack gap={0}>
              <Title order={3}>
                {props.session.firstName} {props.session.lastName}
              </Title>

              <Text c="dimmed">{props.session.email}</Text>
            </Stack>
          </Group>

          <Space h="md" />

          <SettingGeneralUpdateForm session={props.session} />

          <Divider />

          <SettingPasswordUpdateForm />
        </Stack>
      </Container>
    </>
  );
};

import { HorizontalInput } from "@/components/horizontal_input";
import { cobalt } from "@/configs/cobalt";
import { V1AuthSessionRoute } from "@blackbox/backend/blueprint";
import { Form, RightGroup } from "@folie/cobalt/components";
import { Button, Group, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";

type Props = {
  session: V1AuthSessionRoute["output"]["session"];
};

export const SettingGeneralUpdateForm = (props: Props) => {
  const [form, iProps, iKey, [mutation, submit]] = cobalt.useForm({
    endpoint: "V1_AUTH_PROFILE_UPDATE",
    form: {
      values: {
        firstName: props.session.firstName,
        lastName: props.session.lastName,
      },
    },
    onSuccess: (updatedData) => {
      notifications.show({
        message: updatedData.message,
      });

      return {
        input: {
          ...updatedData.user,
        },
        queryKeys: (qk) => [qk("V1_AUTH_SESSION", undefined)],
      };
    },
  });

  return (
    <>
      <Form mutation={mutation} submit={submit} form={form}>
        {({ dirty, loading }) => (
          <>
            <HorizontalInput
              label="Name"
              description="This name will be visible to users with whom you will share your passwords, notes etc."
            >
              <Group grow>
                <TextInput
                  placeholder="John"
                  {...iProps(["firstName"])}
                  key={iKey(["firstName"])}
                />

                <TextInput
                  placeholder="Doe"
                  {...iProps(["lastName"])}
                  key={iKey(["lastName"])}
                />
              </Group>
            </HorizontalInput>

            <HorizontalInput
              label="Email"
              description="This is your primary email address."
            >
              <TextInput
                placeholder="someone@gmail.com"
                readOnly
                value={props.session.email}
              />
            </HorizontalInput>

            <RightGroup>
              <Button type="submit" loading={loading} disabled={!dirty}>
                Update
              </Button>
            </RightGroup>
          </>
        )}
      </Form>
    </>
  );
};

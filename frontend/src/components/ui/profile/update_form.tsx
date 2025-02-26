import { cobalt } from "@/configs/cobalt";
import { V1AuthSessionRoute } from "@blackbox/backend/blueprint";
import { Form, RightGroup } from "@folie/cobalt/components";
import { Button, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";

type Props = {
  session: V1AuthSessionRoute["output"]["session"];
};

export const ProfileUpdateForm = (props: Props) => {
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
            <TextInput
              label="First Name"
              placeholder="John"
              {...iProps(["firstName"])}
              key={iKey(["firstName"])}
            />

            <TextInput
              label="Last Name"
              placeholder="Doe"
              {...iProps(["lastName"])}
              key={iKey(["lastName"])}
            />

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

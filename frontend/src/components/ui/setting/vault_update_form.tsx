import { HorizontalInput } from "@/components/horizontal_input";
import { cobalt } from "@/configs/cobalt";
import { V1AuthSessionRoute } from "@blackbox/backend/blueprint";
import { Form, RightGroup } from "@folie/cobalt/components";
import { Button, NumberInput, Stack, Switch } from "@mantine/core";
import { notifications } from "@mantine/notifications";

type Props = {
  session: V1AuthSessionRoute["output"]["session"];
};

export const SettingVaultUpdateForm = (props: Props) => {
  const [form, iProps, iKey, [mutation, submit]] = cobalt.useForm({
    endpoint: "V1_AUTH_PROFILE_UPDATE",
    form: {
      values: {
        setting: {
          timeout: props.session.setting.timeout,
        },
      },
    },
    onSuccess: (updatedData) => {
      notifications.show({
        message: "Vault settings updated successfully",
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
              label="Timeout"
              description="This setting ensures that your encryption key will be automatically cleared from your device's memory after a specified period of inactivity to enhance your security."
              rightAlign
              gutter="xs"
              expand={{
                active: form.getValues().setting?.timeout !== null,
                children: (
                  <>
                    <Stack>
                      <NumberInput
                        min={10}
                        max={3600}
                        placeholder="10 - 3600 Seconds"
                        suffix=" Seconds"
                        {...iProps(["setting", "timeout"])}
                        key={iKey(["setting", "timeout"])}
                      />
                    </Stack>
                  </>
                ),
              }}
            >
              <Switch
                color="teal.8"
                checked={form.getValues().setting?.timeout !== null}
                disabled={loading}
                onChange={(e) => {
                  form.setValues({
                    setting: {
                      timeout: e.target.checked
                        ? (props.session.setting.timeout ?? 300)
                        : null,
                    },
                  });
                }}
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

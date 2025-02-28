import { HorizontalInput } from "@/components/horizontal_input";
import { cobalt } from "@/configs/cobalt";
import { V1VaultShowRoute } from "@blackbox/backend/blueprint";
import { Form, RightGroup } from "@folie/cobalt/components";
import { Button, NumberInput, Stack, Switch } from "@mantine/core";
import { notifications } from "@mantine/notifications";

type Props = {
  vault: V1VaultShowRoute["output"]["vault"];
};

export const SettingVaultUpdateForm = (props: Props) => {
  const [form, iProps, iKey, [mutation, submit]] = cobalt.useForm({
    endpoint: "V1_VAULT_UPDATE",
    form: {
      values: {
        timeout: props.vault.timeout,
      },
    },
    onSuccess: (updatedData) => {
      notifications.show({
        message: updatedData.message,
      });

      return {
        input: {
          ...updatedData.vault,
        },
        queryKeys: (qk) => [qk("V1_VAULT_SHOW", undefined)],
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
                active: form.getValues()?.timeout !== null,
                children: (
                  <>
                    <Stack>
                      <NumberInput
                        min={10}
                        max={3600}
                        placeholder="10 - 3600 Seconds"
                        suffix=" Seconds"
                        {...iProps(["timeout"])}
                        key={iKey(["timeout"])}
                      />
                    </Stack>
                  </>
                ),
              }}
            >
              <Switch
                color="teal.8"
                checked={form.getValues()?.timeout !== null}
                disabled={loading}
                onChange={(e) => {
                  form.setValues({
                    timeout: e.target.checked
                      ? (props.vault.timeout ?? 300)
                      : null,
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

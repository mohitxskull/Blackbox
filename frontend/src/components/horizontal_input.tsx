import {
  Collapse,
  Divider,
  Grid,
  InputDescription,
  InputLabel,
  MantineSpacing,
  Stack,
} from "@mantine/core";

type Props<T> = {
  label: string;
  description: string;
  children: React.ReactNode;
  expand?: {
    active: boolean;
    children: React.ReactNode;
  };
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  rightAlign?: boolean;
  gutter?: MantineSpacing;
};

export const HorizontalInput = <T,>(props: Props<T>) => {
  return (
    <Stack>
      <Grid columns={12} gutter={{ base: "xs", md: props.gutter ?? 100 }}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack gap={0}>
            <InputLabel>{props.label}</InputLabel>
            <InputDescription>{props.description}</InputDescription>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: "auto" }}>
          <Stack
            h="100%"
            justify="center"
            align={props.rightAlign ? "end" : undefined}
            w="100%"
          >
            {props.children}
          </Stack>
        </Grid.Col>
      </Grid>

      {props.expand && (
        <Collapse in={props.expand?.active === true}>
          {props.expand?.children}
        </Collapse>
      )}

      <Divider />
    </Stack>
  );
};

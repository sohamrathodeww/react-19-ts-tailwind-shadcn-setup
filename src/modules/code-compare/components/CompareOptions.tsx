import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import { Checkbox } from "../../../components/ui/checkbox";

import type {
  CompareOptions as CompareOptionType,
} from "../types/compare.types";

interface Props {
  options: CompareOptionType;
  onChange: (
    options: CompareOptionType
  ) => void;
}

export default function CompareOptions({
  options,
  onChange,
}: Props) {
  const updateOption = (
    key: keyof CompareOptionType,
    value: boolean
  ) => {
    onChange({
      ...options,
      [key]: value,
    });
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>
          Comparison Options
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">

          <OptionItem
            label="Ignore Leading / Trailing Spaces"
            checked={
              options.ignoreLeadingTrailingWhitespace
            }
            onChange={(checked) =>
              updateOption(
                "ignoreLeadingTrailingWhitespace",
                checked
              )
            }
          />

          <OptionItem
            label="Ignore Empty Lines"
            checked={
              options.ignoreEmptyLines
            }
            onChange={(checked) =>
              updateOption(
                "ignoreEmptyLines",
                checked
              )
            }
          />

          <OptionItem
            label="Ignore Tabs"
            checked={
              options.ignoreTabs
            }
            onChange={(checked) =>
              updateOption(
                "ignoreTabs",
                checked
              )
            }
          />

          <OptionItem
            label="Ignore Case"
            checked={
              options.ignoreCase
            }
            onChange={(checked) =>
              updateOption(
                "ignoreCase",
                checked
              )
            }
          />

        </div>
      </CardContent>
    </Card>
  );
}

interface OptionItemProps {
  label: string;
  checked: boolean;
  onChange: (
    checked: boolean
  ) => void;
}

function OptionItem({
  label,
  checked,
  onChange,
}: OptionItemProps) {
  return (
    <label
      className="
        flex
        cursor-pointer
        items-center
        gap-3
        rounded-lg
        border
        p-4
        transition-colors
        hover:bg-muted/50
      "
    >
      <Checkbox
        checked={checked}
        onCheckedChange={(value) =>
          onChange(!!value)
        }
      />

      <span className="text-sm font-medium">
        {label}
      </span>
    </label>
  );
}
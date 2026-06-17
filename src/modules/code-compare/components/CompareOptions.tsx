

import { Checkbox } from "../../../components/ui/checkbox";
import type { CompareOptions as CompareOptionType } from "../types/compare.types";

interface Props {
    options: CompareOptionType;
    onChange:(options: CompareOptionType) => void; 
}

export default function CompareOptions({ 
    options, 
    onChange
}: Props) {
    const updateOption = (
        key: keyof CompareOptionType,
        value: boolean
    ) => {
        onChange({
            ...options,
            [key]: value
        });
    }

    return (
        <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-semibold"> Compare Options</h3>

            <div className="grid gap-3 md:grid-cols-2">
                <label className="flex items-center gap-2">
                    <Checkbox checked= {
                            options.ignoreLeadingTrailingWhitespace
                        }
                        onCheckedChange={(checked) => 
                            updateOption(
                                `ignoreLeadingTrailingWhitespace`,
                                !!checked
                            )
                        }
                    />
                    Ignore Leading / Trailing Spaces
                </label>

                <label className="flex items-center gap-2">
                    <Checkbox checked= {
                            options.ignoreEmptyLines
                        }
                        onCheckedChange = { (checked) => 
                            updateOption(
                                "ignoreEmptyLines",
                                !!checked
                            )
                        }
                    />
                    Ignore Empty Lines
                </label>

                <label className="flex items-center gap-2">
                    <Checkbox checked= {
                            options.ignoreTabs
                        }
                        onCheckedChange = { (checked) => 
                            updateOption(
                                "ignoreTabs",
                                !!checked
                            )
                        } 
                    />
                    Ignore Tabs
                </label>

                <label className="flex items-center gap-2">
                    <Checkbox checked= {
                            options.ignoreCase
                        }
                        onCheckedChange ={ (checked) => 
                            updateOption(
                                'ignoreCase',
                                !!checked
                            )
                        }
                    />
                    Ignore Case
                </label>
            </div>
        </div>
    )
}
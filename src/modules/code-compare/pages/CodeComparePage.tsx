import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Checkbox } from "../../../components/ui/checkbox";
import { Separator } from "../../../components/ui/separator";
import { Textarea } from "../../../components/ui/textarea";

export default function CodeComparePage() {
  return (
    <div className="space-y-8">
      { /* Header */}
      <div>
        <h1 className="text-3xl font-bold"> Code Compare Tool</h1>
        <p className="mt-2 text-muted-foreground"> Compare two code snippets or files and identify differences.</p>
      </div>
      {/* uploaded File */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h3 className="mb-3 font-medium">
            Original File
          </h3>
          <Button variant="outline"> Upload File</Button>
        </Card>

        <Card className="p-4">
          <h3>Compare File</h3>
          <Button variant="outline">Upload File</Button>
        </Card>
      </div>
       
       {/* Options */}

      <div className="flex items-center gap-3">
        <Checkbox id="ignore-space" />
        <label htmlFor="ignore-space" className="text-sm">Ignore White Space</label>
      </div>

      {/* Editors */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <h3 className="mb-3 font-medium">
            Original Code
          </h3>
          <Textarea placeholder="Paste Original code here" className="min-h-[400px]" />
        </Card>

        <Card className="p-4">
          <h3 className="mb-3 font-medium">
            Compare File Code
          </h3>
          <Textarea placeholder="Paste Second code Here... " className="min-h-[400px]" />
        </Card>
      </div>
      {/* Action */}
      <div className="flex justify-center">
        <Button size="lg">
          Compare
        </Button>
      </div>

      <Separator />
        {/* Result  */}

        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Diff Result
          </h2>

          <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed">
            <p className="text-muted-foreground">
              Comparison result will appear here.
            </p>
          </div>
        </Card>
    </div>
  );
}
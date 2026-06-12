import { TOOLS } from "../../../shared/constants/tools";
import { ToolCard } from "../../../shared/components/ToolCard";
import { Card } from "../../../components/ui/card";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Developer Tools
      </h1>
      <Card className="p-6 bg-transparent "> 
            <div className="grid gap-4 md:grid-cols-3">
                    { TOOLS.map((item) => (
                        <ToolCard title={item.title} description={item.description} path={item.path} />
                    ))}
            </div>
      </Card>
    </div>
  );
}
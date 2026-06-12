import { Link } from "react-router-dom";
import { Card } from "../../components/ui/card";

type ToolCardProps = {
  title: string;
  description: string;
  path: string;
  /* enabled?: boolean; */
};

export const ToolCard = ({title, description, path}: ToolCardProps) => {
    return (
        <>
            <Link to={path}>
                <Card className="p-4">
                    <h3 className="mb-3 font-medium">
                        {title}
                    </h3>
                    <p className="text-muted-foreground">
                        {description}
                    </p>
                </Card>
            </Link>
        </>      
    );
}
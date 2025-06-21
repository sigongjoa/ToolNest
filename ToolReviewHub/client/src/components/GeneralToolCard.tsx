import { ITool } from '../lib/types';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';

interface GeneralToolCardProps {
  tool: ITool;
}

export default function GeneralToolCard({ tool }: GeneralToolCardProps) {
  console.debug('GeneralToolCard: Rendering general tool card for:', tool.name);
  return (
    <Link to={`/tools/${tool.slug}`}>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>{tool.name}</CardTitle>
          <CardDescription>{tool.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="text-sm text-muted-foreground">카테고리: <Badge>{tool.category}</Badge></div>
          <div className="text-sm text-muted-foreground">평점: <Badge>{tool.rating}</Badge></div>
          {tool.imageUrl && <img src={tool.imageUrl} alt={tool.name} className="mt-2 rounded-md object-cover h-24 w-full" />}
        </CardContent>
      </Card>
    </Link>
  );
} 
import { ITool } from '../lib/types';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useEffect, useState } from 'react';

interface ToolCardProps {
  tool: ITool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  console.debug('ToolCard: Rendering tool card for:', tool.name);
  console.debug('ToolCard: Received tool object:', tool);

  const [riceScore, setRiceScore] = useState<number | null>(null);

  useEffect(() => {
    console.debug('ToolCard: useEffect triggered for tool:', tool.name);
    if (tool.metrics) {
      console.debug('ToolCard: Calculating rice score for tool:', tool.name, 'with metrics:', tool.metrics);
      const { accuracy, latency, cost, usability, stability } = tool.metrics;

      // Normalize latency (assuming 100ms is excellent, 2000ms is poor)
      const normalizedLatency = Math.max(0, (2000 - latency) / 1900); // Inverse relationship, scale to 0-1

      // Normalize cost (assuming $0.01 is excellent, $0.1 is poor)
      const normalizedCost = Math.max(0, (0.1 - cost) / 0.09); // Inverse relationship, scale to 0-1

      // Simple average of normalized metrics
      const calculatedScore = (
        (accuracy || 0) +
        normalizedLatency +
        normalizedCost +
        (usability || 0) +
        (stability || 0)
      ) / 5 * 100; // Scale to 0-100

      console.debug('ToolCard: Calculated rice score:', calculatedScore);
      setRiceScore(Math.round(calculatedScore));
    } else {
      console.debug('ToolCard: No metrics found for tool:', tool.name);
      setRiceScore(null);
    }
  }, [tool.metrics, tool.name]);

  return (
    <Link to={`/tools/${tool.id}`}>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>{tool.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          {riceScore !== null ? (
            <p className="text-sm text-muted-foreground">쌀먹지수: <Badge>{riceScore}</Badge></p>
          ) : (
            <p className="text-sm text-muted-foreground">메트릭 정보 없음</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
} 
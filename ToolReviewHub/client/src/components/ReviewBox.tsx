import { ReviewOut } from '../api/tools';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';

interface ReviewBoxProps {
  review: ReviewOut;
}

export default function ReviewBox({ review }: ReviewBoxProps) {
  console.debug('ReviewBox: Rendering review box with data:', review);
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>📊 쌀먹지수: {review.rice_score}</CardTitle>
        <CardDescription>{review.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 whitespace-pre-wrap">{review.content}</p>
        <div className="mb-2">
          <h4 className="font-semibold">장점:</h4>
          <div className="flex flex-wrap gap-2 mt-1">
            {review.pros.map((pro, index) => (
              <Badge key={index} variant="secondary">{pro}</Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold">단점:</h4>
          <div className="flex flex-wrap gap-2 mt-1">
            {review.cons.map((con, index) => (
              <Badge key={index} variant="destructive">{con}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 
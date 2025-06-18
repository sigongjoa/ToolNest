import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { debug } from '@/lib/utils';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  features: string[];
  use_cases: string[];
  tags: string[];
  url: string;
}

export function ToolDisplayPage() {
  debug('ToolDisplayPage 컴포넌트 렌더링 시작');
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    debug('useEffect: AI 도구 데이터 로드 시도');
    const fetchTools = async () => {
      try {
        setLoading(true);
        setError(null);
        debug('Fetching /data/ai_tools.json');
        const response = await fetch('/data/ai_tools.json');
        debug('Received response for /data/ai_tools.json', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Tool[] = await response.json();
        setTools(data);
        debug('Successfully loaded AI tools:', data.length);
      } catch (err) {
        console.error('Error loading AI tools:', err);
        setError(`AI 도구 로드 실패: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
        debug('AI 도구 로딩 완료');
      }
    };
    fetchTools();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">AI 도구 데이터를 로딩 중입니다...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">오류: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-neutral-800 mb-6">등록된 AI 도구 목록</h2>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        {tools.map((tool) => (
          <Card key={tool.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                {tool.imageUrl && <img src={tool.imageUrl} alt={tool.name} className="w-8 h-8 mr-3 rounded-full" />}
                {tool.name}
              </CardTitle>
              <CardDescription>카테고리: {tool.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-700 text-sm mb-2">{tool.description}</p>
              <p className="text-neutral-600 text-xs mb-2">주요 기능: {tool.features.join(', ')}</p>
              <p className="text-neutral-600 text-xs mb-2">사용 사례: {tool.use_cases.join(', ')}</p>
              <p className="text-neutral-600 text-xs mb-2">태그: {tool.tags.join(', ')}</p>
              <div className="flex items-center text-sm text-neutral-600 mt-2">
                <span>★ {tool.rating.toFixed(1)} ({tool.reviews} 리뷰)</span>
              </div>
              <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm mt-2 block">자세히 보기</a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 
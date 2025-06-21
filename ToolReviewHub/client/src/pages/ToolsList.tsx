import { useQuery } from '@tanstack/react-query';
import { fetchTools } from '../api/tools';
import { ITool, tools as sharedTools } from '../lib/types';
import ToolCard from '../components/ToolCard';
import GeneralToolCard from '../components/GeneralToolCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function ToolsList() {
  console.debug('ToolsList: Fetching tools for Rice Score tab...');
  const { data: riceScoreTools, isLoading, error } = useQuery<ITool[], Error>({
    queryKey: ['tools'],
    queryFn: fetchTools,
  });

  if (isLoading) {
    console.debug('ToolsList: Loading tools...');
    return <div className="text-center py-8">도구 목록을 불러오는 중...</div>;
  }

  if (error) {
    console.error('ToolsList: Error fetching tools:', error);
    return <div className="text-center py-8 text-red-500">도구를 불러오는데 실패했습니다: {error.message}</div>;
  }

  console.debug('ToolsList: Rice Score Tools loaded.', riceScoreTools);
  console.debug('ToolsList: Shared tools data for overview:', sharedTools);

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>AI 도구 목록</CardTitle>
          <CardDescription>다양한 AI 도구들을 살펴보고 쌀먹지수 순위를 확인하세요.</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">개략적인 소개</TabsTrigger>
          <TabsTrigger value="ricescore">쌀먹지수</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>개략적인 소개</CardTitle>
              <CardDescription>각 AI 도구에 대한 기본적인 정보를 확인하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(riceScoreTools) && riceScoreTools.map((tool: ITool) => (
                  <GeneralToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ricescore">
          <Card>
            <CardHeader>
              <CardTitle>쌀먹지수</CardTitle>
              <CardDescription>사용자 가중치 기반의 쌀먹지수 순위를 확인하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(riceScoreTools) && riceScoreTools.map((tool: ITool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 
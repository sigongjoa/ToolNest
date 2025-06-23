import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchTool, createReview, fetchReview } from '../api/tools';
import SliderGroup from '../components/SliderGroup';
import ReviewBox from '../components/ReviewBox';
import { useWeights } from '../context/WeightsContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export default function ToolDetail() {
  console.debug('ToolDetail: Component mounted.');
  const { slug } = useParams<{ slug: string }>();
  const { weights } = useWeights();

  const { data: tool, isLoading: isLoadingTool, error: toolError } = useQuery({
    queryKey: ['tool', slug],
    queryFn: () => {
      console.debug(`ToolDetail: Fetching tool with slug: ${slug}`);
      return fetchTool(slug!);
    },
    enabled: !!slug, // slug가 존재할 때만 쿼리 실행
  });

  const { data: review, isLoading: isLoadingReview, error: reviewError, refetch: refetchReview } = useQuery({
    queryKey: ['review', tool?.id],
    queryFn: () => {
      console.debug(`ToolDetail: Fetching review for tool ID: ${tool!.id}`);
      return fetchReview(tool!.id);
    },
    enabled: !!tool?.id, // tool.id가 존재할 때만 쿼리 실행
    staleTime: Infinity, // 리뷰는 한 번 생성되면 잘 변하지 않으므로 staleTime을 길게 설정
  });

  const mutation = useMutation({
    mutationFn: (payload: any) => {
      console.debug(`ToolDetail: Calling createReview for tool ID: ${tool!.id} with payload:`, payload);
      return createReview(tool!.id, payload);
    },
    onSuccess: () => {
      console.debug('ToolDetail: Review creation successful, refetching review.');
      refetchReview(); // 리뷰 생성 성공 시 최신 리뷰 다시 불러오기
    },
    onError: (error) => {
      console.error('ToolDetail: Error creating review:', error);
    }
  });

  const handleGenerate = () => {
    console.debug('ToolDetail: handleGenerate called.');
    if (tool) {
      mutation.mutate({
        metrics: tool.metrics,
        weights
      });
    } else {
      console.warn('ToolDetail: Tool data not available, cannot generate review.');
    }
  };

  if (isLoadingTool) {
    console.debug('ToolDetail: Loading tool details...');
    return <div className="text-center py-8">도구 정보를 불러오는 중...</div>;
  }

  if (toolError) {
    console.error('ToolDetail: Error fetching tool details:', toolError);
    return <div className="text-center py-8 text-red-500">도구 정보를 불러오는데 실패했습니다: {toolError.message}</div>;
  }

  if (!tool) {
    console.warn('ToolDetail: Tool not found for slug:', slug);
    return <div className="text-center py-8">도구를 찾을 수 없습니다.</div>;
  }

  console.debug('ToolDetail: Tool details loaded.', tool);

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{tool.name}</CardTitle>
          <CardDescription>AI 도구 상세 정보 및 쌀먹지수 리뷰 생성</CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">메트릭:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {tool.metrics ? (
              <>
                <p>정확도: <Badge>{tool.metrics.accuracy}</Badge></p>
                <p>지연 시간: <Badge>{tool.metrics.latency} ms</Badge></p>
                <p>비용: <Badge>${tool.metrics.cost}</Badge></p>
                <p>사용성: <Badge>{tool.metrics.usability}</Badge></p>
                <p>안정성: <Badge>{tool.metrics.stability}</Badge></p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground col-span-2">메트릭 정보 없음</p>
            )}
          </div>
          <h3 className="text-lg font-semibold mt-6 mb-2">가중치 설정:</h3>
          <SliderGroup />
          <Button
            onClick={handleGenerate}
            className="w-full mt-4"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? '리뷰 생성 중...' : '리뷰 생성'}
          </Button>
          {mutation.isError && (
            <div className="text-red-500 mt-2 text-center">
              리뷰 생성에 실패했습니다: {mutation.error.message}
            </div>
          )}
        </CardContent>
      </Card>

      {(review || mutation.data) && (
        <ReviewBox review={review || mutation.data!} />
      )}
      {isLoadingReview && !review && <div className="text-center py-4">리뷰를 불러오는 중...</div>}
      {reviewError && !review && (
        <div className="text-red-500 mt-2 text-center">
          기존 리뷰를 불러오는데 실패했습니다: {reviewError.message}
        </div>
      )}
    </div>
  );
} 
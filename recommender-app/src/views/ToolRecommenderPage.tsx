import { useState, useCallback, useEffect } from 'react';
import { recommendTools } from '@/lib/recommender';
import { initializeWebLLMEngine } from '@/lib/webLLMClient';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { debug } from '@/lib/utils';

interface Tool {
  id: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  rating: number;
}

export function ToolRecommenderPage() {
  debug('ToolRecommenderPage 컴포넌트 렌더링 시작');
  const [prefText, setPrefText] = useState<string>('');
  const [recommendedTools, setRecommendedTools] = useState<Tool[] | null>(null);
  const [isRecommending, setIsRecommending] = useState<boolean>(false);
  const [modelLoadingProgress, setModelLoadingProgress] = useState<{ progress: number; text: string } | null>(null);
  const [isModelInitialized, setIsModelInitialized] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    debug('useEffect: 컴포넌트 마운트 시 WebLLM 엔진 초기화 시도');
    const initEngine = async () => {
      try {
        setError(null);
        await initializeWebLLMEngine(
          (info: { progress: number; text: string }) => {
            setModelLoadingProgress(info);
            debug(`모델 로딩 진행: ${info.text} (${info.progress.toFixed(2)}%)`);
          }
        );
        setIsModelInitialized(true);
        debug('WebLLM 엔진 초기화 및 모델 로딩 완료');
      } catch (err) {
        debug('WebLLM 엔진 초기화 중 오류 발생:', err);
        setError(`모델 초기화 실패: ${err instanceof Error ? err.message : String(err)}`);
      }
    };
    initEngine();
  }, []);

  const handleRecommend = useCallback(async () => {
    debug('handleRecommend 함수 진입', { prefText });
    setIsRecommending(true);
    setRecommendedTools(null);
    setError(null);
    try {
      const result = await recommendTools(prefText);
      setRecommendedTools(result);
      debug('추천 성공:', { result });
    } catch (err) {
      debug('추천 생성 중 오류 발생:', err);
      setError(`추천 생성 실패: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsRecommending(false);
      debug('handleRecommend 함수 종료');
    }
  }, [prefText]);

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          AI 도구 추천 시스템
        </h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          당신의 작업 흐름에 맞는 최고의 AI 도구를 찾아보세요. 원하는 기능을 입력하시면 맞춤 추천을 해드립니다.
        </p>
      </header>

      <main className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">무엇을 찾으시나요?</h2>
          <textarea
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-4 h-auto min-h-[100px] py-4"
            rows={6}
            placeholder="예: 문서 요약에 특화된 AI 도구를 찾고 있습니다. 한글 지원이 잘 되면 좋겠어요. 또는, 이미지를 생성하고 편집하는 데 도움이 되는 AI 도구를 추천해 주세요."
            value={prefText}
            onChange={(e) => {
              setPrefText(e.target.value);
              debug('prefText 업데이트:', e.target.value);
            }}
          />
          <Button
            onClick={handleRecommend}
            disabled={!isModelInitialized || isRecommending || prefText.trim() === ''}
            className="w-full"
          >
            {isRecommending ? '추천 중...' : 'AI 도구 추천받기'}
          </Button>
        </section>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">오류:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {!isModelInitialized && modelLoadingProgress && (
          <p className="text-center mt-4 text-blue-600">모델 로딩 중: {modelLoadingProgress.text} ({modelLoadingProgress.progress.toFixed(2)}%)</p>
        )}
        {!isModelInitialized && !modelLoadingProgress && !error && (
          <p className="text-center mt-4 text-blue-600">AI 추천 모델 초기화 중...</p>
        )}

        {isModelInitialized && !isRecommending && recommendedTools && recommendedTools.length > 0 && (
          <section className="mt-8">
            <h3 className="text-2xl font-bold text-neutral-800 mb-4">추천 결과</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recommendedTools.map((tool) => (
                <Card key={tool.id}>
                  <CardHeader>
                    <CardTitle>{tool.name}</CardTitle>
                    <CardDescription>카테고리: {tool.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-700 text-sm mb-4">설명: {tool.description}</p>
                    <div className="flex items-center text-sm text-neutral-600">
                      <span>★ {tool.rating.toFixed(1)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {isModelInitialized && !isRecommending && recommendedTools && recommendedTools.length === 0 && prefText.trim() !== '' && (
          <p className="text-center mt-4 text-neutral-600">입력하신 내용과 일치하는 추천 도구를 찾을 수 없습니다.</p>
        )}
      </main>

      <footer className="text-center mt-12 text-neutral-500 text-sm">
        <p>&copy; 2024 AI Tool Recommender. All rights reserved.</p>
      </footer>
    </div>
  );
} 
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Search, Zap, Brain, Loader2, ArrowRight } from "lucide-react"
import { initializeWebLLMEngine, getEmbedding } from "../lib/webLLMClient"
import type { InitProgressReport } from "@mlc-ai/web-llm";
import { recommendAITools, loadAIData } from "../lib/recommender";
import { debug } from "../lib/utils";

interface AITool {
  id: string;
  name: string;
  description: string;
  features: string[];
  use_cases: string[];
  category: string;
  tags: string[];
  url: string;
  image_url: string;
  rating: number;
  reviews: number;
}

export default function AIToolRecommender() {
  console.debug('AIToolRecommender 컴포넌트 시작');
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [webLLMLog, setWebLLMLog] = useState<string[]>([])
  const [isWebLLMLoading, setIsWebLLMLoading] = useState(false)
  const [isWebLLMInitialized, setIsWebLLMInitialized] = useState(false)
  const [allAITools, setAllAITools] = useState<AITool[]>([]);

  useEffect(() => {
    console.debug('AIToolRecommender 컴포넌트 마운트됨');
    if (!isWebLLMInitialized && !isWebLLMLoading) {
      setIsWebLLMLoading(true);
      const initProgressCallback = (report: InitProgressReport) => {
        setWebLLMLog((prev) => {
          const newLog = [...prev, `[${report.text}] ${report.progress.toFixed(2)}%`];
          console.debug(`WebLLM Progress: ${report.text} - ${report.progress.toFixed(2)}%`);
          return newLog;
        });
      };

      initializeWebLLMEngine(initProgressCallback)
        .then(() => {
          console.debug('WebLLM 엔진 초기화 완료.');
          setWebLLMLog((prev) => [...prev, "WebLLM 엔진 초기화 완료."]);
          setIsWebLLMInitialized(true);
          setIsWebLLMLoading(false);
        })
        .catch((error) => {
          console.error("WebLLM 엔진 초기화 실패:", error);
          setWebLLMLog((prev) => [...prev, `WebLLM 엔진 초기화 실패: ${(error as Error).message}`]);
          setIsWebLLMLoading(false);
        });
    }

    console.debug('ai_tools.json 데이터 로드 시작 (모든 AI 도구 표시용)');
    fetch('/data/ai_tools.json')
      .then(response => {
        console.debug('ai_tools.json 응답 수신');
        if (!response.ok) {
          throw new Error(`HTTP 오류! 상태: ${response.status}`);
        }
        return response.json();
      })
      .then((data: AITool[]) => {
        console.debug('ai_tools.json 데이터 파싱 완료', data.length);
        console.debug('allAITools 상태 업데이트');
        setAllAITools(data);
        console.debug('allAITools 상태 업데이트 완료');
      })
      .catch(error => {
        console.error('ai_tools.json 로드 중 오류 발생:', error);
        console.debug('ai_tools.json 로드 실패');
      });

  }, [isWebLLMInitialized, isWebLLMLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    console.debug('handleSubmit 함수 진입');
    e.preventDefault()
    if (!query.trim()) {
      console.debug('쿼리가 비어있으므로 함수 종료');
      return
    }

    setIsLoading(true)
    setWebLLMLog((prev) => [...prev, `쿼리 임베딩 시작: ${query.substring(0, 30)}...`]);
    try {
      console.debug('recommender.ts에서 데이터 로드 시작 (필요한 경우)');
      await loadAIData(); // Ensure data is loaded in recommender.ts
      console.debug('recommendAITools 호출 시작');
      const recommendedTools = await recommendAITools(query);
      console.debug('recommendAITools 호출 완료. 추천 도구 수:', recommendedTools.length);
      setRecommendations(recommendedTools);
      setIsLoading(false);
      setWebLLMLog((prev) => [...prev, `추천 완료: ${recommendedTools.length}개 도구 추천됨`]);
    } catch (error) {
      console.error('추천 중 오류 발생:', error);
      setWebLLMLog((prev) => [...prev, `추천 중 오류 발생: ${(error as Error).message}`]);
      setIsLoading(false);
    }
  }

  const popularQueries = ["이미지 생성 도구", "텍스트 요약 AI", "코딩 도우미", "번역 도구", "프레젠테이션 제작"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI 도구 추천 시스템
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            당신의 작업 효율을 높일 <span className="font-semibold text-blue-600">최고의 AI 도구</span>를 찾아보세요.
            현하는 기능을 입력하시면 맞춤 추천을 해드립니다.
          </p>
        </div>

        {/* Main Search Form */}
        <div className="max-w-6xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* AI Tool Recommendation Section */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label htmlFor="query" className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    무엇을 찾으시나요?
                  </label>
                  <Textarea
                    id="query"
                    value={query}
                    onChange={(e) => {
                      console.debug('쿼리 변경 감지', e.target.value);
                      setQuery(e.target.value);
                    }}
                    placeholder="예: 문서 요약해 주는 AI 도구를 찾고 있습니다. 한글 지원이 되고, 무료로 사용할 수 있으면 좋겠어요. 또는, 이미지를 생성하고 편집하는 데 도움이 되는 AI 도구를 추천해 주세요."
                    className="min-h-[120px] text-base resize-none border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!query.trim() || isLoading || !isWebLLMInitialized}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      AI가 분석 중입니다...
                    </>
                  ) : isWebLLMLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      WebLLM 로딩 중...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      AI 추천 받기
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
              {recommendations.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    추천 AI 도구
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {recommendations.map((tool, index) => (
                      <Card key={index} className="border-l-4 border-blue-500 shadow-md hover:shadow-lg transition-all duration-200">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex-grow">
                            <h4 className="text-lg font-semibold text-slate-800">{tool.name}</h4>
                            <p className="text-slate-600 text-sm">{tool.description}</p>
                          </div>
                          <Badge variant="secondary" className="ml-4">{tool.category}</Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* All AI Tools Section */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-slate-700 mb-4">모든 AI 도구 목록</h3>
              {allAITools.length === 0 && (
                <p className="text-slate-600">AI 도구를 불러오는 중입니다...</p>
              )}
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                {allAITools.map((tool) => (
                  <Card
                    key={tool.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm hover:scale-105"
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <h3 className="text-xl font-bold text-slate-800">{tool.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {tool.category}
                          </Badge>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{tool.description}</p>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-1">
                            <div className="flex text-yellow-400">{"★".repeat(Math.floor(tool.rating))}</div>
                            <span className="text-sm text-slate-500 ml-1">{tool.rating}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {tool.tags.join(', ')}
                          </Badge>
                        </div>
                        <Button variant="outline" className="w-full mt-4 hover:bg-blue-50 hover:border-blue-300" onClick={() => window.open(tool.url, '_blank')}>
                          자세히 보기
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* WebLLM Log */}
        <div className="max-w-4xl mx-auto mt-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">WebLLM 로그</h2>
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 h-64 overflow-y-auto">
              {webLLMLog.length === 0 && <p className="text-slate-600">WebLLM 로드가 시작되기를 기다리는 중...</p>}
              {webLLMLog.map((log, index) => (
                <p key={index} className="font-mono text-sm text-slate-700">{log}</p>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

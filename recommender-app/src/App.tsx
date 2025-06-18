import { ToolRecommenderPage } from './views/ToolRecommenderPage';
import { ToolDisplayPage } from './views/ToolDisplayPage';
import { debug } from '@/lib/utils';

function App() {
  debug('App 컴포넌트 렌더링 시작');

  return (
    <div className="min-h-screen bg-neutral-50 p-8 flex flex-col">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          AI 도구 추천 시스템
        </h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          당신의 작업 흐름에 맞는 최고의 AI 도구를 찾아보세요. 원하는 기능을 입력하시면 맞춤 추천을 해드립니다.
        </p>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/2 p-4 bg-white rounded-lg shadow-md overflow-y-auto">
          <ToolDisplayPage />
        </aside>
        <main className="w-full lg:w-1/2 p-4 bg-white rounded-lg shadow-md overflow-y-auto">
          <ToolRecommenderPage />
        </main>
      </div>

      <footer className="text-center mt-12 text-neutral-500 text-sm">
        <p>&copy; 2024 AI Tool Recommender. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

import Header from "@/components/header";
import Footer from "@/components/footer";
import ToolCard from "@/components/tool-card";
import { tools } from "../../../../shared/types";

export default function AiSites() {
  console.debug('AiSites 컴포넌트 시작');
  // 'AI' 카테고리에 해당하는 도구만 필터링하여 표시합니다.
  const filteredTools = tools.filter(tool => tool.category === "AI"); 

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <main>
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                AI 사이트
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                다양한 AI 관련 도구들을 찾아보세요.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 
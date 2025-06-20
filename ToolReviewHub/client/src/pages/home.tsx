import Header from "@/components/header";
import Footer from "@/components/footer";
import ToolCard from "@/components/tool-card";
import { tools, ITool } from "../../../../shared/types";

export default function Home() {
  console.debug('Home 컴포넌트 시작');

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <main>
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                전문 도구 리뷰
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                업계 전문가의 종합적인 리뷰 및 평점을 통해 워크플로우에 가장 적합한 도구를 찾아보세요.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

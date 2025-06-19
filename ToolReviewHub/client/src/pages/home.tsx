import { useQuery } from "@tanstack/react-query";
import { type Tool } from "@shared/schema";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ToolCard from "@/components/tool-card";

export default function Home() {
  const { data: tools, isLoading } = useQuery<Tool[]>({
    queryKey: ["/api/tools"],
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <main>
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                Professional Tool Reviews
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Discover the best tools for your workflow with our comprehensive
                reviews and ratings from industry experts.
              </p>
            </div>

            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-md border border-neutral-200 p-6"
                  >
                    <div className="animate-pulse">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-neutral-200 rounded-lg mr-4"></div>
                        <div>
                          <div className="h-4 bg-neutral-200 rounded w-32 mb-2"></div>
                          <div className="h-3 bg-neutral-200 rounded w-20"></div>
                        </div>
                      </div>
                      <div className="h-3 bg-neutral-200 rounded w-20 mb-3"></div>
                      <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                      <div className="h-4 bg-neutral-200 rounded mb-4"></div>
                      <div className="h-4 bg-neutral-200 rounded w-24"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tools?.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

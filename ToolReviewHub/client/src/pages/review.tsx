import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { ArrowLeft, Play, Share } from "lucide-react";
import { type ToolWithReview } from "@shared/schema";
import Header from "@/components/header";
import Footer from "@/components/footer";
import StarRating from "@/components/star-rating";

export default function Review() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: tool, isLoading, error } = useQuery<ToolWithReview>({
    queryKey: [`/api/tools/${slug}`]
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-4 bg-neutral-200 rounded w-24 mb-8"></div>
            <div className="text-center mb-12">
              <div className="h-12 bg-neutral-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-neutral-200 rounded w-32 mx-auto mb-4"></div>
              <div className="h-4 bg-neutral-200 rounded w-48 mx-auto"></div>
            </div>
            <div className="h-48 bg-neutral-200 rounded mb-12"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !tool || !tool.review) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">Review Not Found</h1>
            <p className="text-neutral-600 mb-8">The review you're looking for doesn't exist.</p>
            <Link href="/" className="inline-flex items-center text-primary hover:underline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { review } = tool;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <nav className="mb-8">
            <Link href="/" className="inline-flex items-center text-neutral-600 hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Link>
          </nav>

          {/* Review Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              {tool.name}
            </h1>
            <div className="flex items-center justify-center mb-4">
              <StarRating rating={tool.rating} size="large" />
              <span className="text-2xl font-semibold text-neutral-900 ml-3">
                {tool.rating} / 5
              </span>
            </div>
            <p className="text-neutral-600 text-lg">{review.subtitle}</p>
          </header>

          {/* Review Content */}
          <div className="prose max-w-none mb-12">
            <div className="bg-neutral-100 rounded-lg p-8 mb-8">
              <p className="text-lg leading-relaxed text-neutral-800">
                {review.content}
              </p>
            </div>
          </div>

          {/* Pros and Cons */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Pros */}
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Pros
              </h3>
              <ul className="space-y-3">
                {review.pros.map((pro, index) => (
                  <li key={index} className="flex items-start text-green-700">
                    <svg className="w-4 h-4 mt-1 mr-3 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="text-xl font-semibold text-red-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Cons
              </h3>
              <ul className="space-y-3">
                {review.cons.map((con, index) => (
                  <li key={index} className="flex items-start text-red-700">
                    <svg className="w-4 h-4 mt-1 mr-3 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Screenshot Gallery */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-neutral-900 mb-6">Screenshots</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {review.screenshots.map((screenshot, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={screenshot} 
                    alt={`${tool.name} screenshot ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm text-neutral-600">Screenshot {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center">
            <Link 
              href="/" 
              className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Tools
            </Link>
            <button className="inline-flex items-center border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors">
              <Share className="w-4 h-4 mr-2" />
              Share Review
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

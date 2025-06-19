import { Link } from "wouter";
import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary cursor-pointer">
                툴 리뷰 허브
              </h1>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-neutral-600 hover:text-primary transition-colors"
            >
              홈
            </Link>
            <Link 
              href="/ai-sites" 
              className="text-neutral-600 hover:text-primary transition-colors"
            >
              AI 사이트
            </Link>
            <Link 
              href="/useful-sites" 
              className="text-neutral-600 hover:text-primary transition-colors"
            >
              유용한 사이트
            </Link>
            <Link 
              href="/officeworker-ai-sites" 
              className="text-neutral-600 hover:text-primary transition-colors"
            >
              직장인 AI 사이트
            </Link>
            <Link 
              href="/student-ai-sites" 
              className="text-neutral-600 hover:text-primary transition-colors"
            >
              학생 AI 사이트
            </Link>
            <Link 
              href="#" 
              className="text-neutral-600 hover:text-primary transition-colors"
            >
              소개
            </Link>
          </nav>
          
          <button className="md:hidden p-2 rounded-md hover:bg-neutral-100">
            <Menu className="w-5 h-5 text-neutral-600" />
          </button>
        </div>
      </div>
    </header>
  );
}

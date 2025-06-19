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
                ToolReview Hub
              </h1>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-neutral-600 hover:text-primary transition-colors"
            >
              Home
            </Link>
            <a 
              href="#" 
              className="text-neutral-600 hover:text-primary transition-colors"
            >
              Categories
            </a>
            <a 
              href="#" 
              className="text-neutral-600 hover:text-primary transition-colors"
            >
              About
            </a>
          </nav>
          
          <button className="md:hidden p-2 rounded-md hover:bg-neutral-100">
            <Menu className="w-5 h-5 text-neutral-600" />
          </button>
        </div>
      </div>
    </header>
  );
}

# ToolReview Hub - Replit.md

## Overview

ToolReview Hub is a full-stack web application for professional tool reviews and ratings. It provides a platform where users can browse comprehensive reviews of various tools and software, helping them make informed decisions for their workflow. The application features a modern, clean interface built with React and a robust backend API powered by Express.js.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js 20
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API structure
- **Development Server**: Custom Vite integration for SSR-like development experience
- **Error Handling**: Centralized error middleware with structured error responses

### Data Storage
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured but can be adapted)
- **Schema**: Centralized schema definition in shared directory
- **Migrations**: Drizzle Kit for database migrations
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development

## Key Components

### Database Schema
- **Tools Table**: Core entity storing tool information (id, name, slug, category, description, rating, imageUrl)
- **Reviews Table**: Detailed reviews linked to tools (id, toolId, content, pros, cons, screenshots, subtitle)
- **Type Safety**: Zod schemas for validation and TypeScript type inference

### API Endpoints
- `GET /api/tools` - Retrieve all tools
- `GET /api/tools/:slug` - Get specific tool with review by slug

### UI Components
- **ToolCard**: Displays tool summary with rating and navigation to detailed review
- **StarRating**: Custom star rating component with configurable sizes
- **Header/Footer**: Consistent navigation and branding
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### Storage Layer
- **IStorage Interface**: Abstract storage contract for database operations
- **MemStorage**: In-memory implementation with sample data for development
- **Future Database Integration**: Ready for PostgreSQL connection via Drizzle

## Data Flow

1. **Client Request**: User navigates to home page or specific tool review
2. **React Query**: Fetches data from API endpoints with caching and error handling
3. **Express Routes**: Handle API requests and delegate to storage layer
4. **Storage Layer**: Retrieves data from configured storage implementation
5. **Response**: Structured JSON responses with error handling
6. **UI Rendering**: React components render data with loading and error states

## External Dependencies

### Production Dependencies
- **UI Framework**: React ecosystem (@tanstack/react-query, wouter)
- **UI Components**: Comprehensive Radix UI component set
- **Database**: Drizzle ORM with PostgreSQL adapter (@neondatabase/serverless)
- **Styling**: Tailwind CSS with utility libraries (clsx, class-variance-authority)
- **Forms**: React Hook Form with Zod resolvers
- **Utilities**: Date manipulation (date-fns), carousel (embla-carousel-react)

### Development Dependencies
- **Build Tools**: Vite with React plugin and Replit-specific plugins
- **Type Checking**: TypeScript with strict configuration
- **Database Tools**: Drizzle Kit for migrations and schema management

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite development server with HMR
- **Port Configuration**: Local port 5000 mapped to external port 80
- **Database**: In-memory storage for rapid development iteration
- **Error Overlay**: Replit-specific error modal for debugging

### Production Build
- **Client Build**: Vite builds React app to `dist/public`
- **Server Build**: esbuild bundles Express server to `dist/index.js`
- **Static Assets**: Served from dist/public directory
- **Environment**: Production-ready Express server with error handling

### Replit Configuration
- **Autoscale Deployment**: Configured for automatic scaling
- **Module Dependencies**: Node.js 20, web server, PostgreSQL 16
- **Workflow**: Parallel execution with development server startup

## Changelog

Changelog:
- June 18, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.
import { tools, reviews, type Tool, type Review, type InsertTool, type InsertReview, type ToolWithReview } from "@shared/schema";

export interface IStorage {
  getTools(): Promise<Tool[]>;
  getToolBySlug(slug: string): Promise<ToolWithReview | undefined>;
  createTool(tool: InsertTool): Promise<Tool>;
  createReview(review: InsertReview): Promise<Review>;
}

export class MemStorage implements IStorage {
  private tools: Map<number, Tool>;
  private reviews: Map<number, Review>;
  private currentToolId: number;
  private currentReviewId: number;

  constructor() {
    this.tools = new Map();
    this.reviews = new Map();
    this.currentToolId = 1;
    this.currentReviewId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Visual Studio Code
    const vscode: Tool = {
      id: this.currentToolId++,
      name: "Visual Studio Code",
      slug: "visual-studio-code",
      category: "Code Editor",
      description: "A powerful, lightweight code editor with extensive extension support and integrated development features.",
      rating: 5.0,
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80"
    };
    this.tools.set(vscode.id, vscode);

    const vscodeReview: Review = {
      id: this.currentReviewId++,
      toolId: vscode.id,
      subtitle: "The definitive code editor for modern development",
      content: "Visual Studio Code has revolutionized the way developers approach coding with its perfect balance of simplicity and power. As a free, open-source editor developed by Microsoft, VS Code has become the go-to choice for millions of developers worldwide. Its lightweight architecture doesn't compromise on functionality, offering an extensive marketplace of extensions that can transform it into a full-featured IDE for any programming language or framework. The integrated terminal, debugging capabilities, and Git integration make it a comprehensive development environment. What sets VS Code apart is its incredible customization options, allowing developers to tailor every aspect of their coding experience. The IntelliSense feature provides smart code completion, while the built-in support for multiple languages and frameworks makes it versatile enough for any project. Regular updates and an active community ensure that VS Code stays current with the latest development trends and technologies.",
      pros: [
        "Completely free and open-source",
        "Extensive extension marketplace with thousands of plugins",
        "Lightweight and fast performance",
        "Excellent Git integration and version control",
        "Cross-platform support (Windows, macOS, Linux)",
        "Regular updates and active development"
      ],
      cons: [
        "Can become resource-heavy with many extensions",
        "Limited built-in refactoring tools compared to full IDEs",
        "Requires configuration for optimal language-specific features",
        "Some enterprise features require additional setup"
      ],
      screenshots: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        "https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        "https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
      ]
    };
    this.reviews.set(vscodeReview.id, vscodeReview);

    // Figma
    const figma: Tool = {
      id: this.currentToolId++,
      name: "Figma",
      slug: "figma",
      category: "Design Tool",
      description: "Collaborative design platform that revolutionizes team workflows with real-time collaboration and prototyping.",
      rating: 4.2,
      imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80"
    };
    this.tools.set(figma.id, figma);

    const figmaReview: Review = {
      id: this.currentReviewId++,
      toolId: figma.id,
      subtitle: "Collaborative design that transforms team workflows",
      content: "Figma has fundamentally changed how design teams collaborate and create digital products. As a browser-based design tool, it eliminates the traditional barriers of software installation and version control that plague other design platforms. The real-time collaboration feature allows multiple team members to work simultaneously on the same project, making it feel more like Google Docs for designers. Its component system and design tokens create consistency across large projects, while the auto-layout feature saves countless hours in responsive design creation. The prototyping capabilities are robust enough for complex interactions, and the developer handoff process is seamless with generated code snippets and design specifications. Figma's plugin ecosystem extends functionality significantly, and the community resources are invaluable for design teams. The web-based nature means it works equally well on any operating system, making it ideal for distributed teams. However, it does require a stable internet connection and can be resource-intensive on older machines when working with complex designs.",
      pros: [
        "Real-time collaboration with team members",
        "Browser-based with no installation required",
        "Powerful component system and design tokens",
        "Excellent developer handoff with code generation",
        "Cross-platform compatibility"
      ],
      cons: [
        "Requires stable internet connection",
        "Can be resource-intensive on older machines",
        "Limited advanced typography features",
        "Subscription pricing can be expensive for large teams"
      ],
      screenshots: [
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
      ]
    };
    this.reviews.set(figmaReview.id, figmaReview);

    // Notion
    const notion: Tool = {
      id: this.currentToolId++,
      name: "Notion",
      slug: "notion",
      category: "Productivity",
      description: "All-in-one workspace that combines notes, docs, wikis, and project management in one flexible platform.",
      rating: 4.4,
      imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80"
    };
    this.tools.set(notion.id, notion);

    const notionReview: Review = {
      id: this.currentReviewId++,
      toolId: notion.id,
      subtitle: "The ultimate all-in-one workspace solution",
      content: "Notion has redefined what a productivity workspace can be by seamlessly combining notes, databases, wikis, and project management into a single, infinitely customizable platform. Its block-based editor allows users to create complex documents that can include text, images, tables, kanban boards, calendars, and more, all within the same interface. The template system accelerates setup for common use cases, while the database functionality rivals dedicated tools like Airtable. Notion's flexibility is both its greatest strength and potential weakness - while power users can create incredibly sophisticated workflows, newcomers might feel overwhelmed by the possibilities. The collaboration features enable teams to maintain shared knowledge bases and project documentation effectively. Recent performance improvements have addressed earlier speed concerns, though it can still feel slower than specialized tools. The mobile apps have improved significantly, making it viable for on-the-go productivity. For teams looking to consolidate multiple tools into one platform, Notion presents a compelling option.",
      pros: [
        "Incredibly flexible and customizable workspace",
        "Combines multiple productivity tools in one platform",
        "Powerful database and template system",
        "Strong collaboration and sharing features",
        "Regular feature updates and improvements",
        "Extensive integration capabilities"
      ],
      cons: [
        "Steep learning curve for advanced features",
        "Can be slower than specialized tools",
        "Limited offline functionality",
        "Pricing can escalate quickly for larger teams"
      ],
      screenshots: [
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
      ]
    };
    this.reviews.set(notionReview.id, notionReview);
  }

  async getTools(): Promise<Tool[]> {
    return Array.from(this.tools.values());
  }

  async getToolBySlug(slug: string): Promise<ToolWithReview | undefined> {
    const tool = Array.from(this.tools.values()).find(t => t.slug === slug);
    if (!tool) return undefined;

    const review = Array.from(this.reviews.values()).find(r => r.toolId === tool.id);
    return { ...tool, review };
  }

  async createTool(insertTool: InsertTool): Promise<Tool> {
    const id = this.currentToolId++;
    const tool: Tool = { ...insertTool, id };
    this.tools.set(id, tool);
    return tool;
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const review: Review = { ...insertReview, id };
    this.reviews.set(id, review);
    return review;
  }
}

export const storage = new MemStorage();

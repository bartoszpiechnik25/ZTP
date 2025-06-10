import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";
import { Input } from "@/shared/components/ui/Input";
import { BookOpen, MessageCircle, Mail, ExternalLink, Search, Upload, Shield } from "lucide-react";

const faqItems = [
  {
    question: "How do I upload documents?",
    answer:
      "You can upload documents by clicking the 'Upload' button in the sidebar or using the quick action on the dashboard. Supported formats include PDF, DOCX, TXT, and images.",
    category: "Getting Started",
  },
  {
    question: "What file formats are supported?",
    answer:
      "CatDoc supports PDF, Microsoft Word documents (DOCX), plain text files (TXT), and common image formats (JPG, PNG, TIFF) for OCR processing.",
    category: "File Formats",
  },
  {
    question: "How does document processing work?",
    answer:
      "After upload, documents are automatically processed using OCR and AI to extract text content, identify document types, and categorize them for easy searching.",
    category: "Processing",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, all documents are encrypted in transit and at rest. We follow industry-standard security practices and never share your data with third parties.",
    category: "Security",
  },
  {
    question: "What are the storage limits?",
    answer:
      "Free accounts include 1GB of storage. Premium plans offer 10GB, 100GB, and unlimited storage options depending on your subscription.",
    category: "Storage",
  },
  {
    question: "Can I organize documents into folders?",
    answer:
      "Yes, you can create custom categories and tags to organize your documents. Use the Categories section to create and manage your organizational structure.",
    category: "Organization",
  },
];

const quickLinks = [
  {
    title: "Getting Started Guide",
    description: "Learn the basics of CatDoc",
    icon: BookOpen,
    href: "#getting-started",
  },
  {
    title: "Upload Documents",
    description: "How to add your first document",
    icon: Upload,
    href: "#upload-guide",
  },
  {
    title: "Search & Filter",
    description: "Find documents quickly",
    icon: Search,
    href: "#search-guide",
  },
  {
    title: "Account Security",
    description: "Protect your account",
    icon: Shield,
    href: "#security-guide",
  },
];

export default function HelpPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">Find answers to common questions and get help with CatDoc.</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search help articles..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Quick Links */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <div className="space-y-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Card key={link.title} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-primary mt-0.5" />
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm">{link.title}</h4>
                        <p className="text-xs text-muted-foreground">{link.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* FAQ */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-base leading-relaxed">{item.question}</CardTitle>
                    <Badge variant="secondary" className="text-xs whitespace-nowrap">
                      {item.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle>Still Need Help?</CardTitle>
          <CardDescription>Get in touch with our support team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-4 text-center">
                <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                <h4 className="font-medium mb-2">Live Chat</h4>
                <p className="text-sm text-muted-foreground mb-3">Get instant help from our support team</p>
                <Button className="w-full">Start Chat</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
                <h4 className="font-medium mb-2">Email Support</h4>
                <p className="text-sm text-muted-foreground mb-3">Send us a detailed message</p>
                <Button variant="outline" className="w-full">
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
                <h4 className="font-medium mb-2">Documentation</h4>
                <p className="text-sm text-muted-foreground mb-3">Browse our complete guide</p>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Docs
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current status of CatDoc services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Document Upload</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Operational
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">OCR Processing</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Operational
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Search & Analytics</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Operational
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client"

import ReactMarkdown from "react-markdown"
import { useTheme } from "next-themes"
import remarkGfm from "remark-gfm"

interface PostContentProps {
  content: string
}

export function PostContent({ content }: PostContentProps) {
  const { theme } = useTheme()

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none mb-12">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "")
            const language = match ? match[1] : ""

            return !inline && match ? (
              <div className="relative">
                {language && (
                  <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {language}
                  </div>
                )}
                <pre className={`language-${language} bg-muted p-4 rounded-lg overflow-x-auto border`}>
                  <code className={`language-${language} text-sm`} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            ) : (
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            )
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto">
                <table className="min-w-full">{children}</table>
              </div>
            )
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground bg-muted/30 py-2 rounded-r">
                {children}
              </blockquote>
            )
          },
          h1({ children }) {
            return <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground border-b pb-2">{children}</h1>
          },
          h2({ children }) {
            return <h2 className="text-2xl font-semibold mt-6 mb-3 text-foreground">{children}</h2>
          },
          h3({ children }) {
            return <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">{children}</h3>
          },
          p({ children }) {
            return <p className="mb-4 leading-7">{children}</p>
          },
          ul({ children }) {
            return <ul className="mb-4 ml-6 list-disc">{children}</ul>
          },
          ol({ children }) {
            return <ol className="mb-4 ml-6 list-decimal">{children}</ol>
          },
          li({ children }) {
            return <li className="mb-1">{children}</li>
          },
          a({ href, children }) {
            return (
              <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

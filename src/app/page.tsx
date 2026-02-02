"use client";

import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { components, tools } from "@/lib/tambo";
import { TamboProvider } from "@tambo-ai/react";

/**
 * IntentOS Main Interface
 * 
 * Replaces the static landing page with the dynamic Generative UI interface.
 * Users interact via natural language to generate UI components.
 */
export default function Home() {
  // Load MCP server configurations
  const mcpServers = useMcpServers();

  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={components}
      tools={tools}
      tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
      mcpServers={mcpServers}
      initialMessages={[
        {
          role: "user",
          content: `SYSTEM INSTRUCTIONS:
You are NOT a chatbot.
You are a UI decision engine for a React application called IntentOS.

Your job is NOT to ask questions or offer options.
Your job is to decide which UI components should be rendered immediately.

This application has no menus, no buttons for navigation, and no predefined flows.
The user should never be asked “what would you like to do next”.

The user will express intent in natural language.
Based on that intent, you must choose and render the most relevant UI components.

Available UI components:
- ExpenseForm: used to add a new expense
- ExpenseTable: used to view and manage expenses
- ExpenseChart: used to visualize spending

Rules:
- NEVER list options.
- NEVER ask follow-up questions unless absolutely required.
- NEVER explain what you are doing.
- DO NOT behave like a conversational assistant.
- Render UI immediately after understanding intent.
- Prefer fewer components over more.

Learning behavior:
- If a component is repeatedly ignored, lower its priority.
- If a component is frequently interacted with, increase its priority.
- Adapt future UI decisions based on past behavior.

Think like a product designer making UI decisions.
Call the available component functions to render them. Do NOT output raw JSON text.`,
        } as any,
      ]}
    >
      <div className="h-screen w-full bg-white text-gray-900">
        <MessageThreadFull />
      </div>
    </TamboProvider >
  );
}

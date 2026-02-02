/**
 * @file tambo.ts
 * @description Central configuration file for Tambo components and tools
 *
 * This file serves as the central place to register your Tambo components and tools.
 * It exports arrays that will be used by the TamboProvider.
 *
 * Read more about Tambo at https://tambo.co/docs
 */

import { Graph, graphSchema } from "@/components/tambo/graph";
import { DataCard, dataCardSchema } from "@/components/ui/card-data";
import {
  ExpenseChart,
  expenseChartSchema,
} from "@/components/expenses/ExpenseChart";
import {
  ExpenseForm,
  expenseFormSchema,
} from "@/components/expenses/ExpenseForm";
import {
  ExpenseInsight,
  expenseInsightSchema,
} from "@/components/expenses/ExpenseInsight";
import {
  ExpenseTable,
  expenseTableSchema,
} from "@/components/expenses/ExpenseTable";
import {
  getCountryPopulations,
  getGlobalPopulationTrend,
} from "@/services/population-stats";
import type { TamboComponent } from "@tambo-ai/react";
import { TamboTool } from "@tambo-ai/react";
import { z } from "zod";

/**
 * tools
 *
 * This array contains all the Tambo tools that are registered for use within the application.
 * Each tool is defined with its name, description, and expected props. The tools
 * can be controlled by AI to dynamically fetch data based on user interactions.
 */

export const tools: TamboTool[] = [
  {
    name: "countryPopulation",
    description:
      "A tool to get population statistics by country with advanced filtering options",
    tool: getCountryPopulations,
    inputSchema: z.object({
      continent: z.string().optional(),
      sortBy: z.enum(["population", "growthRate"]).optional(),
      limit: z.number().optional(),
      order: z.enum(["asc", "desc"]).optional(),
    }),
    outputSchema: z.array(
      z.object({
        countryCode: z.string(),
        countryName: z.string(),
        continent: z.enum([
          "Asia",
          "Africa",
          "Europe",
          "North America",
          "South America",
          "Oceania",
        ]),
        population: z.number(),
        year: z.number(),
        growthRate: z.number(),
      }),
    ),
  },
  {
    name: "globalPopulation",
    description:
      "A tool to get global population trends with optional year range filtering",
    tool: getGlobalPopulationTrend,
    inputSchema: z.object({
      startYear: z.number().optional(),
      endYear: z.number().optional(),
    }),
    outputSchema: z.array(
      z.object({
        year: z.number(),
        population: z.number(),
        growthRate: z.number(),
      }),
    ),
  },
  // Add more tools here
];

/**
 * components
 *
 * This array contains all the Tambo components that are registered for use within the application.
 * Each component is defined with its name, description, and expected props. The components
 * can be controlled by AI to dynamically render UI elements based on user interactions.
 */
export const components: TamboComponent[] = [
  {
    name: "ExpenseInsight",
    description:
      "A card component to display AI-generated insights, analysis, or recommendations about the user's spending. Use this when asked to analyze expenses or when you identify a spending pattern or issue.",
    component: ExpenseInsight,
    propsSchema: expenseInsightSchema,
  },
  {
    name: "Graph",
    description:
      "A component that renders various types of charts (bar, line, pie) using Recharts. Supports customizable data visualization with labels, datasets, and styling options.",
    component: Graph,
    propsSchema: graphSchema,
  },
  {
    name: "DataCard",
    description:
      "A component that displays options as clickable cards with links and summaries with the ability to select multiple items.",
    component: DataCard,
    propsSchema: dataCardSchema,
  },
  {
    name: "ExpenseForm",
    description:
      "A form to add new expenses. Includes fields for description, amount, and category. Use this when the user wants to track a new expense or add a transaction.",
    component: ExpenseForm,
    propsSchema: expenseFormSchema,
  },
  {
    name: "ExpenseTable",
    description:
      "A table displaying a list of recent expenses. Supports filtering by category and deleting items. Use this to show the user their expense history or list.",
    component: ExpenseTable,
    propsSchema: expenseTableSchema,
  },
  {
    name: "ExpenseChart",
    description:
      "A chart visualizing expense distribution by category. Can be a pie chart or bar chart. Use this when the user wants to see analytics, summaries, or visual breakdowns of their spending.",
    component: ExpenseChart,
    propsSchema: expenseChartSchema,
  },
];

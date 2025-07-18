// app/api/graphql/route.ts
/*
import { createSchema, createYoga } from "graphql-yoga";
import { readFile } from "fs/promises";
import path from "path";
import { NextRequest } from "next/server";

const typeDefs =  `
  type Convert {
    id: ID!
    from: String!
    to: String!
    amount: Float!
  }

  type Query {
    converts: [Convert!]!
    convertsFrom(from: String!): [Convert!]!
    convertsTo(to: String!): [Convert!]!
  }
`;

// Pomocná funkce pro načtení dat
async function loadData() {
  const filePath = path.join(process.cwd(), "converts.json");
  const data = await readFile(filePath, "utf-8");
  return JSON.parse(data);
}

const resolvers = {
  Query: {
    converts: async () => {
      try {
        return await loadData();
      } catch (err) {
        console.error("Chyba při čtení souboru:", err);
        throw new Error("Nepodařilo se načíst data");
      }
    },
    convertsFrom: async (_: any, args: { from: string }) => {
      const data = await loadData();
      return data.filter((item: any) => item.from === args.from);
    },
    convertsTo: async (_: any, args: { to: string }) => {
      const data = await loadData();
      return data.filter((item: any) => item.to === args.to);
    },
  },
};

const yoga = createYoga<{
  req: NextRequest;
}>({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export { yoga as GET, yoga as POST }; */

import path from "path";
import url from "url";
import fs from "fs/promises";
import { jsonData } from "@/utils/types";
import { NextResponse } from "next/server";

export async function GET() {
  const fileName = url.fileURLToPath(import.meta.url);
  const dirname = path.dirname(fileName);
  const pathUrl = path.join(dirname, "..", "..", "..", "converts.json");

  try {
    const data = await fs.readFile(pathUrl, { encoding: "utf-8" });
    const clearData: jsonData[] = await JSON.parse(data);
    return NextResponse.json(clearData, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}

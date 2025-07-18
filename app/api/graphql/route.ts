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

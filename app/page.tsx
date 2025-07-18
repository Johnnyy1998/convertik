"use client";
import Landing from "@/components/Landing";
import NextStatistic from "@/components/NextStatistic";
import Statistic from "@/components/Statistic";
import TestGraphql from "@/components/TestGraphql";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="my-10 mx-auto px-3 max-w-[860px] flex flex-col">
        <Landing />
        <Statistic />
        <NextStatistic />
        <TestGraphql />
      </div>
    </QueryClientProvider>
  );
}

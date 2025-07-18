"use client";
import { getAllData, handleForm } from "@/utils/actions";
import { currencies } from "@/utils/currencies";
import { jsonData, resultData } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function Landing() {
  const [numberOfCalculation, setNumberOfCalculation] = useState<number>(0);
  const [result, setResult] = useState<resultData>();

  // Access the client
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const response = await handleForm(e);
        setNumberOfCalculation(numberOfCalculation + 1);
        setResult(response);
      } catch (error) {
        console.log("sth went wrong");
      }
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["Statistic"] });
      queryClient.invalidateQueries({ queryKey: ["allData"] });
    },
  });
  return (
    <>
      <h1 className="text-center font-semibol text-2xl">
        Purple currency converter
      </h1>
      <form onSubmit={mutation.mutate}>
        <div className="mx-auto bg-[#522473] mt-5 w-[391px] h-[342px] md:w-[860px] md:h-[213px] flex flex-col md:flex-row gap-6 md:gap-3 items-center justify-center py-10 rounded-[10px]">
          <div className="flex flex-col">
            <label className="label-box">Amount to convert</label>
            <input type="number" name="amount" className="input-box" />
          </div>
          <div className="flex flex-col">
            <label className="label-box">From</label>
            <select name="from" className="input-box" defaultValue="">
              <option value="" disabled hidden></option>
              {/* disabled a hidden zajistí, že ji nelze vybrat znovu po výběru jiné */}
              {currencies.map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col ">
            <label className="label-box">To</label>
            <select name="to" className="input-box" defaultValue="">
              <option disabled hidden />
              {currencies.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid justify-center">
          <button
            type="submit"
            className="bg-[#522473] w-[167px] h-[52px] text-[#ffffff] text-sm rounded-[6px] mt-[24px]"
          >
            Convert currency
          </button>
        </div>
      </form>
      {result && (
        <div className="flex items-center justify-center mt-7">
          <div className="border border-black/20 rounded-md p-6 flex flex-col gap-3 w-full sm:w-fit">
            <div>
              <p className="text-sm text-gray-600">Result</p>
              <p className="text-2xl font-semibold">
                {result.result} {result.to}
              </p>
            </div>

            <div className="h-px bg-gray-300/70" />

            <div>
              <p className="text-sm text-gray-600">
                Number of calculations made
              </p>
              <p className="text-lg font-medium">{numberOfCalculation}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Landing;

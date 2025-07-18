import {
  deleteItem,
  getAllData /* , getAllDatGraphQL */,
} from "@/utils/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function NextStatistic() {
  // Access the client
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id: number) => {
      await deleteItem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Statistic"] });
      queryClient.invalidateQueries({ queryKey: ["allData"] });
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allData"],
    queryFn: getAllData,
  });

  // Pokud se data načítají
  if (isLoading) return <>Loading...</>;

  // Pokud došlo k chybě
  if (isError) return <div>Error: Unable to load data</div>;

  return (
    <div className="overflow-x-auto mt-4">
      {data && data.length > 0 ? (
        <>
          <table className="w-full bg-white border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left border-b">Amount</th>
                <th className="px-4 py-2 text-left border-b">From</th>
                <th className="px-4 py-2 text-left border-b">To</th>
                <th className="px-4 py-2 text-left border-b"></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => {
                const { amount, from, to, id } = item;
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">
                      {amount ? amount : "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b">{from}</td>
                    <td className="px-4 py-2 border-b">{to}</td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => mutation.mutate(id)}
                        className="text-red-500 font-semibold"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default NextStatistic;

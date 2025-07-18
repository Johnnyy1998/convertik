import { getStatistic } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";

function Statistic() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["Statistic"],
    queryFn: getStatistic,
  });
  if (isLoading) return <h1>Loading ...</h1>;
  if (isError) return <h1>Something went wrong {error.message}</h1>;
  if (!data.mostFrom || !data.mostTo) return <></>;
  return (
    <div className=" mt-5 border-b-blue-100  grid items-center justify-center">
      <h1>Most used transfered currency is: {data.mostFrom}</h1>
      <h1>Most used target currency is: {data.mostTo}</h1>
    </div>
  );
}

export default Statistic;

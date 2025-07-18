/* import { getGraphqlEndPoint } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";

function TestGraphql() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["TestGraph"],
    queryFn: getGraphqlEndPoint,
  });
  if (isLoading) return <>Loading ..</>;
  if (isError) return <>Error ..</>;
  console.log(data);
  return <div>TestGraphql</div>;
}

export default TestGraphql;
 */

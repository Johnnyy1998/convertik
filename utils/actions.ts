import axios from "axios";
import { jsonData } from "./types";

export async function handleForm(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const amount = formData.get("amount") || null;
  const from = formData.get("from") || null;
  const to = formData.get("to") || null;
  console.log(amount, from, to);
  if (!amount || !from || !to) {
    console.log("Missing data");
  }

  try {
    const response = await fetch("/api/convert", {
      method: "Post",
      headers: { ContentType: "application/json" },
      body: JSON.stringify({ amount, from, to }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Failed post of convertion");
  }
}

export async function getStatistic() {
  try {
    const response = await fetch("/api/statistic", {
      method: "Get",
      headers: { ContentType: "application/json" },
    });
    if (!response) {
      throw new Error("fail to read data");
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getAllData() {
  try {
    const callEndPoint = await axios.get("/api/allData");
    return callEndPoint.data as jsonData[];
  } catch (error) {
    throw new Error("not able to read endpoint");
  }
}

export async function deleteItem(id: number) {
  try {
    const data = await axios.delete(`/api/allData/${id}`);
    return data;
  } catch (error) {
    console.log("not able to access endpoint");
  }
}

/* // GRAPGQL endpoints asking

export async function getGraphqlEndPoint() {
  try {
    const response = await axios.post("/api/graphql", {
      query: `
        query ConvertsFrom($from: String!) {
          convertsFrom(from: $from) {
            amount
            to
          }
        }
      `,
      variables: {
        from: "PLN", // <- sem patří skutečná hodnota
      },
    });
    return response.data.data.convertsFrom;
  } catch (error) {
    console.log("Client side error:", error);
  }
}

export async function getAllDatGraphQL() {
  try {
    // Definice GraphQL dotazu pro získání všech konverzí
    const query = `
      query Converts {
        converts {
          id
          from
          to
          amount
        }
      }
    `;

    // Volání endpointu pomocí axios
    const response = await axios.post("/api/graphql", {
      query: query,
    });

    console.log("lool");
    console.log(response.data);
    return response.data.data.converts as jsonData[];
  } catch (error) {
    throw new Error("not able to read endpoint");
  }
}
 */

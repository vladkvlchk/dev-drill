import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/utils/queryKeys";
import { IFiltersResponse } from "@/utils/types";

export const useFilters = () => {
  const {
    data: filters,
    isPending,
    error,
  } = useQuery<IFiltersResponse, Error>({
    queryKey: [QueryKeys.Filters],
    queryFn: async (): Promise<IFiltersResponse> => {
      const response = await fetch("/api/filters");
      if (!response.ok) {
        throw new Error("Failed to fetch filters");
      }
      return response.json();
    },
  });

  const levels = filters?.levels.sort((a, b) => a.index - b.index) || [];
  const topics =
    filters?.topics.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    ) || [];
  const parsedFilters = [
    { filterName: "topics", items: topics },
    { filterName: "difficulties", items: levels },
  ];

  return { filters, isPending, error, parsedFilters };
};

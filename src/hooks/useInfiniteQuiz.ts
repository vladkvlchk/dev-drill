import { useInfiniteQuery } from "@tanstack/react-query";

import { ITasksResponse } from "@/utils/types";
import { useFiltersStore } from "@/store/filtersStore";

export function useInfiniteQuiz() {
  const { topics, difficulties } = useFiltersStore();

  return useInfiniteQuery<ITasksResponse, Error>({
    queryKey: ["tasks", topics, difficulties],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        page: String(pageParam),
      });

      if (topics.length) params.append("topicIds", topics.join(","));
      if (difficulties.length)
        params.append("levelIds", difficulties.join(","));

      const res = await fetch(`/api/tasks?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      return res.json();
    },
    initialPageParam: 1,
    getNextPageParam: () => true,
  });
}

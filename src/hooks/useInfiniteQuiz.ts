import { TasksResponse } from "@/utils/types";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useInfiniteQuiz() {
  return useInfiniteQuery<TasksResponse, Error>({
    queryKey: ["tasks"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(`/api/tasks?page=${pageParam}`);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      return res.json();
    },
    initialPageParam: 1,
    getNextPageParam: () => true,
  });
}

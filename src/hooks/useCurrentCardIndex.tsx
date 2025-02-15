"use client";

import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { QueryKeys } from "@/utils/queryKeys";

export function useCurrentCardIndex() {
  const queryClient = useQueryClient();

  const { data: currentCardIndex = 0 } = useQuery<number>({
    queryKey: [QueryKeys.CurrentQuizIndex],
    initialData: 0,
    staleTime: Infinity,
  });

  const setCurrentCardIndex = useCallback(
    (newIndex: number) => {
      queryClient.setQueryData([QueryKeys.CurrentQuizIndex], newIndex);
    },
    [queryClient]
  );

  return { currentCardIndex, setCurrentCardIndex };
}

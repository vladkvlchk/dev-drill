import { create } from "zustand";

interface FiltersState {
  topics: string[];
  difficulties: string[];
  types: string[];
  tempFilters: {
    topics: string[];
    difficulties: string[];
    types: string[];
  };
  setTempFilters: (filters: Partial<FiltersState["tempFilters"]>) => void;
  applyFilters: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  topics: [],
  difficulties: [],
  types: [],
  tempFilters: {
    topics: [],
    difficulties: [],
    types: [],
  },
  setTempFilters: (filters) =>
    set((state) => ({
      tempFilters: { ...state.tempFilters, ...filters },
    })),
  applyFilters: () => {
    set((state) => ({
      topics: state.tempFilters.topics,
      difficulties: state.tempFilters.difficulties,
      types: state.tempFilters.types,
    }));
  },
}));

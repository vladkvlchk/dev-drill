import { create } from "zustand";

interface FiltersState {
  selectedFilters: {
    topics: string[];
    difficulties: string[];
    tasktypes: string[];
  };
  toggleFilter: (
    filterType: keyof FiltersState["selectedFilters"],
    id: string
  ) => void;
  resetFilters: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  selectedFilters: {
    topics: [],
    difficulties: [],
    tasktypes: [],
  },

  toggleFilter: (filterType, id) =>
    set((state) => {
      const isSelected = state.selectedFilters[filterType].includes(id);
      return {
        selectedFilters: {
          ...state.selectedFilters,
          [filterType]: isSelected
            ? state.selectedFilters[filterType].filter((item) => item !== id)
            : [...state.selectedFilters[filterType], id],
        },
      };
    }),

  resetFilters: () =>
    set({
      selectedFilters: {
        topics: [],
        difficulties: [],
        tasktypes: [],
      },
    }),
}));

import { defineStore } from "pinia";

export const useDataStore = defineStore("dataStore", {
  state: () => ({
    isDataLoaded: false,
    showNewProductDialog: false,
    phones: [],
    brands: [],
    systems: [],
    screens: [],
    sortBySpecs: [],
    toggleSortBy: String,
    priceRange: [],
  }),

  getters: {
    getProductById: (state) => {
      return (id) => state.phones.find((product) => product.id === id);
    },
  },

  actions: {
    changeShowNewProductDialog(newValue) {
      this.showNewProductDialog = newValue;
    },
    setPriceRange(newValues) {
      this.priceRange = newValues;
    },
  },
});

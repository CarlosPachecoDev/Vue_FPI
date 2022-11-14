import { defineStore } from "pinia";

export const useDataStore = defineStore("dataStore", {
  state: () => ({
    isDataLoaded: false,
    showNewProductDialog: false,
    phones: [],
  }),

  getters: {
    getProductById: (state) => {
      return (id) => state.phones.find((product) => product.id === id);
    },
  },

  actions: {
    increment() {
      this.counter++;
    },
    changeShowNewProductDialog(newValue) {
      this.showNewProductDialog = newValue;
    },
  },
});

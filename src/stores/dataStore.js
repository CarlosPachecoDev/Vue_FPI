import { defineStore } from "pinia";

export const useDataStore = defineStore("dataStore", {
  state: () => ({
    // general
    showNewProductDialog: false,
    countShopping: 0,
    carritoItems: [],
    limitPorPage: 8,
    // data db
    phones: [],
    brands: [],
    systems: [],
    screens: [],
    // for sorting options
    isSortByRangeAndToggleActive: false,
    toggleSortBy: String,
    sortBySpecs: [],
    priceRange: [],
  }),

  getters: {
    getProductById: (state) => {
      return (id) => state.phones.find((product) => product.id === id);
    },
    getProducts: (state) => {
      return new Promise((resolve, rejected) => {
        resolve(state.phones);
      });
    },
  },

  actions: {
    changeShowNewProductDialog(newValue) {
      this.showNewProductDialog = newValue;
    },
    setPriceRange(newValues) {
      this.priceRange = newValues;
    },
    setItemCarrito(newItem) {
      this.carritoItems.push(newItem);
      this.countShopping++;
    },
    deleteItemCarrito(id) {
      const mapItemsID = this.carritoItems.map((item) => item.id);
      this.carritoItems.splice(mapItemsID.indexOf(id), 1);
      this.countShopping--;
    },
    deleteAllItemsCarrito() {
      this.carritoItems = [];
      this.countShopping = 0;
    },
  },
});

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },
  {
    path: "/details",
    component: () => import("layouts/DetailsLayout.vue"),
    children: [
      {
        path: "/details/producto:id",
        name: "ProductDetails",
        component: () => import("pages/ProductDetails.vue"),
      },
      {
        path: "/carro",
        name: "Carrito",
        component: () => import("pages/CarritoItems.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

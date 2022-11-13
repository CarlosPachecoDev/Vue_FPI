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
      {
        path: "/pagetwo",
        name: "two",
        component: () => import("pages/PageTwo.vue"),
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

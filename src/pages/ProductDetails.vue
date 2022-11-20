<template>
  <div class="container">
    <div
      class="row q-pt-lg container"
      :class="{
        'q-ml-md': $q.platform.is.desktop,
      }"
    >
      <div class="col-12 col-lg-6">
        <q-carousel
          v-model="slide"
          transition-prev="scale"
          transition-next="scale"
          swipeable
          animated
          height="54vh"
          class="img-product q-pa-md"
          :autoplay="4000"
          thumbnails
          infinite
        >
          <q-carousel-slide
            v-for="(value, index) in product.imagesURL"
            :key="index"
            :name="index + 1"
            :img-src="value"
            style="height: 100%; width: auto; max-width: 23rem; margin: 0 auto"
          >
          </q-carousel-slide>
        </q-carousel>
      </div>
      <div class="col-12 col-lg-6 q-pl-lg q-mt-md">
        <p
          class="bg-positive q-pl-xl q-pb-md"
          :class="{
            'model-desktop': $q.platform.is.desktop,
            'model-mobile': $q.platform.is.mobile,
          }"
        >
          {{ product.name }}
        </p>
        <p class="price q-mt-xl">
          Precio:
          <span class="text-weight-bold q-pl-md">$ {{ product.price }}</span>
        </p>
        <q-btn
          no-caps
          icon="fa-solid fa-cart-plus"
          class="button"
          padding="10px"
          label="Comprar"
          @click="useDataStore().setItemCarrito(product)"
        />
        <div
          class="row q-pt-md q-mt-xl bg-positive text-white"
          :class="{
            'seller-container': $q.platform.is.desktop,
            'seller-container-mobile': $q.platform.is.mobile,
          }"
        >
          <div class="col-6 text-center">
            <p class="q-pl-md q-pt-lg">
              <span class="text-weight-bold">Vendedor:</span>
              {{ product.seller_info.name }}
            </p>
          </div>
          <div class="col-6 text-center">
            <p class="q-pr-sm">
              <span class="text-weight-bold">Teléfono:</span>
              {{ product.seller_info.phone }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-center q-mt-xl">
      <div class="col-auto">
        <p class="title-description">Descripción</p>
      </div>
    </div>
    <div class="row q-mt-md justify-center q-gutter-x-xl">
      <div class="col-auto q-mb-xl">
        <q-card class="spec-container">
          <q-card-section horizontal class="desktop-only">
            <q-card-section>
              <q-list padding dense>
                <q-item
                  v-for="value in Object.entries(product.specs).slice(
                    0,
                    Object.keys(product.specs).length / 2 + 1
                  )"
                  :key="value[0]"
                  class="spec"
                >
                  <span class="text-weight-bold q-mr-md">
                    {{ value[0] }} :</span
                  >
                  {{ value[1] }}
                </q-item>
              </q-list>
            </q-card-section>
            <q-card-section>
              <q-list padding dense>
                <q-item
                  v-for="value in Object.entries(product.specs).slice(
                    Object.keys(product.specs).length / 2 + 1
                  )"
                  :key="value[0]"
                  class="spec"
                >
                  <span class="text-weight-bold q-mr-md">
                    {{ value[0] }} :</span
                  >
                  {{ value[1] }}
                </q-item>
              </q-list>
            </q-card-section>
          </q-card-section>
          <q-card-section class="mobile-only">
            <q-list padding dense>
              <q-item
                v-for="(value, key) in product.specs"
                :key="key"
                class="spec"
              >
                <span class="text-weight-bold q-mr-md"> {{ key }}:</span>
                {{ value }}
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
      <div
        class="col-12 col-lg-5"
        :class="{
          'q-mt-lg': $q.platform.is.mobile,
          'q-mb-lg': $q.platform.is.desktop,
        }"
      >
        <q-card
          :class="{
            'q-mt-xl bg-positive text-white': $q.platform.is.mobile,
          }"
        >
          <q-card-section class="q-pa-xl description">
            <p>
              {{ product.description }}
            </p>
          </q-card-section>
        </q-card>
      </div>

      <NewProduct v-if="showNewProductDialog" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useDataStore } from "src/stores/dataStore";
import { useRoute } from "vue-router";

import { storeToRefs } from "pinia";
import NewProduct from "src/components/NewProduct.vue";

const { showNewProductDialog } = storeToRefs(useDataStore());
const route = useRoute();
const slide = ref(1);
const product = ref({
  name: "",
  date: "",
  price: "",
  specs: {
    state: "",
    brand: "",
    model: "",
    screen: "",
    RAM: "",
    ROM: "",
    system: "",
  },
  description: "",
  seller_info: {
    name: "",
    phone: "",
  },
  imagesURL: [],
});
onMounted(() => {
  product.value = useDataStore().getProductById(route.params.id);
});

watch(
  () => route.params,
  (params) => {
    product.value = useDataStore().getProductById(params.id);
  }
);
</script>

<style scoped>
.img-product {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  border-radius: 71% 29% 63% 37% / 49% 50% 50% 51%;
  border: 3px solid #59ff00;
}
.container {
  background-color: #c7ceb0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23983fa1' fill-opacity='1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
}
.price {
  font-family: "Signika", sans-serif;
  font-size: 2rem;
}

.model-mobile {
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  color: #ffffff;
  font-family: "Signika", sans-serif;
  font-size: 1.5rem;
  padding: 30px 35px;
  text-shadow: #f125cc -5px 10px 12px;

  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
}
.model-desktop {
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  color: #ffffff;
  font-family: "Signika", sans-serif;
  font-size: 3rem;
  text-shadow: #f125cc -5px 10px 12px;

  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
}

.seller-container-mobile {
  font-family: "Signika", sans-serif;
  font-size: 1.2rem;
  border-radius: 100% 0% 100% 0% / 48% 47% 53% 52%;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
}

.seller-container {
  font-family: "Signika", sans-serif;
  font-size: 1.4rem;
  border-radius: 100% 0% 100% 0% / 48% 47% 53% 52%;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
}

.title-description {
  font-family: "Signika", sans-serif;
  font-size: 3rem;
  text-decoration: overline underline #f125cc double;
}

.name-seller,
.phone-seller {
  font-family: "Signika", sans-serif;
  font-size: 1.4rem;
}

.spec-container,
.description {
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
}

.spec,
.description {
  font-family: "Signika", sans-serif;
  font-size: 1.2rem;
}

.button {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  color: #000000;
  cursor: pointer;
  border: 3px solid;
  padding: 0.25em 0.5em;
  box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px,
    5px 5px 0px 0px;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button:active {
  box-shadow: 0px 0px 0px 0px;
  top: 5px;
  left: 5px;
  color: #d30492;
}

@media (min-width: 768px) {
  .button {
    padding: 0.25em 0.75em;
  }
}
</style>

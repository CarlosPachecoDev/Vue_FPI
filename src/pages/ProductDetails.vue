<template>
  <div
    class="row q-mt-lg"
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
        height="50vh"
        class="shadow-1 rounded-borders"
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
    <div class="col-12 col-lg-6 q-px-md q-mt-md">
      <p class="model bg-positive q-pl-xl q-pb-md">{{ product.name }}</p>
      <p class="price q-mt-xl">
        Precio:
        <span class="text-weight-bold q-pl-md">$ {{ product.price }}</span>
      </p>
      <q-btn no-caps icon="fa-solid fa-cart-plus" class="button" padding="10px">
        Comprar</q-btn
      >
      <div class="row q-pt-md q-mt-xl seller-container bg-positive text-white">
        <div class="col-6 text-center">
          <p class="name-seller q-pl-md q-pt-lg">
            <span class="text-weight-bold">Vendedor:</span>
            {{ product.seller_info.name }}
          </p>
        </div>
        <div class="col-6 text-center">
          <p class="phone-seller q-pr-sm">
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
    <div class="col-auto">
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
                {{ value[0] }} : {{ value[1] }}
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
                {{ value[0] }} : {{ value[1] }}
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
              {{ key }} : {{ value }}
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
    <div
      class="col-12 col-lg-5"
      :class="{
        'q-mt-lg': $q.platform.is.mobile,
      }"
    >
      <q-card>
        <q-card-section class="q-pa-lg description">
          <p>
            {{ product.description }}
          </p>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDataStore } from "src/stores/dataStore";
import { useRoute } from "vue-router";

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
  product.value = null;
  product.value = useDataStore().getProductById(useRoute().params.id);
});
</script>

<style scoped>
.price {
  font-family: "Signika", sans-serif;
  font-size: 2rem;
}
.model {
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  color: #ffffff;
  font-size: 3rem;
  font-family: "Signika", sans-serif;

  text-shadow: #f125cc -5px 10px 12px;

  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
}

.seller-container {
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

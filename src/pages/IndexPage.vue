<template>
  <q-page>
    <SortingOptionsMobile class="mobile-only" />
    <SortingOptionsDesktop class="desktop-only" />

    <!--CARDS DE ARTÍCULOS-->
    <div
      class="row q-mt-md q-gutter-y-md"
      :class="{
        'q-ml-xl': $q.platform.is.desktop,
      }"
    >
      <div
        class="col-6 col-lg-3"
        :class="{
          'q-px-xs': $q.platform.is.mobile,
          'q-px-md': $q.platform.is.desktop,
        }"
        v-for="phone in LPhones"
        :key="phone.id"
      >
        <q-card class="shadow-24">
          <q-card-section>
            <q-img :src="phone.imagesURL[0]">
              <div class="absolute-bottom">
                <div class="text-subtitle1 text-weight-bolder">
                  {{ phone.name }}
                </div>
                <div class="text-subtitle2">$ {{ phone.price }}</div>
              </div>
            </q-img>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn
              no-caps
              stack
              flat
              padding="8px"
              icon="fa-solid fa-cart-plus"
              color="purple-13"
              dense
              :ripple="{ color: 'yellow' }"
            >
              Comprar</q-btn
            >
            <q-btn
              no-caps
              stack
              flat
              padding="8px"
              icon="fa-solid fa-circle-info"
              color="purple-13"
              dense
              :ripple="{ color: 'yellow' }"
              :to="'/details/producto' + phone.id"
            >
              Detalles {{ productos }}</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div class="q-pa-lg flex flex-center q-mt-xl">
      <q-pagination
        v-model="current"
        color="purple-13"
        :max="5"
        boundary-links
      />
    </div>
    <NewProduct v-if="showNewProductDialog" />
  </q-page>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { useDataStore } from "stores/dataStore";
import { storeToRefs } from "pinia";
import NewProduct from "src/components/NewProduct.vue";
import SortingOptionsDesktop from "src/components/Desktop/SortingOptionsDesktop.vue";
import SortingOptionsMobile from "src/components/Mobile/SortingOptionsMobile.vue";

const { showNewProductDialog } = storeToRefs(useDataStore());
let current = ref(1);
let LPhones = ref([]);
const store = useDataStore();
let priceRangeStorage = [];
onMounted(() => {
  LPhones.value = store.phones;
});

watch(
  () => store.sortBySpecs,
  (sortBySpecs) => {
    const sortByArray = Object.values(sortBySpecs);
    if (sortByArray.length) {
      LPhones.value = store.phones.filter(
        (phone) =>
          sortByArray.includes(phone.specs.Marca) ||
          sortByArray.includes(phone.specs.Sistema.split(" ")[0]) ||
          sortByArray.includes(phone.specs.Pantalla)
      );
    } else {
      LPhones.value = store.phones;
    }
  }
);

function isValidPrice(phone) {
  return (
    phone.price >= priceRangeStorage[0] && phone.price <= priceRangeStorage[1]
  );
}

function sortByPrice() {
  LPhones.value = store.phones.filter(isValidPrice);
}

watch(
  () => useDataStore().priceRange,
  (newValues) => {
    priceRangeStorage = Object.values(newValues);
    sortByPrice();
  }
);
</script>

<style scoped></style>

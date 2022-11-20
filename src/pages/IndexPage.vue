<template>
  <q-page>
    <SortingOptionsMobile
      class="mobile-only"
      @sort-by-toggle-value="sortByToggle"
    />
    <SortingOptionsDesktop
      class="desktop-only"
      @sort-by-toggle-value="sortByToggle"
      @reset-values="getProductsDB"
    />

    <!--CARDS DE ARTÍCULOS-->
    <div
      class="row q-mt-md q-gutter-y-md"
      :class="{
        'q-ml-xl': $q.platform.is.desktop,
      }"
    >
      <div
        class="col-6 col-lg-3 card-container q-mb-md"
        :class="{
          'q-px-xs': $q.platform.is.mobile,
          'q-px-md': $q.platform.is.desktop,
        }"
        v-for="phone in LPhones"
        :key="phone.id"
      >
        <q-card
          class="shadow-24"
          :class="{
            'card-product': $q.platform.is.desktop,
          }"
        >
          <div
            :class="{
              'content-card': $q.platform.is.desktop,
            }"
          >
            <q-card-section
              :class="{
                'img-card': $q.platform.is.desktop,
              }"
            >
              <q-img
                :src="phone.imagesURL[0]"
                :class="{
                  img: $q.platform.is.desktop,
                }"
              >
                <div class="absolute-bottom">
                  <div
                    class="text-weight-bolder"
                    :class="{
                      'text-caption': $q.platform.is.mobile,
                      'text-subtitle1': $q.platform.is.desktop,
                    }"
                  >
                    {{ phone.name }}
                  </div>
                  <div
                    :class="{
                      'text-caption': $q.platform.is.mobile,
                      'text-subtitle2': $q.platform.is.desktop,
                    }"
                  >
                    $ {{ phone.price }}
                  </div>
                </div>
              </q-img>
            </q-card-section>
            <q-card-actions
              align="center"
              :class="{
                'buttoms-card-container': $q.platform.is.desktop,
                'bg-positive': $q.platform.is.mobile,
              }"
            >
              <q-btn
                no-caps
                stack
                flat
                padding="8px"
                icon="fa-solid fa-cart-plus"
                color="white"
                dense
                :ripple="{ color: 'yellow' }"
                :class="{
                  buttom: $q.platform.is.desktop,
                }"
                @click="useDataStore().setItemCarrito(phone)"
              >
                Comprar</q-btn
              >
              <q-btn
                no-caps
                stack
                flat
                padding="8px"
                icon="fa-solid fa-circle-info"
                color="white"
                dense
                :ripple="{ color: 'yellow' }"
                :to="'/details/producto' + phone.id"
                :class="{
                  buttom: $q.platform.is.desktop,
                }"
              >
                Detalles {{ productos }}</q-btn
              >
            </q-card-actions>
          </div>
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
let previusValues = [];
let LPhones = ref([]);
const store = useDataStore();
let priceRangeStorage = [];
const props = defineProps({
  search: String,
});

onMounted(() => {
  store.getProducts.then((data) => {
    LPhones.value = data;
  });
});

const searInput = computed(() => {
  return props.search;
});

watch(searInput, (newValue) => {
  if (newValue.trim()) {
    const results = LPhones.value.filter((phone) =>
      phone.name.toLowerCase().includes(props.search.toLowerCase())
    );
    if (results.length) {
      LPhones.value = results;
    } else {
      store.getProducts.then((data) => {
        LPhones.value = data;
      });
    }
  } else {
    store.getProducts.then((data) => {
      LPhones.value = data;
    });
  }
});

watch(
  () => store.sortBySpecs,
  (sortBySpecs) => {
    const sortByArray = Object.values(sortBySpecs);
    if (sortByArray.length) {
      store.getProducts.then((data) => {
        LPhones.value = data.filter(
          (phone) =>
            sortByArray.includes(phone.specs.Marca) ||
            sortByArray.includes(phone.specs.Sistema.split(" ")[0]) ||
            sortByArray.includes(Math.round(phone.specs.Pantalla))
        );

        previusValues = LPhones.value;
      });
    } else {
      store.getProducts.then((data) => {
        LPhones.value = data;

        previusValues = LPhones.value;
      });
    }
  }
);

function isValidPrice(phone) {
  return (
    phone.price >= priceRangeStorage[0] && phone.price <= priceRangeStorage[1]
  );
}

function sortByPriceRange() {
  LPhones.value = store.phones.filter(isValidPrice);
  previusValues = LPhones.value;
}

function getProductsDB() {
  store.getProducts.then((data) => {
    LPhones.value = data;
  });
}

function sortByToggle(sortType) {
  if (sortType === "price") {
    LPhones.value = LPhones.value.slice().sort((a, b) => a.price - b.price);
  } else if (sortType === "date") {
    LPhones.value = LPhones.value.slice().sort((a, b) => b.date - a.date);
  } else {
    store.getProducts.then((data) => {
      LPhones.value = previusValues;
    });
  }
}

watch(
  () => useDataStore().priceRange,
  (newValues) => {
    priceRangeStorage = Object.values(newValues);
    sortByPriceRange();
  }
);
</script>

<style scoped>
.card-product {
  border-bottom: 12px solid #ffffff;
}
.buttoms-card-container {
  border-radius: 0px 0px 22px 22px;
  transition: 0.5s;
}
.content-card .img-card {
  transform: translateY(63px);
  transition: 0.3s;
}

.buttom {
  transform: translateY(10px);
  transition: 0.6s;
  opacity: 0;
}
.card-product:hover {
  border-bottom: 12px groove #d202e9;
  border-radius: 0px 0px 30px 30px;
}
.card-product:hover .img-card {
  transform: translateY(0px);
}
.card-product:hover .buttom {
  transform: translateY(0px);
  opacity: 1;
}

.card-product:hover .buttoms-card-container {
  background-color: rgba(72, 70, 109, 0.899);
}
</style>

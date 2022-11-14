<template>
  <q-page>
    <div class="row justify-center q-gutter-x-md mobile-only q-mt-md">
      <div class="col-8">
        <q-select
          rounded
          clearable
          behavior="menu"
          outlined
          v-model="sort_by"
          :options="options"
          label="Ordenar por"
        />
      </div>
      <div class="col-2">
        <q-btn-dropdown
          color="primary"
          :menu-offset="[0, 30]"
          dense
          fab-mini
          dropdown-icon="filter_alt"
          no-icon-animation
        >
          <q-list style="width: 200px">
            <SortingOptionsCard />
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>
    <div class="row q-mt-md q-ml-xl justify-evenly items-center desktop-only">
      <div class="col-5">
        <div class="row q-gutter-x-md price-container bg-purple-13 text-white">
          <div class="col-auto self-center text-h6">
            <span>Precio:</span>
          </div>
          <div class="col-4">
            <q-input
              dark
              type="number"
              rounded
              outlined
              bg-color="positive"
              v-model.number="precio_desde"
              label="Desde"
              label-color="white"
            >
              <template v-slot:prepend>
                <q-icon name="attach_money" color="white" />
              </template>
            </q-input>
          </div>
          <div class="col-4">
            <q-input
              dark
              type="number"
              rounded
              outlined
              bg-color="positive"
              v-model.number="precio_hasta"
              label="Hasta"
              label-color="white"
            >
              <template v-slot:prepend>
                <q-icon name="attach_money" color="white" />
              </template>
            </q-input>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div
          class="row q-gutter-x-md sort-by-container bg-purple-13 text-white"
        >
          <div class="col-auto self-center text-h6">
            <span>Ordenar por:</span>
          </div>
          <div class="col-auto">
            <q-btn-toggle
              no-caps
              clearable
              color="purple-2"
              text-color="black"
              v-model="togleSort"
              toggle-color="positive"
              :options="[
                { label: 'Fecha', value: 'date' },
                { label: 'Precio', value: 'price' },
              ]"
            />
          </div>
        </div>
      </div>
    </div>

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
import SortingOptionsCard from "src/components/SortingOptionsCard.vue";
const { showNewProductDialog } = storeToRefs(useDataStore());

const precio_desde = ref(0);
const precio_hasta = ref(0);
const togleSort = ref(null);
const sort_by = ref("");
const options = ref(["Precio", "XXXX", "XXXX"]);
let current = ref(1);

let LPhones = ref([]);
const store = useDataStore();

onMounted(() => {
  LPhones.value = store.phones;
});

watch(
  () => store.sortBy,
  (sortBy) => {
    const sortByArray = Object.values(sortBy);
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
</script>

<style scoped>
.price-container {
  border: 2px solid black;
  margin: 25px 0 60px 0;
  padding: 10px 10px 10px 40px;
  border-radius: 90% 10% 91% 9% / 10% 89% 11% 90%;
}

.sort-by-container {
  border: 2px solid black;
  margin: 25px 0 60px 0;
  padding: 20px 0px 20px 10px;
  border-radius: 90% 10% 91% 9% / 10% 89% 11% 90%;
}
</style>

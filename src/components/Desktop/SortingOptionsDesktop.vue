<template>
  <div class="row q-mt-md q-ml-xl justify-evenly items-center">
    <div class="col-5">
      <div
        class="row q-gutter-x-md price-container bg-purple-13 text-white items-center"
      >
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
            @update:model-value="sortByPriceRange"
            :rules="[(val) => val >= 0 || 'Ingresa cantidades positivas']"
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
            @update:model-value="sortByPriceRange"
            :rules="[(val) => val >= 0 || 'Ingresa cantidades positivas']"
          >
            <template v-slot:prepend>
              <q-icon name="attach_money" color="white" />
            </template>
          </q-input>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="row q-gutter-x-md sort-by-container bg-purple-13 text-white">
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
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useDataStore } from "stores/dataStore";
const emit = defineEmits(["resetValues", "sortByToggleValue"]);
let previousPrices = [];
const precio_desde = ref("");
const precio_hasta = ref("");
const togleSort = ref(null);

function sortByPriceRange(value) {
  if (
    precio_desde.value >= 0 &&
    precio_desde.value !== "" &&
    precio_hasta.value >= 0 &&
    precio_hasta.value !== ""
  ) {
    useDataStore().priceRange = [precio_desde.value, precio_hasta.value];
    useDataStore().isSortByRangeAndToggleActive = true;
  }

  if (!precio_desde.value || !precio_hasta.value) {
    emit("resetValues");
    useDataStore().isSortByRangeAndToggleActive = false;
  }
}

watch(togleSort, (newValue) => {
  emit("sortByToggleValue", newValue);
});
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

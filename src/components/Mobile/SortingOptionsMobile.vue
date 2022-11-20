<template>
  <div class="row justify-evenly q-mt-md">
    <div class="col-9">
      <div class="row q-gutter-x-lg sort-by-container bg-purple-13 text-white">
        <div class="col-2 self-center text-subtitle1 text-center">
          <span>Ordenar por:</span>
        </div>
        <div class="col-auto self-center">
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
    <div class="col-1 self-center">
      <q-btn-dropdown
        color="purple-13"
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
</template>

<script setup>
import { ref, watch } from "vue";
import SortingOptionsCard from "src/components/SortingOptionsCard.vue";

const emit = defineEmits(["sortByToggleValue"]);
const togleSort = ref(null);

watch(togleSort, (newValue) => {
  emit("sortByToggleValue", newValue);
});
</script>

<style scoped>
.sort-by-container {
  border: 2px solid black;
  margin: 2px 0 10px 0;
  padding: 5px 0px 5px 0px;
  border-radius: 90% 10% 91% 9% / 10% 89% 11% 90%;
}
</style>

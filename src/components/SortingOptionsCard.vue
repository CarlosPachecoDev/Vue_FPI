<template>
  <q-card
    class="q-mt-lg bg-white"
    :class="{
      'options-container ': $q.platform.is.desktop,
    }"
    bordered
    v-for="(value, key) in optionsFilter"
    :key="key"
  >
    <q-card-section class="bg-purple-13">
      <div class="text-subtitle2 text-weight-bold text-white">
        {{ key }}
      </div>
    </q-card-section>

    <q-separator color="white" />
    <q-card-section>
      <q-list dense>
        <q-item v-for="(option, index) in value" :key="key + index">
          <q-item-section>
            <q-checkbox
              :val="option.name"
              right-label
              v-model="sortBy"
              :label="option.name"
              checked-icon="task_alt"
              color="teal"
              unchecked-icon="radio_button_unchecked"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useDataStore } from "src/stores/dataStore";
import { ref, watch } from "vue";

const sortBy = ref([]);

watch(sortBy, () => {
  useDataStore().sortBySpecs = Object.values(sortBy.value);
});

const optionsFilter = ref({
  Marca: useDataStore().brands,
  Sistema: useDataStore().systems,
  Pantalla: useDataStore().screens,
});
</script>

<style scoped>
.options-container {
  box-shadow: rgb(38, 57, 77) 0px 15px 15px -10px;
}
</style>

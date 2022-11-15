<template>
  <div class="row justify-center q-gutter-x-md q-mt-md">
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
</template>

<script setup>
import { ref } from "vue";
import SortingOptionsCard from "src/components/SortingOptionsCard.vue";
const sort_by = ref("");
const options = ref(["Precio", "XXXX", "XXXX"]);
</script>

<style scoped></style>

<template>
  <q-select
    dense
    rounded
    outlined
    behavior="menu"
    transition-show="flip-up"
    transition-hide="scale"
    label-color="purple-13"
    bg-color="white"
    color="purple-13"
    v-model="search"
    use-input
    options-dense
    :menu-offset="[10, 10]"
    hide-selected
    input-debounce="0"
    :options="options"
    @filter="filterFn"
    hide-dropdown-icon
    popup-content-style="border-top-left-radius: 15px 50px;
  border-top-right-radius: 15px 15px;
  border-bottom-left-radius: 80px 19px;
  border-bottom-right-radius: 80px 19px;
  border: solid 3px #6e7491;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No se han encontrado resultados
        </q-item-section>
      </q-item>
    </template>
    <template v-slot:append>
      <q-icon name="search" @click.stop class="boxIcon" />
    </template>
    <template v-slot:option="scope">
      <q-item
        @click="goToProduct(scope.opt)"
        v-bind="scope.itemProps"
        v-on="scope.itemEvents"
        class="q-pt-sm"
      >
        <q-item-section avatar>
          <q-avatar square size="7rem">
            <img :src="scope.opt.urlImage" />
            <q-badge floating color="purple-13">{{ scope.opt.state }}</q-badge>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-subtitle1">
            {{ scope.opt.name }}</q-item-label
          >
          <q-item-label class="text-subtitle2">
            $
            {{
              new Intl.NumberFormat("en-US").format(scope.opt.price)
            }}</q-item-label
          >
        </q-item-section>
      </q-item>
      <q-separator inset />
    </template>
  </q-select>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, watch } from "vue";
import { useDataStore } from "src/stores/dataStore";
import { useRouter } from "vue-router";
const router = useRouter();
const search = ref("");
let products = [];
let options = ref([]);
const contentStyle = ref({
  backgroundColor: "rgba(0,0,0,0.02)",
  color: "#555",
});

const contentActiveStyle = ref({
  backgroundColor: "#eee",
  color: "black",
});

const thumbStyle = ref({
  right: "2px",
  borderRadius: "5px",
  backgroundColor: "#027be3",
  width: "5px",
  opacity: "0.75",
});

onMounted(() => {
  useDataStore().getProducts.then((data) => {
    products = data;
  });
});

function addOption(product) {
  options.value.push({
    id: product.id,
    price: product.price,
    name: product.name,
    urlImage: product.imagesURL[0],
    state: product.specs.Estado,
  });
}

function filterFn(val, update) {
  if (val === "") {
    update(() => {
      options.value = [];
    });
    return;
  }

  update(() => {
    options.value = [];
    products
      .filter((product) =>
        product.name.toLowerCase().includes(val.toLowerCase())
      )
      .forEach((product) => addOption(product));
  });
}

function goToProduct(value) {
  router.push({ name: "ProductDetails", params: { id: value.id } });
}
</script>

<style></style>

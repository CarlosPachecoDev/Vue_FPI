<template>
  <div class="row">
    <q-list class="full-width full-height" v-if="LCarritoItems.length">
      <q-item class="bg-positive">
        <q-item-section>
          <q-item-label
            class="text-white"
            :class="{
              'header-list': $q.platform.is.desktop,
              'text-h6': $q.platform.is.mobile,
            }"
            >Tienda Cellphone</q-item-label
          >
          <q-item-label
            class="text-white"
            :class="{
              'sub-list': $q.platform.is.desktop,
              'text-caption': $q.platform.is.mobile,
            }"
            >"Facilitando la comunicación"</q-item-label
          >
        </q-item-section>

        <q-item-section side top>
          <q-item-label
            class="text-white"
            :class="{
              'text-h6 q-mt-md': $q.platform.is.desktop,
              'text-subtitle2': $q.platform.is.mobile,
            }"
            >Fecha:
            {{ new Date(Date.now()).toLocaleDateString() }}</q-item-label
          >
        </q-item-section>
      </q-item>

      <q-item-label header class="q-my-lg text-h6"
        >Productos añadidos al carrito</q-item-label
      >

      <div v-if="$q.platform.is.mobile">
        <div
          v-for="(item, index) in LCarritoItems"
          :key="index"
          class="q-pt-lg"
          ref="item"
        >
          <q-item>
            <q-item-section avatar>
              <q-avatar size="7rem" square class="shadow-8 rounded-borders">
                <img :src="item.imagesURL[0]" />
                <q-badge floating color="purple-13" class="text-subtitle2">{{
                  item.specs.Estado
                }}</q-badge>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <div class="row">
                <div class="col">
                  <q-item-label class="text-subtitle1 text-weight-bolder">
                    {{ item.name }}</q-item-label
                  >
                  <q-item-label class="text-subtitle2">
                    $
                    {{
                      new Intl.NumberFormat("en-US").format(item.price)
                    }}</q-item-label
                  >
                  <div class="q-pt-md q-gutter-x-xs">
                    <q-btn
                      color="purple-13"
                      size="15px"
                      flat
                      dense
                      round
                      icon="fa-solid fa-circle-info"
                      :to="'/details/producto' + item.id"
                    />
                    <q-btn
                      color="purple-13"
                      size="15px"
                      flat
                      dense
                      round
                      icon="delete"
                      @click="deleteItem(index)"
                    />
                  </div>
                </div>
              </div>
            </q-item-section>
          </q-item>
          <q-separator inset />
        </div>
      </div>

      <div v-if="$q.platform.is.desktop">
        <div
          v-for="(item, index) in LCarritoItems"
          :key="index"
          class="item-carrito q-pt-lg"
          ref="item"
        >
          <q-item inset-level="1">
            <q-item-section avatar>
              <q-avatar square class="shadow-8 rounded-borders img-container">
                <img :src="item.imagesURL[0]" class="q-pa-sm" />
                <q-badge floating color="purple-13" class="text-subtitle2">{{
                  item.specs.Estado
                }}</q-badge>
              </q-avatar>
            </q-item-section>
            <q-item-section class="q-ml-md">
              <div class="row">
                <div class="col">
                  <q-item-label class="text-h5"> {{ item.name }}</q-item-label>
                  <q-item-label class="text-h6">
                    $
                    {{
                      new Intl.NumberFormat("en-US").format(item.price)
                    }}</q-item-label
                  >
                  <div class="q-pt-md q-gutter-x-md">
                    <q-btn
                      color="purple-13"
                      size="20px"
                      flat
                      dense
                      round
                      icon="fa-solid fa-circle-info"
                      :to="'/details/producto' + item.id"
                    >
                      <q-tooltip
                        class="bg-primary text-subtitle2 text-weight-bolder text-grey-8"
                      >
                        Ver detalles del producto
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      color="purple-13"
                      size="20px"
                      flat
                      dense
                      round
                      icon="delete"
                      @click="deleteItem(index)"
                    >
                      <q-tooltip
                        class="bg-primary text-subtitle2 text-weight-bolder text-grey-8"
                        id="tooltip-delete"
                      >
                        Eliminar producto del carrito
                      </q-tooltip>
                    </q-btn>
                  </div>
                </div>
              </div>
            </q-item-section>
          </q-item>
          <q-separator inset />
        </div>
      </div>
    </q-list>
    <q-img
      src="src/assets/noresults.jpg"
      style="width: 100%; max-width: 700px; height: auto; margin: 0 auto"
      v-if="!LCarritoItems.length"
    >
      <div
        class="absolute-top text-center"
        :class="{
          'text-h4': $q.platform.is.desktop,
          'text-subtitle2': $q.platform.is.mobile,
        }"
      >
        No hay productos añadidos al carrito
      </div>
    </q-img>
  </div>

  <div
    class="row justify-center bg-positive q-py-sm fixed-bottom q-gutter-x-xl"
    v-if="LCarritoItems.length"
  >
    <div class="col-2">
      <q-btn
        size="1rem"
        color="primary"
        text-color="grey-8"
        label="Comprar"
        @click="realizarCompra"
        no-caps
      />
    </div>
    <div class="col-2">
      <q-btn
        size="1rem"
        color="primary"
        text-color="grey-8"
        label="Salir"
        @click="close"
        no-caps
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDataStore } from "src/stores/dataStore";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const $q = useQuasar();
const router = useRouter();
const store = useDataStore();
let LCarritoItems = ref([]);
const item = ref(null);

onMounted(() => {
  LCarritoItems.value = [...store.carritoItems];
});

function close() {
  router.go(-1);
}

function realizarCompra() {
  $q.notify({
    color: "primary",
    icon: "task_alt",
    iconSize: "36px",
    textColor: "grey-10",
    message: "Compra realizada exitosamente",
    caption: "Gracias por preferirnos. 😊",
    classes: "absolute-bottom-center",
  });
  store.deleteAllItemsCarrito();
  router.go(-1);
}

function deleteItem(index) {
  const element = item.value[index];
  const id = element.dataset.id;
  element.classList.add("hide");
  setTimeout(() => {
    const tooltip = document.getElementById("tooltip-delete");
    if (tooltip) {
      tooltip.remove();
    }
    item.value[index].remove();
    deleteItemStore(id);
  }, 200);
}

function deleteItemStore(idCopy) {
  useDataStore().deleteItemCarrito(idCopy);
}
</script>

<style scoped>
.header-list {
  color: #ffffff;
  font-family: "Raleway", sans-serif;
  font-size: 62px;
  font-weight: 800;
  line-height: 72px;
  margin: 0 0 24px;
}

.sub-list {
  color: #f8f8f8;
  font-family: "Raleway", sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 32px;
  margin: 0 0 24px;
}

.img-container {
  height: 15rem;
  width: 100%;
  transition: 0.5s;
}
.item-carrito {
  transform: scale(0.9);
  transition: all 0.4s ease-out;
}

.hide {
  opacity: 0.2;
  transition: 0.2s ease;
}

.item-carrito.hide {
  opacity: 0.2;
  transition: 0.2s ease;
}
.item-carrito:hover {
  margin: 20px 0;
  background-color: rgba(185, 185, 185, 0.395);
  transform: scaleX(1) scaleY(1.1);
}

.item-carrito:hover .img-container {
  height: 16rem;
  background-color: #ffffff;
}
</style>

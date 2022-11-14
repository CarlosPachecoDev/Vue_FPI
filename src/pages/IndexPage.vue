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
            <q-card flat class="options-container bg-white">
              <q-card-section class="bg-info">
                <div class="text-subtitle2 text-weight-bold text-white">
                  Marca
                </div>
              </q-card-section>

              <q-separator color="white" />
              <q-card-section>
                <q-list dense>
                  <q-item>
                    <q-item-section>
                      <q-checkbox
                        right-label
                        v-model="samsung"
                        label="Samsung"
                        checked-icon="task_alt"
                        color="teal"
                        unchecked-icon="radio_button_unchecked"
                      />
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-checkbox
                        right-label
                        v-model="huawei"
                        label="Huawei"
                        checked-icon="task_alt"
                        color="teal"
                        unchecked-icon="radio_button_unchecked"
                      />
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar top>
                      <q-checkbox
                        right-label
                        v-model="nokia"
                        label="Nokia"
                        checked-icon="task_alt"
                        color="teal"
                        unchecked-icon="radio_button_unchecked"
                      />
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar top>
                      <q-checkbox
                        right-label
                        v-model="iphone"
                        label="iPhone"
                        checked-icon="task_alt"
                        color="teal"
                        unchecked-icon="radio_button_unchecked"
                      />
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar top
                      ><q-checkbox
                        right-label
                        v-model="xiaomi"
                        label="Xiaomi"
                        checked-icon="task_alt"
                        color="teal"
                        unchecked-icon="radio_button_unchecked"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
            <q-card class="options-container" flat>
              <q-card-section class="bg-info">
                <div class="text-subtitle2 text-weight-bold text-white">
                  Sistema
                </div>
              </q-card-section>

              <q-separator color="white" />
              <q-card-section>
                <q-list dense>
                  <q-item>
                    <q-item-section>
                      <q-checkbox
                        right-label
                        v-model="android"
                        label="Android"
                        checked-icon="task_alt"
                        color="teal"
                        unchecked-icon="radio_button_unchecked"
                      />
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-checkbox
                        right-label
                        v-model="windows"
                        label="Windows"
                        checked-icon="task_alt"
                        color="teal"
                        unchecked-icon="radio_button_unchecked"
                      />
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar top>
                      <q-checkbox
                        right-label
                        v-model="ios"
                        label="iOS"
                        checked-icon="task_alt"
                        color="teal"
                        unchecked-icon="radio_button_unchecked"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
            <q-card class="options-container" flat>
              <q-card-section class="bg-info">
                <div class="text-subtitle2 text-weight-bold text-white">
                  Pantalla
                </div>
              </q-card-section>

              <q-separator color="white" />
              <q-card-section>
                <q-list dense>
                  <q-item>
                    <q-item-section>
                      <q-checkbox
                        right-label
                        v-model="six_inch"
                        label="6.0"
                        checked-icon="task_alt"
                        color="teal"
                        unchecked-icon="radio_button_unchecked"
                      />
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-checkbox
                        right-label
                        v-model="five_dot_inch"
                        label="5.5"
                        checked-icon="task_alt"
                        color="teal"
                        unchecked-icon="radio_button_unchecked"
                      />
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar top>
                      <q-checkbox
                        right-label
                        v-model="five_inch"
                        label="5"
                        checked-icon="task_alt"
                        color="teal"
                        unchecked-icon="radio_button_unchecked"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-list>
        </q-btn-dropdown>
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
              Detalles</q-btn
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
import { ref, watch } from "vue";
import { getProducts } from "src/boot/db";
import { useDataStore } from "stores/dataStore";
import { storeToRefs } from "pinia";
import NewProduct from "src/components/NewProduct.vue";
const { showNewProductDialog } = storeToRefs(useDataStore());

let sort_by = ref("");
const options = ref(["Precio", "XXXX", "XXXX"]);
let current = ref(1);

let LPhones = ref([]);
const store = useDataStore();
watch(
  () => store.isDataLoaded,
  (isDataLoaded) => {
    LPhones.value = store.phones;
  }
);
</script>

<style scoped>
.container-img {
  width: 10vw;
  max-width: 19vw;
  margin: auto;
}

.img {
  width: 100%;
}
</style>

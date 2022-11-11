<template>
  <q-page padding>
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
            <q-card class="options-container q-mt-lg bg-white" bordered>
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
            <q-card class="options-container q-mt-lg" bordered>
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
            <q-card class="options-container q-mt-lg" bordered>
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
  </q-page>
</template>

<script setup>
import { ref } from "vue";
let sort_by = ref("");
const options = ref(["Precio", "XXXX", "XXXX"]);
const thumbStyle = ref({
  right: "2px",
  borderRadius: "5px",
  backgroundColor: "#01d5ff",
  width: "5px",
  opacity: 0.75,
});
</script>

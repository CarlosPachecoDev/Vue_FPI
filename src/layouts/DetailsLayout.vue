<template>
  <q-layout view="hHh lpR lFf" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-primary text-black" height-hint="98">
      <div class="row items-center">
        <div
          :class="{
            'col-1': $q.platform.is.mobile,
            'col-md-3 col-lg-2': $q.platform.is.desktop,
          }"
        >
          <q-btn
            flat
            round
            dense
            icon="menu"
            class="mobile-only"
            @click="menu_mobile = !menu_mobile"
          />
          <q-toolbar v-if="!$q.screen.lt.sm" class="desktop-only">
            <q-toolbar-title>
              <q-avatar>
                <q-icon name="ion-phone-portrait" size="2rem"></q-icon>
              </q-avatar>
              Tienda <span class="text-weight-bold"> Cellphone</span>
            </q-toolbar-title>
          </q-toolbar>
        </div>
        <div
          :class="{
            'col-10 col-sm-8 col-md-8': $q.platform.is.mobile,
            'col-md-4 col-lg-5': $q.platform.is.desktop,
          }"
        >
          <InputSearch />
        </div>
        <div class="col-md-3 col-lg-2 desktop-only">
          <q-tabs
            active-bg-color="positive"
            active-color="white"
            no-caps
            indicator-color="cyan-6"
            class="q-pl-md q-pr-xl"
          >
            <q-route-tab to="/" label="Inicio" />
          </q-tabs>
        </div>
        <div
          :hidden="$q.screen.lt.sm"
          class="q-gutter-x-md"
          :class="{
            'q-pl-md': $q.screen.lt.md,
            'col-sm-3 q-pl-md': $q.platform.is.mobile,
            'col-md-2': $q.platform.is.desktop,
          }"
        >
          <q-btn
            round
            color="positive"
            icon="add"
            @click="useDataStore().changeShowNewProductDialog(true)"
          />
          <q-btn round color="positive" icon="shopping_cart" to="/carro">
            <q-badge color="purple-13" floating rounded v-if="countShopping">{{
              countShopping
            }}</q-badge>
          </q-btn>
        </div>
      </div>
    </q-header>
    <!-- MENU MOBILE-->
    <q-drawer
      v-model="menu_mobile"
      side="left"
      elevated
      bordered
      overlay
      class="mobile-only bg-positive text-white"
    >
      <q-list>
        <q-item class="bg-primary text-purple-13">
          <q-item-section avatar>
            <q-icon color="purple-13" name="ion-phone-portrait" size="3rem" />
          </q-item-section>
          <q-item-section>
            <span class="text-h6 text-weight-bold">Tienda</span>
            <span class="text-h5"> Cellphone</span>
          </q-item-section>
        </q-item>
        <q-separator color="white" size="3px" class="shadow-9 q-mb-md" />

        <div class="q-mt-lg" style="margin-bottom: 12px">
          <q-item to="/" clickable v-ripple class="text-white">
            <q-item-section avatar top>
              <q-avatar class="ico" icon="fa-solid fa-house-user" />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">Inicio</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator color="blue-grey-6" class="q-mt-xs" />
        </div>

        <div class="q-mt-lg" style="margin-bottom: 12px">
          <q-item
            clickable
            @click="useDataStore().changeShowNewProductDialog(true)"
            exact-active-class="q-py-md q-mb-sm active-item"
          >
            <q-item-section avatar top>
              <q-avatar class="ico" icon="fa-solid fa-add" />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">Nuevo Anuncio</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator color="blue-grey-6" class="q-mt-xs" />
        </div>
        <div class="q-mt-lg" style="margin-bottom: 12px">
          <q-item
            clickable
            exact-active-class="q-py-md q-mb-sm active-item"
            to="/carro"
          >
            <q-item-section avatar top>
              <q-avatar class="ico" icon="shopping_cart" />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1"
                >Carrito
                <q-badge
                  color="purple-13"
                  align="top"
                  class="q-ml-sm"
                  rounded
                  v-if="countShopping"
                  >{{ countShopping }}</q-badge
                ></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-separator color="blue-grey-6" class="q-mt-xs" />
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useDataStore } from "src/stores/dataStore";
import { storeToRefs } from "pinia";
import InputSearch from "src/components/LayoutComponents/InputSearch.vue";
const { countShopping } = storeToRefs(useDataStore());
const menu_mobile = ref(false);
</script>

<style scoped>
.ico {
  box-shadow: -2px 2px 0px -0px hsla(297, 70%, 71%, 0.984);
  color: #8646f3;
  background-color: aliceblue;
}
</style>

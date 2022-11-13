<template>
  <q-layout view="hHh lpR lFf" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-primary text-black" height-hint="98">
      <div class="row items-center">
        <div class="col-1 col-md-2">
          <q-btn
            flat
            round
            dense
            icon="menu"
            class="q-ml-md mobile-only"
            @click="menu_mobile = !menu_mobile"
          />
          <q-toolbar class="desktop-only">
            <q-toolbar-title>
              <q-avatar>
                <q-icon name="ion-phone-portrait" size="2rem"></q-icon>
              </q-avatar>
              Tienda <span class="text-weight-bold"> Cellphone</span>
            </q-toolbar-title>
          </q-toolbar>
        </div>
        <div class="col-10 col-lg-3">
          <q-input
            color="lime-10"
            bg-color="white"
            dense
            rounded
            outlined
            v-model="search"
            input-class="text-center"
            class="q-px-lg"
          >
            <template v-slot:append>
              <q-icon v-if="search === ''" name="search" />
              <q-icon
                v-else
                name="clear"
                class="cursor-pointer"
                @click="search = ''"
              />
            </template>
          </q-input>
        </div>
        <div class="col-3 desktop-only">
          <q-tabs
            active-bg-color="positive"
            active-color="white"
            no-caps
            indicator-color="cyan-6"
          >
            <q-route-tab to="/" label="Inicio" />
            <q-route-tab
              to="/page3"
              icon="ion-add-circle-outline"
              :ripple="false"
            />
            <q-route-tab
              to="/page3"
              icon="fa-solid fa-cart-shopping"
              :ripple="false"
            />
          </q-tabs>
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
      class="mobile-only"
    >
      <q-list>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="ion-phone-portrait" />
          </q-item-section>
          <q-item-section>Tienda Cellphone </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/">
          <q-item-section>
            <q-item-label>Inicio</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/pagetwo">
          <q-item-section>
            <q-item-label>Estadísticas</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/pagetwo">
          <q-item-section>
            <q-item-label>Nuevo anuncio</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/pagetwo">
          <q-item-section>
            <q-item-label>Carrito</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal class="footer"> </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
const search = ref("");
const menu_mobile = ref(false);
</script>

<style scoped>
.footer {
  background-color: transparent;
  height: 22vh;
  background-image: url(../assets/footer.png);
  background-position: bottom; /*Para que la imagen aparezca desde abajo*/
  background-size: 100% 100%; /*o las medidas que quieras darle a la imagen*/
}
</style>

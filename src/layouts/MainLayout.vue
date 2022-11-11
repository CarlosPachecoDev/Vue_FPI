<template>
  <q-layout view="hHh lpR lFf" class="shadow-2 rounded-borders">
    <q-header
      reveal
      elevated
      class="bg-primary text-black"
      height-hint="98"
      :reveal-offset="100"
    >
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
            <q-route-tab to="/pagetwo" label="Estadísticas" />
            <q-route-tab
              to="/page3"
              icon="ion-add-circle-outline"
              :ripple="false"
            />
            <q-route-tab
              to="/page3"
              icon="fa-solid fa-cart-plus"
              :ripple="false"
            />
          </q-tabs>
        </div>
      </div>
    </q-header>

    <q-drawer
      show-if-above
      side="left"
      elevated
      bordered
      :mini="miniState"
      :mini-width="60"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      class="desktop-only"
    >
      <q-scroll-area
        :thumb-style="thumbStyle"
        style="height: 94vh"
        class="bg-positive"
      >
        <q-list class="q-px-lg">
          <q-card
            v-show="!miniState"
            class="options-container q-mt-lg bg-white"
            bordered
          >
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
          <q-card
            v-show="!miniState"
            class="options-container q-mt-lg"
            bordered
          >
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
          <q-card
            v-show="!miniState"
            class="options-container q-mt-lg q-mb-xl"
            bordered
          >
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
      </q-scroll-area>
      <div
        class="q-mini-drawer-only absolute rotate-270 waviy"
        style="top: 45vh"
      >
        <span style="--i: 1">F</span>
        <span style="--i: 3">I</span>
        <span style="--i: 5">L</span>
        <span style="--i: 7">T</span>
        <span style="--i: 9">R</span>
        <span style="--i: 11">O</span>
        <span style="--i: 13">S</span>
      </div>
    </q-drawer>

    <!-- MENU MOBILE-->
    <q-drawer
      v-model="menu_mobile"
      side="left"
      elevated
      bordered
      overlay
      class="mobile-only"
    >
      <q-scroll-area
        :thumb-style="thumbStyle"
        style="height: 100vh"
        class="bg-positive"
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
      </q-scroll-area>
      <div
        class="q-mini-drawer-only absolute rotate-270 waviy"
        style="top: 45vh"
      >
        <span style="--i: 1">F</span>
        <span style="--i: 3">I</span>
        <span style="--i: 5">L</span>
        <span style="--i: 7">T</span>
        <span style="--i: 9">R</span>
        <span style="--i: 11">O</span>
        <span style="--i: 13">S</span>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal class="footer"> </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
const miniState = ref(true);
const samsung = ref(false);
const huawei = ref(false);
const nokia = ref(false);
const iphone = ref(false);
const xiaomi = ref(false);
const android = ref(false);
const windows = ref(false);
const ios = ref(false);
const six_inch = ref(false);
const five_dot_inch = ref(false);
const five_inch = ref(false);
const search = ref("");
const menu_mobile = ref(false);
const thumbStyle = ref({
  right: "2px",
  borderRadius: "5px",
  backgroundColor: "#01d5ff",
  width: "5px",
  opacity: 0.75,
});
</script>

<style scoped>
.options-container {
  box-shadow: rgb(38, 57, 77) 0px 15px 15px -10px;
}

.waviy {
  width: 150px;
  height: 100px;
  font-size: 20px;
}

.waviy span {
  font-family: "Alfa Slab One", cursive;
  position: relative;
  display: inline-block;
  color: rgb(255, 255, 255);
  text-transform: uppercase;
  animation: waviy 2s infinite;
  animation-delay: calc(0.1s * var(--i));
}
@keyframes waviy {
  0%,
  40%,
  100% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-10px);
  }
}
.footer {
  background-color: transparent;
  height: 22vh;
  background-image: url(../assets/footer.png);
  background-position: bottom; /*Para que la imagen aparezca desde abajo*/
  background-size: 100% 100%; /*o las medidas que quieras darle a la imagen*/
}
</style>

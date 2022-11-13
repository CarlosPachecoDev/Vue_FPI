<template>
  <q-dialog
    v-model="useDataStore().showNewProductDialog"
    full-height
    full-width
  >
    <q-card class="form">
      <q-toolbar class="bg-primary q-py-lg">
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
        </q-avatar>

        <q-toolbar-title
          ><span class="text-weight-bold">Nuevo</span> Producto</q-toolbar-title
        >

        <q-btn
          flat
          round
          dense
          icon="close"
          v-close-popup
          @click="useDataStore().changeShowNewProductDialog(false)"
        />
      </q-toolbar>
      <q-separator />
      <q-card-section class="q-pt-xl">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <div class="row justify-evenly">
            <div class="col-12 col-md-5">
              <q-card-section>
                <div class="text-h6 text-weight-bold text-white">
                  Datos Generales
                </div>
              </q-card-section>
              <q-input
                class="q-mt-sm"
                hide-bottom-space
                name="name"
                rounded
                bg-color="white"
                label-color="purple-13"
                color="primary"
                outlined
                v-model="newProduct.name"
                label="Nombre"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
                clearable
              />
              <q-input
                name="price"
                class="q-mt-lg"
                rounded
                bg-color="white"
                label-color="purple-13"
                color="primary"
                outlined
                v-model="newProduct.price"
                label="Precio"
                prefix="$"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
                clearable
              />
              <q-input
                type="date"
                stack-label
                name="date"
                class="q-mt-lg"
                rounded
                bg-color="white"
                label-color="purple-13"
                color="primary"
                outlined
                v-model="newProduct.date"
                label="Fecha"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
                clearable
              />
              <q-card-section>
                <div class="text-h6 text-weight-bold text-white">
                  Descripción
                </div>
              </q-card-section>
              <q-input
                type="textarea"
                autogrow
                stack-label
                name="description"
                class="q-mt-lg"
                rounded
                bg-color="white"
                label-color="purple-13"
                color="primary"
                outlined
                v-model="newProduct.description"
                label="Descripción del producto"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
                clearable
              />
              <q-card-section>
                <div class="text-h6 text-weight-bold text-white">Imágenes</div>
              </q-card-section>
              <q-file
                ref="inputFile"
                max-files="4"
                multiple
                v-model="photos"
                accept=".jpg, image/*"
                @update:model-value="addImages"
                @rejected="onRejected"
                style="display: none"
              />

              <q-item>
                <q-item-section avatar>
                  <q-btn
                    push
                    padding="15px"
                    color="purple-13"
                    round
                    icon="fas fa-solid fa-upload"
                    @click="openUpload"
                  />
                </q-item-section>

                <q-item-section>
                  <q-item-label
                    class="text-subtitle2 text-weight-bolder text-white"
                    >Agregar</q-item-label
                  >
                  <q-item-label class="text-white">
                    Máximo 4 imágenes
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-carousel
                v-if="photosURL.length"
                transition-prev="scale"
                transition-next="scale"
                animated
                v-model="slide"
                :autoplay="4000"
                thumbnails
                class="q-mt-lg shadow-20 rounded-borders"
                style="
                  height: 30rem;
                  width: auto;
                  max-width: 30rem;
                  margin: 20px auto;
                "
                infinite
              >
                <q-carousel-slide
                  v-for="(value, index) in photosURL"
                  :key="index"
                  :name="index + 1"
                  :img-src="value"
                >
                  <div class="absolute-top custom-caption">
                    <div class="row justify-evenly">
                      <div class="col-9 text-center">
                        <div class="text-h4">
                          {{ photos[index].name }}
                        </div>
                      </div>
                      <div class="col-1">
                        <q-btn
                          round
                          color="red"
                          icon="close"
                          @click="deleteImage(index)"
                        />
                      </div>
                    </div>
                  </div>
                </q-carousel-slide>
              </q-carousel>
            </div>
            <div class="col-12 col-md-5">
              <q-card-section>
                <div class="text-h6 text-weight-bold text-white">
                  Especificaciones
                </div>
              </q-card-section>
              <div class="row q-my-lg">
                <div class="col">
                  <span class="text-h6 text-weight-regular text-white"
                    >Estado:</span
                  >
                  <q-radio
                    class="text-white text-subtitle1 text-weight-bold"
                    size="xl"
                    v-model="newProduct.specs.state"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    val="Nuevo"
                    label="Nuevo"
                  />
                  <q-radio
                    class="text-white text-subtitle1 text-weight-bold"
                    size="xl"
                    v-model="newProduct.specs.state"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    val="Usado"
                    label="Usado"
                  />
                </div>
              </div>
              <q-input
                class="q-mt-sm"
                hide-bottom-space
                name="brand"
                rounded
                bg-color="white"
                label-color="purple-13"
                color="primary"
                outlined
                v-model="newProduct.specs.brand"
                label="Marca"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
                clearable
              />
              <q-input
                class="q-mt-lg"
                hide-bottom-space
                name="model"
                rounded
                bg-color="white"
                label-color="purple-13"
                color="primary"
                outlined
                v-model="newProduct.specs.model"
                label="Modelo"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
                clearable
              />
              <q-input
                class="q-mt-lg"
                hide-bottom-space
                name="screen"
                rounded
                bg-color="white"
                label-color="purple-13"
                color="primary"
                outlined
                v-model="newProduct.specs.screen"
                label="Pantalla"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
                clearable
              />
              <q-input
                class="q-mt-lg"
                hide-bottom-space
                name="RAM"
                rounded
                bg-color="white"
                label-color="purple-13"
                color="primary"
                outlined
                v-model="newProduct.specs.RAM"
                label="RAM"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
                clearable
              />
              <q-input
                class="q-mt-lg"
                hide-bottom-space
                name="ROM"
                rounded
                bg-color="white"
                label-color="purple-13"
                color="primary"
                outlined
                v-model="newProduct.specs.ROM"
                label="ROM"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
                clearable
              />
              <q-input
                class="q-mt-lg"
                hide-bottom-space
                name="system"
                rounded
                bg-color="white"
                label-color="purple-13"
                color="primary"
                outlined
                v-model="newProduct.specs.system"
                label="Sistema"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
                clearable
              />
              <q-card-section>
                <div class="text-h6 text-weight-bold text-white q-mt-lg">
                  Datos del vendedor
                </div>
              </q-card-section>
              <q-input
                class="q-mt-lg"
                hide-bottom-space
                name="sellerName"
                rounded
                bg-color="white"
                label-color="purple-13"
                color="primary"
                outlined
                v-model="newProduct.seller_info.name"
                label="Nombre"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
                clearable
              />
              <q-input
                class="q-mt-lg"
                hide-bottom-space
                name="sellerPhone"
                rounded
                bg-color="white"
                label-color="purple-13"
                color="primary"
                outlined
                v-model="newProduct.seller_info.phone"
                label="Teléfono"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
                clearable
              />
            </div>
          </div>

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useDataStore } from "src/stores/dataStore";
import { addProduct } from "src/boot/db";
import { useQuasar } from "quasar";

const $q = useQuasar();
const newProduct = ref({
  name: "",
  date: "",
  price: "",
  specs: {
    state: "",
    brand: "",
    model: "",
    screen: "",
    RAM: "",
    ROM: "",
    system: "",
  },
  description: "",
  seller_info: {
    name: "",
    phone: "",
  },
});

const photos = ref(null);
const photosURL = ref([]);
const slide = ref(1);
const inputFile = ref(null);

function onSubmit() {
  addProduct(newProduct.value, photos.value);
}

function addImages() {
  photosURL.value = [];
  photos.value.forEach((photo) => {
    photosURL.value.push(URL.createObjectURL(photo));
  });
}

function onRejected(rejectedEntries) {
  $q.notify({
    type: "negative",
    icon: "error",
    iconSize: "36px",
    message: `${rejectedEntries.length} archivo(s) no se añadieron`,
    caption: "Máximo de imágener permitido: 4",
  });
}

function openUpload() {
  inputFile.value.getNativeElement().click();
}

function deleteImage(index) {
  photos.value.splice(index, 1);
  photosURL.value.splice(index, 1);
}
</script>

<style scoped>
.form {
  background-color: #9798ff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(187,768,382)'%3E%3Cstop offset='0' stop-color='%239798FF'/%3E%3Cstop offset='1' stop-color='%2348466D'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='982' height='818.3' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.11'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}

.custom-caption {
  color: rgb(243, 243, 243);
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>

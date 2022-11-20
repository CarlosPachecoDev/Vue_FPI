import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { Notify } from "quasar";
import { useDataStore } from "src/stores/dataStore";
import Compressor from "compressorjs";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
const limitPagination = 8;
const firebaseConfig = {
  apiKey: "AIzaSyBNqihpN7NrIZuxokJpgL-lZDJxktirC90",
  authDomain: "cellphonestore-1e5c4.firebaseapp.com",
  projectId: "cellphonestore-1e5c4",
  storageBucket: "cellphonestore-1e5c4.appspot.com",
  messagingSenderId: "405398430158",
  appId: "1:405398430158:web:c28b2e737760cba4374b9f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app);

export const getBrands = async () => {
  const response = await getDocs(collection(db, "marcas"));
  response.forEach((doc) => {
    useDataStore().brands.push({
      name: doc.data().name,
      count: 0,
    });
  });
};

export const getSystems = async () => {
  const response = await getDocs(collection(db, "sistemas"));
  response.forEach((doc) => {
    useDataStore().systems.push({
      name: doc.data().name,
      count: 0,
    });
  });
};

export const getScreenSizes = async () => {
  const response = await getDocs(collection(db, "pantallas"));
  response.forEach((doc) => {
    useDataStore().screens.push({
      name: doc.data().size,
      count: 0,
    });
  });
};

let brandsStore = [];
let systemsStore = [];
let screensStore = [];

const countSpecs = (product) => {
  try {
    useDataStore().brands[brandsStore.indexOf(product.specs.Marca)].count += 1;
  } catch (error) {
    //
  }
  try {
    useDataStore().systems[
      systemsStore.indexOf(product.specs.Sistema.split(" ")[0])
    ].count++;
  } catch (error) {
    //
  }
  try {
    useDataStore().screens[
      screensStore.indexOf(Math.round(product.specs.Pantalla))
    ].count++;
  } catch (error) {
    //
  }
};

// Obtener un producto por su ID
const getProduct = async (docID) => {
  const docRef = doc(db, "products", docID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const product = docSnap.data();
    product.id = docID;
    getImagesProduct(product);

    countSpecs(product);
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

// Obtener todos los productos
export const getProducts = async () => {
  const response = await getDocs(collection(db, "products"));
  brandsStore = useDataStore().brands.map((brand) => brand.name);
  systemsStore = useDataStore().systems.map((system) => system.name);
  screensStore = useDataStore().screens.map((screens) => screens.name);
  const idLastDoc = response.size ? response.docs.at(-1).id : 0;
  response.forEach((doc) => {
    const product = {
      id: doc.id,
      date: doc.data().date,
      name: doc.data().name,
      price: doc.data().price,
      seller_info: doc.data().seller_info,
      specs: doc.data().specs,
      description: doc.data().description,
      imagesURL: [],
    };
    countSpecs(product);
    getImagesProduct(product);
  });
};

const getImagesProduct = (product) => {
  const listRef = ref(storage, product.id);
  listAll(listRef)
    .then((res) => {
      const numImagesProduct = res.items.length;
      res.items.forEach((imageRef) => {
        getDownloadURL(ref(storage, imageRef.fullPath))
          .then((url) => {
            product.imagesURL.push(url);
            if (numImagesProduct === product.imagesURL.length) {
              useDataStore().phones.push(product);
            }
          })
          .catch((error) => {
            console.log("error on download image", error);
          });
      });
    })
    .catch((error) => {
      console.log("error al obtener la imagenes ", error);
    });
};

export const addProduct = async (product, files) => {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    pushImagesProduct(docRef.id, files);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const pushImagesProduct = (idProduct, files) => {
  const numFiles = files.length;

  let counter = 0;
  files.forEach((file) => {
    const storageRef = ref(storage, idProduct + "/" + file.name);

    new Compressor(file, {
      width: 700,
      height: 700,
      resize: "contain",
      quality: 0.6,
      mimeType: "image/jpeg",
      convertTypes: ["image/png", "image/webp"],
      success(fileCompress) {
        uploadBytes(storageRef, fileCompress).then((snapshot) => {
          counter++;
          if (counter === numFiles) {
            getProduct(idProduct);
            useDataStore().changeShowNewProductDialog(false);
            Notify.create({
              message: "Producto añadido",
              color: "#c9f42d",
              textColor: "white",
              icon: "ion-add",
            });
          }
        });
      },
      error(err) {
        console.log(err.message);
      },
    });
  });
};

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Notify } from "quasar";
import { useDataStore } from "src/stores/dataStore";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
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

export const getBrands = async (saveArray) => {
  const response = await getDocs(collection(db, "marcas"));
  response.forEach((doc) => {
    saveArray.push({
      id: doc.id,
      name: doc.data().name,
      value: false,
    });
  });
};

export const getSystems = async (saveArray) => {
  const response = await getDocs(collection(db, "sistemas"));
  response.forEach((doc) => {
    saveArray.push({
      id: doc.id,
      name: doc.data().name,
      value: false,
    });
  });
};

export const getScreenSizes = async (saveArray) => {
  const response = await getDocs(collection(db, "pantallas"));
  response.forEach((doc) => {
    saveArray.push({
      id: doc.id,
      name: doc.data().size,
      value: false,
    });
  });
};

export const getProducts = async (saveArray) => {
  const response = await getDocs(collection(db, "products"));
  response.forEach((doc) => {
    saveArray.push({
      id: doc.id,
      name: doc.data().name,
      price: doc.data().price,
      seller_info: doc.data().seller_info,
      specs: doc.data().specs,
      description: doc.data().description,
    });
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

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
      counter++;
      if (counter === numFiles) {
        Notify.create({
          message: "Producto añadido",
          color: "#c9f42d",
          textColor: "white",
          icon: "ion-add",
        });
        useDataStore().changeShowNewProductDialog(false);
      }
    });
  });
};

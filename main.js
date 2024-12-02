import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
  } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

const firebaseConfig = {
  apiKey: "AIzaSyBoQovSZfN-IWxwE6SNigeVFl7EyoGo6I8",
  authDomain: "insan-cemerlang-bf3bc.firebaseapp.com",
  projectId: "insan-cemerlang-bf3bc",
  storageBucket: "insan-cemerlang-bf3bc.appspot.com",
  messagingSenderId: "97027282334",
  appId: "1:97027282334:web:f8b63d43a947098d3df28f",
  measurementId: "G-TJFSY9D8R1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const basisdata = getFirestore(app);


export async function tambahPelanggan(nama, alamat, notelepon) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "pelanggan2"), {
      nama: nama,
      alamat: alamat,
      notelepon: notelepon
    })

    // menampilkan pesan berhasil
    console.log('berhasil menyimpan data pelanggan')
  } catch (error) {
    // menampilkan pesan gagal 
    console.log('gagal menyimpan data pelanggan' + error)
  }
}


export async function ambilDaftarPelanggan() {
  const refDokumen = collection(basisdata, "pelanggan2");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      nama: dokumen.data().nama,
      alamat: dokumen.data().alamat,
      notelepon: dokumen.data().notelepon

    })
  })

  return hasilKueri;
}

export async function ubahPelanggan(id, namabaru, alamatbaru, noteleponbaru) {
  await updateDoc(
    doc(basisdata, "pelanggan2", id), { nama: namabaru, alamat: alamatbaru, notelepon: noteleponbaru }
  )
}

export async function hapusPelanggan(id) {
  await deleteDoc(doc(basisdata, "pelanggan2", id))
}

export async function ambilPelanggan(id) {
  const refDokumen = await doc(basisdata, "pelanggan2", id)
  const snapshotDokumen = await getDoc(refDokumen)

  return await snapshotDokumen.data()
}
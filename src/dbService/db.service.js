const { db } = require("./firebase.config.js");
const {
  collection,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
} = require("firebase/firestore");

const customerCollection = collection(db, "customers");

const getCustomersList = () => {
  return getDocs(customerCollection);
};

const getCustomer = () => {
  const customerDoc = doc(db, "customers", customerId);
  return getDoc(customerDoc);
};

const addCustomer = async (newCustomer) => {
  console.log("🚀 ~ file: db.service.js:28 ~ addCustomer ~ newCustomer")
  try {
    const result = await addDoc(customerCollection, newCustomer);
    console.log("🚀 ~ file: db.service.js:31 ~ addCustomer ~ result")
  } catch (err) {
    console.log(err);
  }
};

const updateCustomer = (customerId, updatedCustomer) => {
  const customerDoc = doc(db, "customers", customerId);
  return updateDoc(customerDoc, updatedCustomer);
};

const deleteCustomer = (customerId) => {
  const customerDoc = doc(db, "customers", customerId);

  return deleteDoc(customerDoc);
};

module.exports = {
  deleteCustomer,
  updateCustomer,
  addCustomer,
  getCustomer,
  getCustomersList,
};

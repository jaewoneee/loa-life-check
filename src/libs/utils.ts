import * as SecureStore from 'expo-secure-store';

const saveStoreData = async (keyName: string, data: any) => {
  console.log('success', keyName, data);
  await SecureStore.setItemAsync(keyName, data);
};

const getStoreData = async (keyName: string) => {
  let result = await SecureStore.getItemAsync(keyName);
  if (result) {
    // console.log("2. 🔐 Here's your value 🔐 \n" + keyName + result.slice(0, 3));
    return result;
  } else {
    // console.log('No values stored under that key.');
  }
};

const deleteStoreData = async (keyName: string) => {
  await SecureStore.deleteItemAsync(keyName);
};

export { saveStoreData, getStoreData, deleteStoreData };

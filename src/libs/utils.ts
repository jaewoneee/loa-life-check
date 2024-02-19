import * as SecureStore from 'expo-secure-store';

const getStoredData = async (keyName: string) => {
  let result = await SecureStore.getItemAsync(keyName);
  if (result) {
    console.log("2. 🔐 Here's your value 🔐 \n" + result.slice(0, 3));
    return JSON.stringify(result);
  } else {
    alert('No values stored under that key.');
  }
};

const deleteStoredData = async (keyName: string) => {
  await SecureStore.deleteItemAsync(keyName);
  console.log('value is deleted');
};

export { getStoredData, deleteStoredData };

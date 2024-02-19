import * as SecureStore from 'expo-secure-store';

async function getApiKey() {
  let result = await SecureStore.getItemAsync('api_key');
  if (result) {
    console.log("2. 🔐 Here's your value 🔐 \n" + result.slice(0, 3));
    return JSON.stringify(result);
  } else {
    alert('No values stored under that key.');
  }
}

export { getApiKey };

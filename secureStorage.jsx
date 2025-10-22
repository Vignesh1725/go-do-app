import * as SecureStore from "expo-secure-store";

const SecureStorage = {
  save: async (key, value) => {
    try {
      await SecureStore.setItemAsync(key, JSON.stringify(value));
    } catch (err) {
      console.error("Error in saving to SecureStore: ", err);
    }
  },

  get: async (key) => {
    try {
      const value = await SecureStore.getItemAsync(key);
      return value ? JSON.parse(value) : null;
    } catch (err) {
      console.error("Error reading from SecureStore: ", err);
      return null;
    }
  },

  remove: async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (err) {
      console.error("Error deleting from SecureStore: ", err);
    }
  },
};

export default SecureStorage;

import AsyncStorage from "@react-native-async-storage/async-storage";
import decode from "jwt-decode";

class AuthService {
  async storeToken(token) {
    try {
      await AsyncStorage.setItem("userToken", token);
    } catch (error) {
      console.error("Error saving token", error);
    }
  }

  async getProfile() {
    const token = await this.getToken();
    if (token) {
      const decoded = decode(token);
      return decoded;
    }
    return null;
  }

  async loggedIn() {
    const token = await this.getToken();
    return !!token;
  }

  async logout() {
    try {
      await AsyncStorage.removeItem("userToken");
    } catch (error) {
      console.error("Error removing token", error);
    }
  }

  async getToken() {
    try {
      return await AsyncStorage.getItem("userToken");
    } catch (error) {
      console.error("Error fetching token", error);
      return null;
    }
  }
}

export default new AuthService();

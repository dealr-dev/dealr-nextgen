import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export type UserRole = 'customer-buyer' | 'customer-seller' | 'customer-agent';
export type RouteAfterAuth = 'Selfie' | 'Dashboard' | 'Verification';

interface SignUpParams {
  name: string;
  email: string;
  cellphone: string;
  role: UserRole;
  route?: RouteAfterAuth;
}

const BASE_URL = 'https://30hedx7po3.execute-api.eu-west-1.amazonaws.com/production';

class AuthService {
  /**
   * Sign up user (calls customer microservice first)
   */
  async signUp({
    name,
    email,
    cellphone,
    role
  }: SignUpParams): Promise<any> {
    
    // Step 2: Call signup endpoint
    const signUpRes = await axios.post(`${BASE_URL}/auth/signup`, {
      name,
      email,
      cellphone,
      role,
    });

    const { session } = signUpRes.data;
    await AsyncStorage.setItem('session', session);
    await AsyncStorage.setItem('username', cellphone);

    return signUpRes.data;
  }

  /**
   * Start custom sign-in
   */
  async signIn(username: string): Promise<any> {
    const res = await axios.post(`${BASE_URL}/auth/start-signin`, { username });
    const { session } = res.data;
    await AsyncStorage.setItem('session', session);
    await AsyncStorage.setItem('username', username);
    return res.data;
  }

  /**
   * Complete the custom challenge (OTP)
   */
  async completeChallenge(code: string): Promise<any> {
    const session = await AsyncStorage.getItem('session');
    const username = await AsyncStorage.getItem('username');

    const res = await axios.post(`${BASE_URL}/auth/complete-challenge`, {
      code,
      session,
      username,
    });
console.log('Challenge RES', res);
    const { idToken, accessToken, refreshToken } = res.data;

    await AsyncStorage.setItem('idToken', idToken);
    await AsyncStorage.setItem('accessToken', accessToken);
    if (refreshToken) await AsyncStorage.setItem('refreshToken', refreshToken);

    return res.data;
  }

  /**
   * Refresh token if needed
   */
  async refreshToken(): Promise<string> {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    const username = await AsyncStorage.getItem('username');

    const res = await axios.post(`${BASE_URL}/auth/refresh-token`, {
      username,
      refreshToken,
    });

    const { idToken, accessToken } = res.data;

    await AsyncStorage.setItem('idToken', idToken);
    await AsyncStorage.setItem('accessToken', accessToken);

    return accessToken;
  }

  /**
   * Get current user info from access token
   */
  async getCurrentUser(): Promise<any> {
    const accessToken = await this.getValidAccessToken();

    const res = await axios.get(`${BASE_URL}/auth/user-info`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data.attributes;
  }

  /**
   * Get a valid access token (refresh if expired)
   */
  async getValidAccessToken(): Promise<string> {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) throw new Error('No token');

    const decoded: { exp: number } = jwtDecode(token);
    const expiresInMs = decoded.exp * 1000 - Date.now();

    if (expiresInMs < 5 * 60 * 1000) {
      return await this.refreshToken();
    }

    return token;
  }

  /**
   * Get ID token (for downstream services, optional)
   */
  async getIdToken(): Promise<string | null> {
    return await AsyncStorage.getItem('idToken');
  }

  /**
   * Sign out user
   */
  async signOut(): Promise<void> {
    await AsyncStorage.multiRemove(['accessToken', 'idToken', 'refreshToken', 'session', 'username']);
  }
}

export default new AuthService();

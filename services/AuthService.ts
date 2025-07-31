import { Auth } from 'aws-amplify';

export type UserRole = 'customer-buyer' | 'customer-seller' | 'customer-agent';
export type RouteAfterAuth = 'Selfie' | 'Dashboard' | 'Verification';

interface SignUpParams {
  fullName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  customerId: string;
  route?: RouteAfterAuth;
}

interface SignInParams {
  username: string;
  password: string;
}

class AuthService {
  /**
   * Sign up a new user with custom attributes.
   */
  async signUp({
    fullName,
    email,
    phoneNumber,
    role,
    customerId,
    route = 'Selfie',
  }: SignUpParams): Promise<any> {
    return Auth.signUp({
      username: phoneNumber,
      password: 'placeholder-password',
      attributes: {
        email,
        phone_number: phoneNumber,
        name: fullName,
        'custom:role': role,
        'custom:customer': customerId,
        'custom:route': route,
      },
    });
  }

  /**
   * Sign in using phone/email and password.
   */
  async signIn(username : string): Promise<any> {
    return Auth.signIn(username);
  }

  /**
   * Confirm a user's signup using the OTP sent to them.
   */
  async confirmSignUp(username: string, code: string): Promise<any> {
    return Auth.confirmSignUp(username, code);
  }

  /**
   * Resend confirmation code to user.
   */
  async resendCode(username: string): Promise<any> {
    return Auth.resendSignUp(username);
  }

  /**
   * Sign out the user.
   */
  async signOut(): Promise<any> {
    return Auth.signOut();
  }

  /**
   * Return current authenticated user.
   */
  async getCurrentUser(): Promise<any> {
    return Auth.currentAuthenticatedUser();
  }

  async getCurrentUserDetails(): Promise<any> {
    const user = Auth.currentAuthenticatedUser();

    const {attributes} = user;

    return {
      condition: typeof attributes['custom:condition'] !== 'undefined' ? attributes['custom:condition'] : null,
      categories: typeof attributes['custom:categories'] !== 'undefined' ? mapToAttributeArray(attributes['custom:categories']) : [],
      budget: typeof attributes['custom:budget'] !== 'undefined' ? attributes['custom:budget'] : null,
      role: attributes['custom:role'],
      customer: attributes['custom:customer'],
      seller: attributes['custom:seller'],
      dealership: attributes['custom:dealership'],
      features: typeof attributes['custom:features'] !== 'undefined' ? mapToAttributeArray(attributes['custom:features']) : [],
      brands: typeof attributes['custom:brands'] !== 'undefined' ? mapToAttributeArray(attributes['custom:brands']) : [],
      years: typeof attributes['custom:years'] !== 'undefined' ? mapToObject(attributes['custom:years']) : null,
      prices: typeof attributes['custom:prices'] !== 'undefined' ? mapToObject(attributes['custom:prices']) : null,
      sort: typeof attributes['custom:sort'] !== 'undefined' ? attributes['custom:sort'] : null,
      location: typeof attributes['custom:location'] !== 'undefined' ? mapToObject(attributes['custom:location']) : null,
      avatar: attributes['custom:avatar'],
      route: attributes['custom:route'],
      name: attributes.name,
      email: attributes.email,
      phone: attributes.phone_number
    }
  }

  async getCurrentUserToken(): Promise<string> {
    const user = Auth.currentAuthenticatedUser();

    return user?.signInUserSession?.idToken
  }

  /**
   * Return current session including tokens.
   */
  async getSession(): Promise<any> {
    return Auth.currentSession();
  }

  /**
   * Change user password.
   */
  async changePassword(user: any, oldPassword: string, newPassword: string): Promise<any> {
    return Auth.changePassword(user, oldPassword, newPassword);
  }

  /**
   * Forgot password step 1 - send code.
   */
  async forgotPassword(username: string): Promise<any> {
    return Auth.forgotPassword(username);
  }

  /**
   * Forgot password step 2 - submit code and new password.
   */
  async forgotPasswordSubmit(username: string, code: string, newPassword: string): Promise<any> {
    return Auth.forgotPasswordSubmit(username, code, newPassword);
  }

  async sendCustomChallengeAnswer(user: any, code: string) : Promise<any> {
    return Auth.sendCustomChallengeAnswer(user, code)
  }
}

export default new AuthService();

const mapToAttributeArray = (stringvalue: string) => {
  if (stringvalue) {

      return JSON.parse(stringvalue);
  }

  return []
};

const mapToObject = (stringvalue: string) => {
  if (stringvalue) {
      return JSON.parse(stringvalue);
  }
  return null;
};

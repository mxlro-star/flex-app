import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

/**
 * Authentication service for handling user authentication with Firebase
 */
class AuthService {
  /**
   * Register a new user with email and password
   * @param email User's email
   * @param password User's password
   * @returns Promise with user credential
   */
  async registerWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<FirebaseAuthTypes.UserCredential> {
    try {
      return await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  /**
   * Sign in a user with email and password
   * @param email User's email
   * @param password User's password
   * @returns Promise with user credential
   */
  async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<FirebaseAuthTypes.UserCredential> {
    try {
      return await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  /**
   * Sign out the current user
   * @returns Promise<void>
   */
  async signOut(): Promise<void> {
    try {
      await auth().signOut();
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  }

  /**
   * Get the current authenticated user
   * @returns Current user or null if not authenticated
   */
  getCurrentUser(): FirebaseAuthTypes.User | null {
    return auth().currentUser;
  }

  /**
   * Subscribe to auth state changes
   * @param callback Function to call when auth state changes
   * @returns Unsubscribe function
   */
  onAuthStateChanged(
    callback: (user: FirebaseAuthTypes.User | null) => void
  ): () => void {
    return auth().onAuthStateChanged(callback);
  }

  /**
   * Send password reset email
   * @param email User's email
   * @returns Promise<void>
   */
  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (error) {
      console.error("Password reset error:", error);
      throw error;
    }
  }
}

// Export a singleton instance
export const authService = new AuthService();

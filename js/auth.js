// GigSecure Authentication & User Session Manager

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.initSession();
  }

  initSession() {
    const saved = localStorage.getItem(window.GigDB?.STORAGE_KEYS?.CURRENT_USER || 'gigsecure_current_user');
    if (saved) {
      try {
        this.currentUser = JSON.parse(saved);
      } catch (e) {
        this.currentUser = null;
      }
    } else {
      this.currentUser = null;
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  login(email, password) {
    if (!email || !password) {
      return { success: false, message: "Please provide both email and password." };
    }

    const user = window.GigDB.getUserByEmail(email);
    if (!user) {
      return { success: false, message: "User account not found with this email. Please register first." };
    }

    if (user.password !== password) {
      return { success: false, message: "Invalid password. Please check and try again." };
    }

    this.currentUser = user;
    localStorage.setItem(window.GigDB.STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    return { success: true, user };
  }

  register(userData) {
    if (!userData.email || !userData.password || !userData.name) {
      return { success: false, message: "Full Name, Email, and Password are required." };
    }

    const existing = window.GigDB.getUserByEmail(userData.email);
    if (existing) {
      return { success: false, message: "An account with this email already exists. Please sign in." };
    }

    const newUser = window.GigDB.createUser(userData);
    this.currentUser = newUser;
    localStorage.setItem(window.GigDB.STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
    return { success: true, user: newUser };
  }

  updateProfile(profileData) {
    if (!this.currentUser) return { success: false, message: "No active user session." };

    const updated = window.GigDB.updateUser(this.currentUser.user_id, profileData);
    if (updated) {
      this.currentUser = updated;
      localStorage.setItem(window.GigDB.STORAGE_KEYS.CURRENT_USER, JSON.stringify(updated));
      return { success: true, user: updated };
    }
    return { success: false, message: "Failed to update profile." };
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem(window.GigDB?.STORAGE_KEYS?.CURRENT_USER || 'gigsecure_current_user');
  }
}

window.Auth = new AuthManager();
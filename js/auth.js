// GigSecure Authentication & Role-Based Access Control (FR1, FR2, FR11)

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
      // Start with null so user sees the login gateway first!
      this.currentUser = null;
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  isAdmin() {
    return this.currentUser && this.currentUser.role === 'admin';
  }

  login(email, password) {
    if (!email || !password) {
      return { success: false, message: "Please provide both email and password." };
    }

    const user = window.GigDB.getUserByEmail(email);
    if (!user) {
      return { success: false, message: "User account not found with this email." };
    }

    if (user.password !== password) {
      return { success: false, message: "Invalid password. Please check and try again." };
    }

    this.currentUser = user;
    localStorage.setItem(window.GigDB.STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    return { success: true, user };
  }

  quickLogin(role = 'worker') {
    const users = window.GigDB.getUsers();
    let target = users.find(u => u.role === role);
    if (!target) {
      target = role === 'admin' ? users[0] : users[1];
    }
    if (target) {
      this.currentUser = target;
      localStorage.setItem(window.GigDB.STORAGE_KEYS.CURRENT_USER, JSON.stringify(target));
      return { success: true, user: target };
    }
    return { success: false, message: "Demo user not found." };
  }

  register(userData) {
    if (!userData.email || !userData.password || !userData.name) {
      return { success: false, message: "Full Name, Email and Password are required." };
    }

    const existing = window.GigDB.getUserByEmail(userData.email);
    if (existing) {
      return { success: false, message: "An account with this email already exists." };
    }

    const newUser = window.GigDB.createUser(userData);
    this.currentUser = newUser;
    localStorage.setItem(window.GigDB.STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
    return { success: true, user: newUser };
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem(window.GigDB.STORAGE_KEYS.CURRENT_USER);
  }

  switchRole(role) {
    const allUsers = window.GigDB.getUsers();
    const targetUser = allUsers.find(u => u.role === role);
    if (targetUser) {
      this.currentUser = targetUser;
      localStorage.setItem(window.GigDB.STORAGE_KEYS.CURRENT_USER, JSON.stringify(targetUser));
      return targetUser;
    }
    return null;
  }
}

window.Auth = new AuthManager();
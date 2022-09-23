const User = (api) => ({
  register: (email, username, password) =>
    api.post("/register", {}, { email, username, password }),
  login: (email, password) => api.post("/login", {}, { email, password }),
  getInfo: (email) => api.get("/user", { email }, {}),
  updateRole: (email, role) => api.put("/update-user", {}, { email, role }),
});
export default User;

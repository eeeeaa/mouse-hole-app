const loginUri = `${import.meta.env.VITE_MOUSE_HOLE_API_URL}/auth/login`;
const signupUri = `${import.meta.env.VITE_MOUSE_HOLE_API_URL}/auth/signup`;

export const loginUseCase = async (username, password) => {
  const response = await fetch(loginUri, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (response.status >= 400) {
    console.log(response);
    const json = await response.json();
    throw new Error(json.message);
  }

  const jsonResponse = await response.json();
  return { username: jsonResponse.username, token: jsonResponse.token };
};

export const signupUseCase = async (username, password, password_confirm) => {
  const response = await fetch(signupUri, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, password_confirm }),
  });
  if (response.status >= 400) {
    console.log(response);
    const json = await response.json();
    throw new Error(json.message);
  }

  const jsonResponse = await response.json();
  return { user: jsonResponse.user };
};

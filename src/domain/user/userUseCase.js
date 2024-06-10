export const getMyProfileUseCase = async (token) => {
  let user = null;
  let error = null;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  await fetch(`${import.meta.env.VITE_MOUSE_HOLE_API_URL}/users/my-profile`, {
    method: "GET",
    mode: "cors",
    headers: headers,
  })
    .then(async (response) => {
      if (response.status >= 400) {
        console.log(response);
        const json = await response.json();
        throw new Error(json.message);
      }
      return response.json();
    })
    .then((response) => {
      user = response.user;
    })
    .catch((err) => (error = err));

  return { user, error };
};

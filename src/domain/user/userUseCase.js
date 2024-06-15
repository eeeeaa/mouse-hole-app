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

export const getMyFollowingsUseCase = async (token) => {
  let users = [];
  let error = null;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  await fetch(
    `${import.meta.env.VITE_MOUSE_HOLE_API_URL}/users/my-followings`,
    {
      method: "GET",
      mode: "cors",
      headers: headers,
    }
  )
    .then(async (response) => {
      if (response.status >= 400) {
        console.log(response);
        const json = await response.json();
        throw new Error(json.message);
      }
      return response.json();
    })
    .then((response) => {
      users = response.users;
    })
    .catch((err) => (error = err));

  return { users, error };
};

export const updateMyProfile = async (
  { display_name = undefined, file = undefined },
  token,
  userId
) => {
  let user = null;
  let error = null;

  const formData = new FormData();
  formData.append("display_name", display_name);
  if (file) {
    formData.append("image", file);
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  await fetch(`${import.meta.env.VITE_MOUSE_HOLE_API_URL}/users/${userId}`, {
    method: "PUT",
    mode: "cors",
    headers: headers,
    body: formData,
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
      user = response.updatedUser;
    })
    .catch((err) => (error = err));

  return { user, error };
};

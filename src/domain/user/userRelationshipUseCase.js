export const getMyFollowStatus = async (token, userId) => {
  let userRelationship = null;
  let error = null;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  await fetch(
    `${
      import.meta.env.VITE_MOUSE_HOLE_API_URL
    }/users/${userId}/my-follow-status`,
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
      userRelationship = response.user_relationship;
    })
    .catch((err) => (error = err));

  return { userRelationship, error };
};

export const followUser = async (token, userId) => {
  let userRelationship = null;
  let error = null;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  await fetch(
    `${import.meta.env.VITE_MOUSE_HOLE_API_URL}/users/${userId}/follow-user`,
    {
      method: "POST",
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
      userRelationship = response.user_relationship;
    })
    .catch((err) => (error = err));

  return { userRelationship, error };
};

export const unfollowUser = async (token, userId) => {
  let userRelationship = null;
  let error = null;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  await fetch(
    `${import.meta.env.VITE_MOUSE_HOLE_API_URL}/users/${userId}/unfollow-user`,
    {
      method: "DELETE",
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
      userRelationship = response.user_relationship;
    })
    .catch((err) => (error = err));

  return { userRelationship, error };
};

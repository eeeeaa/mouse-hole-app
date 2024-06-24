export const getPostLikesUseCase = async (token, postId) => {
  let likeCount = 0;
  let isUserLiked = false;
  let error = null;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  await fetch(
    `${import.meta.env.VITE_MOUSE_HOLE_API_URL}/posts/${postId}/like`,
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
      likeCount = response.like_count;
      isUserLiked = response.isUserLiked;
    })
    .catch((err) => (error = err));

  return { likeCount, isUserLiked, error };
};

export const toggleLikeUseCase = async (token, postId) => {
  let likeCount = 0;
  let isUserLiked = false;
  let error = null;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  await fetch(
    `${import.meta.env.VITE_MOUSE_HOLE_API_URL}/posts/${postId}/like/toggle`,
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
      likeCount = response.like_count;
      isUserLiked = response.isUserLiked;
    })
    .catch((err) => (error = err));

  return { likeCount, isUserLiked, error };
};

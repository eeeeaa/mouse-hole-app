export const getMyFeedUseCase = async (token) => {
  let posts = [];
  let error = null;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  await fetch(`${import.meta.env.VITE_MOUSE_HOLE_API_URL}/posts/my-feed`, {
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
      posts = response.posts;
    })
    .catch((err) => (error = err));

  return { posts, error };
};

export const getAllPostsUseCase = async (token) => {
  let posts = [];
  let error = null;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  await fetch(`${import.meta.env.VITE_MOUSE_HOLE_API_URL}/posts`, {
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
      posts = response.posts;
    })
    .catch((err) => (error = err));

  return { posts, error };
};

export const createPostUseCase = async ({
  token,
  files = undefined,
  title = undefined,
  content = undefined,
}) => {
  let post = null;
  let error = null;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  if (files) {
    for (const file of files) {
      formData.append("image", file);
    }
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  await fetch(`${import.meta.env.VITE_MOUSE_HOLE_API_URL}/posts`, {
    method: "POST",
    mode: "cors",
    headers: headers,
    body: formData,
  })
    .then(async (response) => {
      if (response.status >= 400) {
        const json = await response.json();
        console.log(json);
        throw new Error(json.message);
      }
      return response.json();
    })
    .then((response) => {
      post = response.post;
    })
    .catch((err) => (error = err));

  return { post, error };
};

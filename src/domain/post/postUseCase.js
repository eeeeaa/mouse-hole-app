export const getMyFeedUseCase = async (token, page = 0) => {
  let posts = [];
  let totalPages = 0;
  let currentPage = 0;
  let error = null;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  await fetch(
    `${import.meta.env.VITE_MOUSE_HOLE_API_URL}/posts/my-feed?page=${page}`,
    {
      method: "GET",
      mode: "cors",
      headers: headers,
    }
  )
    .then(async (response) => {
      if (response.status >= 400) {
        const json = await response.json();
        throw new Error(json.message);
      }
      return response.json();
    })
    .then((response) => {
      posts = response.posts;
      totalPages = response.totalPages;
      currentPage = response.currentPage;
    })
    .catch((err) => (error = err));

  return { posts, totalPages, currentPage, error };
};

export const getUserPostsUseCase = async (token, userId, page = 0) => {
  let posts = [];
  let totalPages = 0;
  let currentPage = 0;
  let error = null;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  await fetch(
    `${import.meta.env.VITE_MOUSE_HOLE_API_URL}/posts/user-posts?page=${page}`,
    {
      method: "POST",
      mode: "cors",
      headers: headers,
      body: JSON.stringify({
        user_id: userId,
      }),
    }
  )
    .then(async (response) => {
      if (response.status >= 400) {
        const json = await response.json();
        throw new Error(json.message);
      }
      return response.json();
    })
    .then((response) => {
      posts = response.posts;
      totalPages = response.totalPages;
      currentPage = response.currentPage;
    })
    .catch((err) => (error = err));

  return { posts, totalPages, currentPage, error };
};

export const getAllPostsUseCase = async (token, page = 0) => {
  let posts = [];
  let error = null;
  let totalPages = 0;
  let currentPage = 0;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  await fetch(`${import.meta.env.VITE_MOUSE_HOLE_API_URL}/posts?page=${page}`, {
    method: "GET",
    mode: "cors",
    headers: headers,
  })
    .then(async (response) => {
      if (response.status >= 400) {
        const json = await response.json();
        throw new Error(json.message);
      }
      return response.json();
    })
    .then((response) => {
      posts = response.posts;
      totalPages = response.totalPages;
      currentPage = response.currentPage;
    })
    .catch((err) => (error = err));

  return { posts, totalPages, currentPage, error };
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

export const editPostUseCase = async ({
  token,
  files = undefined,
  title = undefined,
  content = undefined,
  postId,
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
  await fetch(`${import.meta.env.VITE_MOUSE_HOLE_API_URL}/posts/${postId}`, {
    method: "PUT",
    mode: "cors",
    headers: headers,
    body: formData,
  })
    .then(async (response) => {
      if (response.status >= 400) {
        const json = await response.json();
        throw new Error(json.message);
      }
      return response.json();
    })
    .then((response) => {
      post = response.updatedPost;
    })
    .catch((err) => (error = err));

  return { post, error };
};

export const deletePost = async (token, postId) => {
  let post = null;
  let error = null;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  await fetch(`${import.meta.env.VITE_MOUSE_HOLE_API_URL}/posts/${postId}`, {
    method: "DELETE",
    mode: "cors",
    headers: headers,
  })
    .then(async (response) => {
      if (response.status >= 400) {
        const json = await response.json();
        throw new Error(json.message);
      }
      return response.json();
    })
    .then((response) => {
      post = response.deletedPost;
    })
    .catch((err) => (error = err));

  return { post, error };
};

export const getPost = async (token, postId) => {
  let post = null;
  let error = null;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  await fetch(`${import.meta.env.VITE_MOUSE_HOLE_API_URL}/posts/${postId}`, {
    method: "GET",
    mode: "cors",
    headers: headers,
  })
    .then(async (response) => {
      if (response.status >= 400) {
        const json = await response.json();
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

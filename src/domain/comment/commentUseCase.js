export const getComments = async (token, postId, page = 0) => {
  let comments = [];
  let totalPages = 0;
  let currentPage = 0;
  let error = null;

  //TODO handle pagination

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  await fetch(
    `${
      import.meta.env.VITE_MOUSE_HOLE_API_URL
    }/posts/${postId}/comments?page=${page}`,
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
      comments = response.comments;
      totalPages = response.totalPages;
      currentPage = response.currentPage;
    })
    .catch((err) => (error = err));

  return { comments, totalPages, currentPage, error };
};

export const createComment = async (token, postId, message) => {
  let comment = null;
  let error = null;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  await fetch(
    `${import.meta.env.VITE_MOUSE_HOLE_API_URL}/posts/${postId}/comments`,
    {
      method: "POST",
      mode: "cors",
      headers: headers,
      body: JSON.stringify({
        message: message,
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
      comment = response.comment;
    })
    .catch((err) => (error = err));

  return { comment, error };
};

export const deleteComment = async (token, postId, commentId) => {
  let comment = null;
  let error = null;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  await fetch(
    `${
      import.meta.env.VITE_MOUSE_HOLE_API_URL
    }/posts/${postId}/comments/${commentId}`,
    {
      method: "DELETE",
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
      comment = response.deletedComment;
    })
    .catch((err) => (error = err));

  return { comment, error };
};

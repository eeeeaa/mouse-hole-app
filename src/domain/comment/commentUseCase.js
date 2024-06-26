export const getComments = async (token, postId) => {
  let comments = [];
  let error = null;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  await fetch(
    `${import.meta.env.VITE_MOUSE_HOLE_API_URL}/posts/${postId}/comments`,
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
    })
    .catch((err) => (error = err));

  return { comments, error };
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

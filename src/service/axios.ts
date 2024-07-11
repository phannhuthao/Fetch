import axios from "axios"

export const getAllPosts = async () => {
    const res = await axios.get('http://localhost:9999/posts', {
        headers: {
            "Authorization": "Bearer "
        }
    })
    if (res.status == 200) {
        return res.data;
    } else {
        throw new Error("Failed to error")

    }
}

export const createdNewPost = async (newPost: {}) => {
    const res = await axios.post("http://localhost:9999/posts", newPost, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.status == 201) {
        return res.data;
    } else {
        throw new Error("Failed to create new post")
    }
}

export const deletePost = async (id: number) => {
    const res = await axios.delete(`http://localhost:9999/posts/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (res.status === 200) {
        // thành công và có dữ liệu trả về
        // lưu vào token
        return res.data;
    } else {
        throw new Error("Failed to delete post");
    }
};

export const editPost = async (id: number, updatedPost: {}) => {
    const res = await axios.put(`http://localhost:9999/posts/${id}`, updatedPost, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (res.status === 200) {
        return res.data;
    } else {
        throw new Error("Failed to edit post");
    }
};

export const login = async (email: string, password: string) => {
    const res = await axios.post('http://localhost:9999/login', {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("Failed to login");
    }
  };
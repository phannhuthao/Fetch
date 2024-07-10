// hàm lấy dữ liệu bài đăng

export const getAllPosts = async () => {
    const response = await fetch('http://localhost:9999/posts') // mặc định feth có method là GET
    if(!(await response).ok) {
        // nếu không thành công ra ngoại lệ Error
        throw new Error((await response).statusText)
    } else {
        // nếu thahf công
        return (await response).json();
    }
}


// thêm mới :
// method: POST
// endpoint: (đường dẫn của API): http://localhost:9999/posts
export const creatNewPost = async (data: {}) => {
    const response = await fetch ('http://localhost:9999/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

// xóa

export const deletePost = async (Id: number) => {
    const response = await fetch("http://localhost:9999/posts/"+Id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  };

// Sửa
  export const UpdatePost = async ( dataUp: {} ,Id: number) => {
    const response = await fetch("http://localhost:9999/posts/"+Id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataUp)
    });
    return response.json();
  };



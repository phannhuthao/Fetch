export const getAllProduct = async () => {
    try {
        const response = await fetch('http://localhost:9999/product');
        if (!response.ok) {
            throw new Error('Ko tìm thấy web');
        }
        const data = await response.json();
        console.log(data); 
        return data;
    } catch (error) {
        console.error('Có lỗi kiểm tra lại', error);
    }
};




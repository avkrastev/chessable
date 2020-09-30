import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://chessable.me'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;
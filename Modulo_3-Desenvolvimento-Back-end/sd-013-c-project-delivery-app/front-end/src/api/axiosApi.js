import axios from 'axios';

const axiosGetApi = async (path) => {
  const html = `http://localhost:3001${path}`;
  const response = await axios(html);

  return response;
};

const axiosPostApi = async (path, params, headers) => {
  if (headers) {
    const html = `http://localhost:3001${path}`;
    const response = await axios.post(html, params, headers);
    return response;
  }

  const html = `http://localhost:3001${path}`;
  const response = await axios.post(html, params);
  return response;
};

export {
  axiosGetApi,
  axiosPostApi,
};

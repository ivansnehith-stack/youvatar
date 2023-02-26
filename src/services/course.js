import axios from "axios";

const API_BASE_URL = "https://api.youvatar.in";
const ENDPOINT_BASE = "courses/create_course";

export const createCourse = (payload) => {
  const url = `${API_BASE_URL}/${ENDPOINT_BASE}/landing_page`;

  return axios.post(url, payload, {
    maxBodyLength: Infinity,
    withCredentials: true,
  });
};

export const createCourseMoudle = (payload) => {
  const url = `${API_BASE_URL}/${ENDPOINT_BASE}/module`;

  return axios.post(url, payload, { withCredentials: true });
};

export const createMoudleLecture = (payload) => {
  const url = `${API_BASE_URL}/${ENDPOINT_BASE}/lecture`;

  return axios.post(url, payload, { withCredentials: true });
};

export const addLectureResource = (payload) => {
  const url = `${API_BASE_URL}/${ENDPOINT_BASE}/lecture/resource`;

  return axios.post(url, payload, {
    maxBodyLength: Infinity,
    withCredentials: true,
  });
};

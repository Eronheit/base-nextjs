import axios from 'axios';

export function setupAPIClient() {
  const api = axios.create({
    baseURL: 'http://your_project/api',
  });

  return api;
}

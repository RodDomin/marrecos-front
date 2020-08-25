import axios from 'axios';

class HttpService {
  private api = axios.create({
    baseURL: 'http://localhost:3000',
  });

  private token?: string;

  private statusCode = 0;

  async get(url: string) {
    const { data, status } = await this.api.get(url);
    this.statusCode = status;

    return data;
  }

  async put<T, E>(url: string, body: object) {
    const { data, status } = await this.api.put<T>(url, body);
    this.statusCode = status;

    return data;
  }

  async post<T, E>(url: string, body?: E) {
    const { data, status } = await this.api.post<T>(url, body);
    this.statusCode = status;

    return data;
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  setToken(token: string) {
    this.api.defaults.headers.authorization = `Bearer ${token}`;

    this.token = token;
  }
}

export { HttpService };

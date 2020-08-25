import axios from 'axios';

class HttpApiService {
  private api = axios.create({
    baseURL: 'http://localhost:3000',
  });

  private token: string;

  constructor() {
    this.token = '';
  }

  private statusCode = 0;

  async get(url: string) {
    const { data, status } = await this.api.get(url, {
      headers: { authorization: `Bearer ${this.token}` },
    });
    this.statusCode = status;

    return data;
  }

  async post<T, E>(url: string, body?: E) {
    const { data, status } = await this.api.post<T>(url, body, {
      headers: { authorization: `Bearer ${this.token}` },
    });
    this.statusCode = status;

    return data;
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  setToken(token: string) {
    this.token = token;
  }
}

export { HttpApiService };

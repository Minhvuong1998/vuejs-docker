import { NO_CONTENT, OK } from 'http-status';

import { Service } from '../service';

export default class AuthService extends Service {
  public async Login(data: {email: string, password: string}) {
    return await this.fetch<typeof window.userInfo>({
      url: '/auth/login',
      expectedStatusCode: OK,
      data,
      noAuth: true,
      method: 'POST'
    });
  }

  public async refresh() {
    return this.fetch({
      url: '/api/user/refresh',
      expectedStatusCode: NO_CONTENT,
    });
  }
}

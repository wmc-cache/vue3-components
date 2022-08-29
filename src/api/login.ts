import http from '../util/http';

export function login(params: any): any {
  return http({
    url: 'admin/qywx_oauth_login',
    method: 'get',
    params
  });
}

export function getMobileHashcode(params: any): any {
  return http({
    url: '/qywx/card_template/get_mobile_hashcode',
    method: 'get',
    params
  });
}

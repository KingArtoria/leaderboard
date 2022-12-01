import request from './request';
import qs from 'qs';
/* 排行榜数据 */
export const getRankingList = data => {
  return request({
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    url: '/show/index',
    data: qs.stringify(data),
  });
};
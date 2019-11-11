import Mock from 'mockjs';
import {headerMsg} from './ticketQuery.json';

 Mock.mock('/api/test/getHeader','get',headerMsg);


 export default Mock;

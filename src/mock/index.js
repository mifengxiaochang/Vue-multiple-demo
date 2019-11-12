import Mock from 'mockjs';
import {headerMsg,passengerInfo,passengerData} from './ticketQuery.json';

 Mock.mock('/api/test/getHeader','get',headerMsg);
 Mock.mock('/api/test/getPassengerInfo','get',passengerInfo);
 Mock.mock('/api/test/getPassengerData','get',passengerData);

 export default Mock;

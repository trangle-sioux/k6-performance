import http from 'k6/http';
import { sleep, group, check } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{expected_response:true}': ['p(95)<1000'],
        'group_duration{group:::Main page}': ['p(95)<3000'],
        'group_duration{group:::Main page::Assets}': ['p(95)<1000'],
        'group_duration{group:::News page}': ['p(95)<1000'],
    }
}

export default function () {

    group('Main page', function () {
        let res = http.get('https://run.mocky.io/v3/38f88596-c9ca-44d5-82b9-00a3c20f866f?mocky-delay=900ms');
        check(res, { 'status is 200': (r) => r.status === 200 });
    
        group('Assets', function () {
            http.get('https://run.mocky.io/v3/38f88596-c9ca-44d5-82b9-00a3c20f866f?mocky-delay=900ms');
            http.get('https://run.mocky.io/v3/38f88596-c9ca-44d5-82b9-00a3c20f866f?mocky-delay=900ms');
        });
    });


    group('News page', function () {
        http.get('https://run.mocky.io/v3/46ac01d8-7d2d-4994-b594-4f359c79756d');
    });

    sleep(1);
}

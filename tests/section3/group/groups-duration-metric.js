import http from 'k6/http';
import { sleep, group, check } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<250'],
        'group_duration{group:::Main page}': ['p(95)<8000'],
        'group_duration{group:::News page}': ['p(95)<6000'],
        'group_duration{group:::Main page::Assets}': ['p(95)<3000'],
    }
}

export default function () {

    group('Main page', function () {
        let res = http.get('https://run.mocky.io/v3/38f88596-c9ca-44d5-82b9-00a3c20f866f?mocky-delay=5000ms');
        check(res, { 'status is 200': (r) => r.status === 200 });
    
        group('Assets', function () {
            http.get('https://run.mocky.io/v3/38f88596-c9ca-44d5-82b9-00a3c20f866f?mocky-delay=1000ms');
            http.get('https://run.mocky.io/v3/38f88596-c9ca-44d5-82b9-00a3c20f866f?mocky-delay=1000ms');
        });
    });


    group('News page', function () {
        http.get('https://run.mocky.io/v3/38f88596-c9ca-44d5-82b9-00a3c20f866f?mocky-delay=5000ms');
    });

    sleep(1);
}

import http from 'k6/http';
import {sleep, check} from 'k6';

export const options   = {
    stages: [
        {duration: '30s', target: 10}
    ],
}

export default function() {
    const res = http.get('https://quickpizza.grafana.com/');
    check(res, { 'status was 200': (r) => r.status == 200 });

    // Sleep for 1 second to simulate real-world usage
    sleep(1);
}

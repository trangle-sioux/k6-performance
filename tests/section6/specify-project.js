import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '30s',
    cloud: {
        projectID: 3771795
    }
}

export default function () {
    http.get('https://quickpizza.grafana.com/test.k6.io/');
    sleep(1);
}

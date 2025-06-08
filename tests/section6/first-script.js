import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 10,
    duration: '10s'
}

export default function () {
    http.get('https://quickpizza.grafana.com/test.k6.io/');
    sleep(1);
}

// To run script in cloud, use the following command:
    // K6 cloud login --token 3b896587845e70952240da40df9fdb00713087f18184e02f36b46bfe9de614cd
    // k6 cloud first-script.js

// Running K6 in locally and exporting results to cloud:
    //     k6 run first-script.js -o clound
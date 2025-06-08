import http from 'k6/http';
import { sleep } from 'k6';

//https://grafana.com/docs/k6/latest/using-k6/k6-options/how-to/

export default function () {
    http.get('https://self-signed.badssl.com/');
    sleep(1);
}


// k6 run insecure-request.js --insecure-skip-tls-verify
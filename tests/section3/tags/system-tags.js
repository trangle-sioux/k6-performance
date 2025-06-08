import http from 'k6/http';

export const options = {
    thresholds: {
        'http_req_duration': ['p(95)<1000'],
        'http_req_duration{status:200}': ['p(95)<1000'],
        'http_req_duration{status:201}': ['p(95)<1000']
    }
}

export default function () {
    const res1 = http.get('https://run.mocky.io/v3/38f88596-c9ca-44d5-82b9-00a3c20f866f');
    console.log('Response 1 status:', res1.status);
    const res2 = http.get('https://run.mocky.io/v3/403a9e72-3f71-438b-a01d-47c7dfcb14d4?mocky-delay=2000ms');
    console.log('Response 2 status:', res2.status);
}
import http from 'k6/http';
import { sleep } from 'k6';
import { Counter, Trend } from 'k6/metrics';

export const options = {
    vus: 5,
    duration: '5s',
    thresholds: {
        http_req_duration: ['p(95)<250'],
        my_counter: ['count>10']
    }
}

let myCounter = new Counter('my_counter');
let newsPageResponseTrend = new Trend('news_page_response_time');

export default function () {
    let res = http.get('https://quickpizza.grafana.com/test.k6.io/');
    myCounter.add(1);
    sleep(1);
    
    res = http.get('https://quickpizza.grafana.com/news.php');
    newsPageResponseTrend.add(res.timings.duration);
    sleep(1);
}

import http from 'k6/http';
import {check, sleep} from 'k6';
import exec from 'k6/execution';

//Setting thresholds for performance testing
// Metrics type and aggregation methods
export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<100'], // 95% of requests must complete below 100ms
        http_req_duration: ['max<2000'], // Maximum request duration should be less than 2000ms
        http_req_failed: ['rate<0.01'], // Less than 1% of requests should fail
        http_reqs: ['count > 100'], // At least 100 requests should be made
        http_reqs: ['rate > 4'], // At least 4 requests per second
        vus: [
            'value > 9', // At least 9 virtual users should be active
        ],

    },
}
export default function () { 
    const res = http.get('https://quickpizza.grafana.com/test.k6.io/' + (exec.scenario.iterationInTest === 1 ? 'foo' : '')); // Create a purposeful error case in the first iteration of the test scenario to evaluate the system's ability to handle errors
    check(res, {
        'status is 200': () => res.status === 200,
        'Page is start page': () => res.body.includes("QuickPizza Legacy") === true, // Example check for body size
    })
    sleep(2); // Simulate user think time
  }
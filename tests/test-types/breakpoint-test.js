import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    stages: [
        {
            duration: '2h',
            target: 10000, // Ramp up to 10000 users
        }
    ]
} 

export default function() {
    http.get('https://quickpizza.grafana.com/test.k6.io/');
    sleep(1);
}

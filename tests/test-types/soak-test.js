import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    stages: [
        {
            duration: '5m',
            target: 1000, // Ramp up to 100 users
        },
        {
            duration: '24h',
            target: 1000, // Ramp up to 100 users
        },
        {
            duration: '5m',
            target: 0, // Ramp down to 0 users
        },
    ]
} 

export default function() {
    http.get('https://quickpizza.grafana.com/test.k6.io/');
    sleep(1);
    http.get('https://quickpizza.grafana.com/contacts.php');
    sleep(1);
    http.get('https://quickpizza.grafana.com/news.php');
    sleep(1);
}

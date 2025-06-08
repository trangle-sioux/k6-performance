import http from 'k6/http';
import { check } from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const URL= 'http://localhost:8000';

export default function () {
    let res = http.get(`${URL}/public/crocodiles/`);
    const crocodiles = res.json();
    const crocodileIds = crocodiles.map(item => item.id);
    const crocodileId = randomItem(crocodileIds);

    res = http.get(`${URL}/public/crocodiles/${crocodileId}/`);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'crocodile has the correct id': (r) => r.json().id === crocodileId
    });
}
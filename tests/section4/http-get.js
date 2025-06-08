import http from 'k6/http';
import { check } from 'k6';

const URL= 'http://localhost:8000/public'
export default function () {
    let res = http.get(`${URL}/crocodiles/`);
    const crocodiles = res.json();
    const crocodileId = crocodiles[0].id;
    const crocodileName = crocodiles[0].name;

    res = http.get(`${URL}/crocodiles/${crocodileId}/`);

    console.log(res.headers.Allow);
    console.log(res.headers['Content-Type']);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'crocodile name': (r) => r.json().name === crocodileName
    });

}
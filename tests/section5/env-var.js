import http from 'k6/http';

export default function () {
    console.log("__ENV.BASE_URL:", __ENV.BASE_URL)

    http.get(`${__ENV.BASE_URL}/public/crocodiles/`);
}
//k6 run -e BASE_URL=http://localhost:8000 env-var.js
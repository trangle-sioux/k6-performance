import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    vus:10, // Có 10 Virtual Users (người dùng ảo) chạy song song
    duration: '30s', // Chạy trong vòng 30 giây
    gracefulStop: '10s' // Thời gian dừng lại một cách nhẹ nhàng là 10 giây
} 
// => Nghĩa là sẽ có 10 người dùng ảo, mỗi người liên tục gửi request trong 30 giây

export default function() {
    http.get('https://test.k6.io');
    sleep(1);
}

/** 
 *  Mỗi virtual user sẽ:
 * Gửi 1 HTTP GET tới http://test.k6.io
 * Sau đó nghỉ 1 giây (sleep(1)) trước khi gửi tiếp.
 * **/


//========================Terminal Output — Result after running============================
/**
 * scenarios: (100.00%) 1 scenario, 10 max VUs, 1m0s max duration (incl. graceful stop):
 * default: 10 looping VUs for 30s (gracefulStop: 30s)
    * (100.00%) 1 scenario: 100% thời gian là do kịch bản này thực thi. 
    * 10 max VUs: 10 người dùng ảo cùng chạy.
    * 1m0s max duration (incl. graceful stop)
        * 1m0s: thời gian tối đa là 1 phút.
        * max duration: thời gian tối đa mà kịch bản này có thể chạy.
            * max duration = duration + gracefulStop(default: 30s)
        * (incl. graceful stop): bao gồm cả thời gian dừng lại một cách nhẹ nhàng.
            * Khi 30s test kết thúc, nếu có Virtual User (VU) nào đang chạy dở (ví dụ đang đợi server phản hồi), thì K6 không kill ngay.
 * ============================== Information about HTTP requests ======================================
 * data_received..................: Tổng lượng dữ liệu nhận về từ server
 * data_sent......................: Tổng lượng dữ liệu đã gửi tới server
 * http_req_blocked...............: Tổng thời gian mà request bị chặn (blocked) trước khi gửi tới server (thường do network hoặc proxy)
 * http_req_connecting............: Tổng thời gian mà request kết nối tới server (thời gian để thiết lập kết nối TCP)
 * http_req_duration..............: Tổng thời gian từ gửi yêu cầu đến nhận đủ phản hồi. Đây là chỉ số quan trọng nhất (Performance)
    * { expected_response:true }:
 *  http_req_failed................: Tổng số lượng request thất bại (failed) (0.00% tức là tất cả request đều thành công )
 * http_req_receiving.............: Tổng thời gian nhận dữ liệu từ server (chỉ phần nhận data, không tính phần chờ).
 * http_req_sending...............: Thời gian gửi dữ liệu (rất nhỏ, chỉ vài µs).
 * http_req_tls_handshaking.......: Thời gian bắt tay TLS (nếu dùng HTTPS, ở đây là HTTP nên bằng 0).
 * http_req_waiting...............: Thời gian chờ server xử lý và phản hồi (gần bằng http_req_duration).
 * http_reqs......................: Tổng số request đã gửi và tốc độ request mỗi giây
 * 
 * ============================== Information about virtual users (VUs) ================================
 * iteration_duration................: Thời gian trung bình mỗi iteration (bao gồm sleep)
 * iterations........................: Tổng số lần hàm default() được chạy
 * 
 * ============================== Information about iterations (default function runs)  =================
 * vus_max........................: Số lượng VUs tối đa (10)
 * vus............................: Tổng số lượng VUs đang chạy
 * 
 * ============================== Meaning of avg, min, max, p(90), p(95)  =================
 * avg: Giá trị trung bình (average)
 * min: Giá trị nhỏ nhất (minimum)
 * max: Giá trị lớn nhất (maximum)
 * med: giá trị trung vị
 * p(90): 90% các request có thời gian nhỏ hơn giá trị này. (Percentile 90)
 * p(95): 95% các request có thời gian nhỏ hơn giá trị này. (Percentile 95)
 * http_req_duration p(95) = 1.34s ➔ 95% request hoàn thành trong vòng or nhỏ hơn 1.34 giây.
 */
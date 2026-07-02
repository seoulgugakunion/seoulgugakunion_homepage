#!/usr/bin/env python3
"""개발용 정적 서버 (포트 8001).

python3 -m http.server와 동일하지만 Cache-Control: no-store를 보내서
브라우저가 CSS/JS를 캐시하지 않는다. 수정 후 새로고침만 하면 항상
최신 파일이 보인다.

    python3 serve.py
"""
import http.server


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    server = http.server.ThreadingHTTPServer(("0.0.0.0", 8001), NoCacheHandler)
    print("serving on http://127.0.0.1:8001 (no-store)")
    server.serve_forever()

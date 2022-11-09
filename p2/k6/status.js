import { check } from "k6";
import http from "k6/http";

export const options = {
    duration: "10s",
    vus: 50,
    summaryTrendStats: ["avg", "med", "p(95)", "p(99)"],
};

export default function () {
    check(http.get("http://localhost:7800/api?user=eOUlRn5eCXBkI92j1XBmiAgVQ7gMge6f"), {
        "is status 200": (r) => r.status === 200,
    });
}

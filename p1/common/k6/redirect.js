import { check } from "k6";
import http from "k6/http";

export const options = {
    duration: "12s",
    vus: 50,
    summaryTrendStats: ["avg", "med", "p(95)", "p(99)"],
};

export default function () {
    check(http.get("http://localhost:7777/DmaECwm", { redirects: 0 }), {
        "is status 302/303": (r) => r.status === 302 || r.status === 303,
    });
}

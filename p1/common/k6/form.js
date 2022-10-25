import { check, sleep } from "k6";
import http from "k6/http";

export const options = {
    duration: "12s",
    vus: 50,
    summaryTrendStats: ["avg", "med", "p(95)", "p(99)"],
};

export default function () {
    const payload = {
        url: 'https://test.k6.io/contacts.php',
    };
    check(http.post("http://localhost:7777/", payload), {
        "is status 200": (r) => r.status === 200,
    });
}

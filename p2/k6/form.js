import { check } from "k6";
import http from "k6/http";

export const options = {
    duration: "10s",
    vus: 5,
    summaryTrendStats: ["avg", "med", "p(95)", "p(99)"],
};

const makeid = (length) => {
    let result = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

export default function () {
    const payload = {
        code: makeid(32),
        user: "eOUlRn5eCXBkI92j1XBmiAgVQ7gMge6f",
        exercise: 1,
    };
    check(http.post("http://localhost:7800/api?user=eOUlRn5eCXBkI92j1XBmiAgVQ7gMge6f", payload), {
        "is status 200": (r) => r.status === 200,
    });
}

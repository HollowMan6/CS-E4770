import { executeQuery } from "../database/database.js";

const makeid = () => {
    var result = ""
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-"
    for (var i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}


const shortenUrl = async (url) => {
    const tag = makeid();
    await executeQuery(
        "INSERT INTO lookup (tag, url) VALUES ($tag, $url)",
        { tag, url },
    )

    return tag
}

const redirect = async (tag) => {
    const res = await executeQuery(
        "SELECT * FROM lookup WHERE tag=$tag ",
        { tag },
    )

    return res.rows
}

const redirectRandom = async () => {
    const res = await executeQuery(
        "SELECT * FROM lookup ORDER BY RANDOM() LIMIT 1",
    )

    return res.rows
}

export { shortenUrl, redirect, redirectRandom }
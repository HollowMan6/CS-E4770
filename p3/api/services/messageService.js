import { executeQuery } from "../database/database.js";

const getMessages = async (id) => {
    const res = await executeQuery(
        "SELECT * FROM message WHERE id<$id ORDER BY id DESC LIMIT 20",
        { id },
    );

    return res.rows;
};

const getReplies = async (id, message_id) => {
    const res = await executeQuery(
        "SELECT * FROM reply WHERE id<$id AND message_id=$message_id ORDER BY id DESC LIMIT 20",
        { id, message_id },
    );

    return res.rows;
};

const updatePoints = async (id, vote, message) => {
    let res;
    let table = message === "message" ? "message" : "reply";
    if (vote === "up") {
        res = await executeQuery(
            "UPDATE " + table + " SET point=point+1 WHERE id=$id RETURNING *",
            { id },
        );
    } else {
        res = await executeQuery(
            "UPDATE " + table + " SET point=point-1 WHERE id=$id RETURNING *",
            { id },
        );
    }
    return res.rows;
}

const addMessage = async (user_token, content) => {
    const res = await executeQuery(
        "INSERT INTO message (user_token, content, time, point) VALUES ($user_token, $content, $time, 0) RETURNING *",
        { user_token, content, time: Date.now() },
    );
    return res.rows;
}

const addReply = async (user_token, content, message_id) => {
    const res = await executeQuery(
        "INSERT INTO reply (message_id, user_token, content, time, point) VALUES ($message_id, $user_token, $content, $time, 0) RETURNING *",
        { message_id, user_token, content, time: Date.now() },
    );
    return res.rows;
}

export { getMessages, getReplies, updatePoints, addMessage, addReply };
import { executeQuery } from "../database/database.js";

const getQuestionsStatus = async (user) => {
    const res = await executeQuery(
        "SELECT DISTINCT question FROM submissions WHERE user_token=$user",
        { user },
    )

    const questions = {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false
    };

    res.rows.forEach(element => {
        questions[element.question] = true;
    });

    return questions;
}

const recordSubmission = async (user, question, code) => {
    const check = await executeQuery(
        "SELECT * FROM submissions WHERE question=$question AND code=$code",
        { question, code },
    )

    if (check.rows.length > 0) {
        return check.rows[0].id;
    }

    const res = await executeQuery(
        "INSERT INTO submissions (user_token, question, code) VALUES ($user, $question, $code) RETURNING id",
        { user, question, code },
    )

    return res.rows[0].id;
}

const getSubmission = async (id) => {
    const res = await executeQuery(
        "SELECT * FROM submissions WHERE id=$id",
        { id },
    )

    return res.rows[0].result;
}

export { getQuestionsStatus, recordSubmission, getSubmission }
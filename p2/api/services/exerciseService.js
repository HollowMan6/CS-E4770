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

const recordSubmission = async (user, question, code, result) => {
    await executeQuery(
        "INSERT INTO submissions (user_token, question, code, result) VALUES ($user, $question, $code, $result)",
        { user, question, code, result },
    )

    return true;
}

export { getQuestionsStatus, recordSubmission }
import { executeQuery } from "../database/database.js";

const updateSubmission = async (result, id) => {
    await executeQuery(
        "UPDATE submissions SET result=$result WHERE id=$id",
        { result, id },
    )

    return true;
}

export { updateSubmission }
import { v4 as uuidv4 } from 'uuid';

// List of session IDs. Could later be stored in JSON so things can be updated.
let sessionList = []

export default function handler(req, res) {
    let newID = uuidv4();
    sessionList.push(newID);
    console.log("IDs in use:", sessionList.toString());


    res.status(200).json({ id: newID })
}
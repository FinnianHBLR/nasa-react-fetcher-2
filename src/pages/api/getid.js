import { v4 as uuidv4 } from 'uuid';

var fs = require('fs');

// List of session IDs. Could later be stored in JSON so things can be updated.
let sessionList = []

export default function handler(req, res) {
    // Create ID
    let newID = uuidv4();
    // Add ID to list
    sessionList.push(newID);
    console.log("IDs in use:", sessionList.toString());

    /* Continuous tracker!! - needs merger logic to remove [] conflicts.
    fs.appendFile('sessions.json', JSON.stringify(sessionList), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    */

    // Forgetful tracker! Renews list on restart.
    fs.writeFile('sessions.json', JSON.stringify(sessionList), function (err) {
        if (err) throw err;
        console.log('Saved sessions!');
    });

    // Send new ID.
    res.status(200).json({ id: newID })
}
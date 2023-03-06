import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
var fs = require('fs');


export default function handler(req, res){
    // Read request and open URL parameters
    const query = req.query;
    const { param } = query;
    
    // Check if session is valid
    if(checkSessionID(param)) {
        console.log("TRUE")
    

    // Get latest images (idealy sync with NASA API), (local static for now!).

    // Get image URLs, local static now

    // Send URLS and titles

    res.status(200).json({imageList: [
        {title: "One", url: "examplecom"},
        {title: "Two", url: "examplecom"}
    ]})
}
}


async function checkSessionID(id){
    // MUST be async for a file loader.
    // Load sessions
    fs.readFile('sessions.json', 'utf8', (err, data) => {
        if (err) {
          console.error("FILE READING ERROR: ", err);
          return false;
        }
        console.log(data);
        // Check if session is there
    
        if(data.includes(id))
        console.log("ID FOUND: ", "Search term: " , id, "Located at position: ", `\x1b[33m ${data.indexOf(id)} \x1b[0m`)
        // Return true/false        
        return true;
      });

}
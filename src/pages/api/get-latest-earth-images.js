import { v4 as uuidv4 } from 'uuid';


export default function handler(req, res){
    
    // Check if session is valid

    // Get latest images (idealy sync with NASA API), (local static for now!).

    // Get image URLs, local static now

    // Send URLS and titles
    res.status(200).json({imageList: [
        {title: "One", url: "examplecom"},
        {title: "Two", url: "examplecom"}
    ]})

}


function checkSessionID(){
    return true;
}
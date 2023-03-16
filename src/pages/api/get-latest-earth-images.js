import { title } from 'process';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
var fs = require('fs');
import * as dotenv from 'dotenv'

let nasaKey = process.env.NASAKEY;

export default async function handler(req, res){
    // Read request and open URL parameters
    const query = req.query;
    const { param } = query;
    
    // Check if session is valid
    if(checkSessionID(param)) {
        console.log("TRUE")

    getLatestImage().then((processedData) => {
        // use processedData here
        console.log(processedData.url)
    });
      
    // getLatestImage().then(response => console.log(response));
    // console.log(JSON.stringify(images))
    // Get image URLs, local static now

    // Send URLS and titles

    res.status(200).json({imageList: [
        await getLatestImage().then((processedData) => {
            // use processedData here
            return processedData
        })
    ]})
}
}


async function getLatestImage(){
    const response = await fetch(`https://api.nasa.gov/EPIC/api/enhanced?api_key=${nasaKey}`);
    const data = await response.json();
    // Find latest image using positon 0.
    const imageTitle = await findImageTitle(data, 0);
    const imageURL = await findImageURL(data, 0)
    return {title: imageTitle, url: imageURL}
}


async function findImageTitle(listOfImagesJSON, position){
    // Check if object is accessible before accessing.
    let title = listOfImagesJSON && listOfImagesJSON[0].caption;
    return title;    
}

async function findImageURL(listOfImagesJSON, position) {
    // Extract link from JSON info
    // target example https://epic.gsfc.nasa.gov/archive/enhanced/2023/03/14/png/epic_RGB_20230314003633.png
    // const source0 = "https://api.nasa.gov/EPIC/archive/enhanced/"
    const source0 = "https://epic.gsfc.nasa.gov/archive/enhanced/"
    const apiKey = ""
    let imgUrl = ""
    let url = [];

    // Check if object is accessible before accessing.
    let identifier = listOfImagesJSON && listOfImagesJSON[position].image;
    let date = listOfImagesJSON && listOfImagesJSON[position].date;
    
    //cutting the unessasary data points out of the string
    date = date.slice(0, -9);
    //replacing slashes with dashes
    date = date.split('-').join('/');
    //adding the data to an array
    url.push(identifier, date)
    //Create the hyperlink that goes to the image. URL[0] URL[2] are the dates
    imgUrl = `${source0}${url[1]}/png/${url[0]}.png?${apiKey}`
    //console.log(imgUrl);
    return imgUrl;
};



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
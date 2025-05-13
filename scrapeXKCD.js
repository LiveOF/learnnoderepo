import axios from "axios"
import * as cheerio from 'cheerio';
import fs from "fs"

if(!fs.existsSync('cache')){
    fs.mkdirSync("cache")
}

const cacheGet = (name) => {
    if (fs.existsSync("cache/" + name + ".html")){
        return fs.readFileSync("cache/" + name + ".html");
    }
    return false;
}

const cacheSet = (name, value) => {
    return fs.writeFileSync("cache/" + name + ".html", value);
}

for(let i = 3088; i>3078; i--){
    let data = cacheGet(i);
    if(!data){
        console.log(`Cashed data ${i}`)
        let res = await axios.get(`https://xkcd.com/${i}/`);
        data = res.data;
        cacheSet(i, data);
    }
    const $ = cheerio.load(data);
    let image_obj = $('#comic img')
    let src = image_obj.attr("src")
    let title = image_obj.attr("title")

    console.log(src, title)
    await new Promise(r => setTimeout(r, 1000));
}
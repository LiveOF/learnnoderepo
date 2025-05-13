import axios from "axios"
import * as cheerio from 'cheerio';
import fs from "fs"
import md5 from "md5"

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

let base_url = 'https://wumo.com';
let url = base_url
for(let i = 0; i<10; i++){
    let data = cacheGet(md5(url));
    if(!data){
        console.log(`Cashed data`);
        let res = await axios.get(url);
        data = res.data;
        cacheSet(md5(url), data);
    }
    const $ = cheerio.load(data);
    let img_data = $('article.wumo .box-content img');
    let img = img_data.attr('src');
    let alt = img_data.attr('alt');
    console.log(img, alt);
    let prev = $('article.wumo a.prev');
    url = base_url + prev.attr('href')
    console.log(`New url: ${url}`)
    await new Promise(r => setTimeout(r, 1000));
}
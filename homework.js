import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import md5 from "md5";

if (!fs.existsSync('cache')) {
    fs.mkdirSync('cache');
}

const cacheGet = (name) => {
    let file = "cache/" + name + ".html";
    if (fs.existsSync(file)) {
        return fs.readFileSync(file);
    }
    return false;
};

const cacheSet = (name, value) => {
    return fs.writeFileSync("cache/" + name + ".html", value);
};

let url = "https://www.smbc-comics.com/";

for (let i = 0; i < 10; i++) {
    let data = cacheGet(md5(url))
    if (!data){
        console.log('Cached data!');
        let res = await axios.get(url);
        data = res.data;
        cacheSet(md5(url), data);
    }
    const $ = cheerio.load(data);
    let img_data = $("img#cc-comic");
    let img = img_data.attr("src");
    let alt = img_data.attr("title");
    console.log(img, alt);
    let prev = $("a.cc-prev").attr("href");
    url = prev;
}

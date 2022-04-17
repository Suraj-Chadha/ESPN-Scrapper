const url = 'https://www.espncricinfo.com/series/indian-premier-league-2022-1298423';

const request = require("request");
const cheerio = require("cheerio");

request(url,cb);
function cb(err,res,body){
    if(err){
        console.error(err);
    }else if(res.statusCode == 404){
        console.log('page not found');
    }else{
        // console.log(body);
        getAllResultLink(body);
    }
}
function getAllResultLink(html){
    let $ = cheerio.load(html);
    // console.log($);
    let anchorEle = $('a[class="ds-block ds-text-center ds-uppercase ds-text-ui-typo-primary ds-underline-offset-4 hover:ds-underline hover:ds-decoration-ui-stroke-primary ds-block"]');
    let relativeLink = anchorEle.attr("href");
    // console.log(relativeLink);
    let fullLink =  `https://www.espncricinfo.com${relativeLink}`
    // console.log(fullLink);
    
}
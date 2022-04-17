const url = 'https://www.espncricinfo.com/series/indian-premier-league-2022-1298423';

const request = require("request");
const cheerio = require("cheerio");
const {getAllScoreCardLinks} = require("./getAllMatchSummaryLinks"); 

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
    let anchorEleArr = $('.ds-px-3.ds-py-2');
    let relativeLink = $(anchorEleArr[1]).attr("href");
    // console.log(relativeLink);
    let fullLink =  `https://www.espncricinfo.com${relativeLink}`
    // console.log(fullLink);
    // getAllScoreCardLinks(fullLink);
    request(fullLink,cb2);

}
function cb2(err,res,body){
    if(err){
        console.log(err);
    }else if(res.statusCode == 404){
        console.log('page not found');
    }else{
        getMatchResultLinks(body);
    }
}
function getMatchResultLinks(html){
    let $ = cheerio.load(html);
    // console.log("done");
    let divContainer = $('.ds-flex.ds-flex-row.ds-w-full.ds-overflow-x-auto.ds-scrollbar-hide');
    let anchorEleArr = divContainer.find('a');
    let relativeLink = $(anchorEleArr[1]).attr("href");
    // console.log(relativeLink);
    let fullLink = `https://www.espncricinfo.com${relativeLink}`;
    // console.log(fullLink);
    getAllScoreCardLinks(fullLink);
}
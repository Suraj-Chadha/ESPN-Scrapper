const request = require("request");
const cheerio = require("cheerio");
const {getAllDetails} = require("./getAllDetails");
function getAllScoreCardLinks(url){
    request(url,cb);
    function cb(err,res,body){
        if(err){
            console.error(err);
        }else if(res.statusCode == 404){
            console.log('page not found');
        }else{
            // console.log("found");
            getScoreCardLink(body);
        }
    }
    function getScoreCardLink(html){
        let $ = cheerio.load(html);
        let divContainerArray = $('.ds-flex.ds-mx-4.ds-pt-2.ds-pb-3.ds-space-x-4.ds-border-t.ds-border-line-default-translucent');
        // console.log(divContainerArray.length);
        for(let i = 0; i < divContainerArray.length; i++){
            let anchorEleArr = $(divContainerArray[i]).find('a');
            let relativeLink = $(anchorEleArr[2]).attr("href");
            // console.log(relativeLink);
            let fullLink = `https://www.espncricinfo.com${relativeLink}`;
            // console.log(fullLink);
            getAllDetails(fullLink);
            break;
        }
    }
}

module.exports = {
    getAllScoreCardLinks : getAllScoreCardLinks,
}
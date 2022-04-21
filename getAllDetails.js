const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
function getAllDetails(url){
    // console.log("in details",url);
    request(url,cb);
    function cb(err,res,body){
        if(err){
            console.log(err);
        }else if(res.statusCode == 404){
            console.log('Page Not Found');
        }else{
            // console.log(url);
            getDetails(body);
        }
    }
    function getDetails(html){
        let $ = cheerio.load(html);
        let results = $('.ds-text-tight-m.ds-font-regular.ds-text-ui-typo-mid');
        // console.log(results.text());
        let resultArr = results.text().split(', ');
        let Venue = resultArr[1];
        let Date = resultArr[2];
        let year = resultArr[3];
        let teamNamesArr = $('a[class="ds-text-ui-typo hover:ds-text-ui-typo-primary ds-block"]');
        let teamNames1 = $(teamNamesArr[0]).text();
        let teamNames2 = $(teamNamesArr[1]).text();
        // console.log(teamNames1, "vs", teamNames2);

        let res = $('.ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo-title');
        // console.log(res.text());
        // console.log(teamNames2);
        // console.log(Venue);
        // console.log(Date,year);
        let tableBody = $('.ReactCollapse--content>.ci-scorecard-table>tbody');
        // console.log(tableBody.length);
        // console.log($(tableBody[0]).find('tr').length);
       
        for(let i = 0; i < tableBody.length; i++){
            let trArray1 = $(tableBody[i]).find('tr');
            // console.log(i);
            if(i == 1){
                let temp = teamNames1;
                teamNames1 = teamNames2;
                teamNames2 = temp;
            }
        for(let i = 0; i < trArray1.length; i++){
                // console.log(i+1,$(trArray1[i]).text());
                // console.log("count");
                if($(trArray1[i]).hasClass('ds-text-tight-s') && $(trArray1[i]).text().split("(")[0] != "Extras"){
                    // console.log("count");
                    // console.log($(trArray1[i]).text());
                    let scoreCardArr = $(trArray1[i]).find('td');
                    // console.log(scoreCardArr.length);
                    let playerName = $(scoreCardArr[0]).text();
                    let runs = $(scoreCardArr[2]).text();
                    let balls = $(scoreCardArr[3]).text()
                    let numOf4s= $(scoreCardArr[5]).text();
                    let numOf6s = $(scoreCardArr[6]).text();
                    let sr = $(scoreCardArr[7]).text();
                    
                    // console.log($(scoreCardArr[7]).text());
                    // console.log(`PlayerName -> ${playerName} runs -> ${runs} balls -> ${balls} numOf4's -> ${numOf4s} numOf6's -> ${numOf6s} StrikeRate -> ${sr}`);
                    // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    processInformation(Date,Venue,teamNames1,teamNames2,res,playerName,runs,balls,numOf4s,numOf6s,sr);
                }

        }
    }
        

    }
    function processInformation(Date,Venue,ownTeam,opponentTeam,res,playerName,runs,balls,numOf4s,numOf6s,sr){
        // console.log(`PlayerName -> ${playerName} runs -> ${runs} balls -> ${balls} numOf4's -> ${numOf4s} numOf6's -> ${numOf6s} StrikeRate -> ${sr}`);
        // console.log(teamNames1);
        let teamNamePath = `${__dirname}/IPL/${ownTeam}`;
        if(!fs.existsSync(teamNamePath)){
            fs.mkdirSync(teamNamePath);
        }
    }
}

module.exports = {
    getAllDetails:getAllDetails,
}
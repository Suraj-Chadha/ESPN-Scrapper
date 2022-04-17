const cheerio = require("cheerio");
const request = require("request");

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
        let trArray1 = $(tableBody[0]).find('tr');
        console.log(trArray1.length);
        for(let i = 0; i < trArray1.length; i++){
                // console.log(i+1,$(trArray1[i]).text());

        }

    }
}

module.exports = {
    getAllDetails:getAllDetails,
}
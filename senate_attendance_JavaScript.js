// Watch out when using .childNodes[]
// there are lots of nodes which are invisible in the HTML tree, which this method accesses

// I had trouble with the sort() function for sorting the array of members by number of votes missed.
// What I had initially was this: myArray.sort(function(a, b){return myArray[b].missed_votes > myArray[a].missed_votes});
// This didn't work because it was too much information!!! (vasil helped me with this)
// Since I'm applying .sort to myArray, the 'sort' function knows that we're dealing with the members of that array.
////// https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
////// https://www.w3schools.com/js/js_array_sort.asp

// note this line of code:     var myArray = Array.from(members);
// here I create an entirely new array. New variable with new data. 
// initially i had this:        var myArray = members;
// this did not create new data. It only created a new REFERENCE to the same data.
// so if I made any changes to myArray, I'd have also made them to 'members'
// now these to variables are independent


var members = data.results[0].members;


document.getElementById("senate_gen_info").getElementsByTagName("tr")[0].childNodes[3].textContent="hello I'm Bjork";





function generalStatsByParty (){
    
    var arrayOfRepublicans =[];
    var arrayOfDemocrats =[];
    var arrayOfIndependents =[];
    
    for (i = 0; i < members.length; i++) {
        
        if (members[i].party == "D"){
            arrayOfDemocrats.push(members[i]);
        }
        else if (members[i].party == "R"){
            arrayOfRepublicans.push(members[i]);
        }
        else if (members[i].party == "I"){
            arrayOfIndependents.push(members[i]);
        }
    }
    
    document.getElementById("senate_gen_info").getElementsByTagName("tr")[0].childNodes[3].textContent=arrayOfRepublicans.length;
    document.getElementById("senate_gen_info").getElementsByTagName("tr")[1].childNodes[3].textContent=arrayOfDemocrats.length;
    document.getElementById("senate_gen_info").getElementsByTagName("tr")[2].childNodes[3].textContent=arrayOfIndependents.length;
    
    
    var repVWPTotal = 0;
    for (i=0; i<arrayOfRepublicans.length; i++){
        repVWPTotal += arrayOfRepublicans[i].votes_with_party_pct;    
    }
    var repVWPAvg = repVWPTotal/arrayOfRepublicans.length;
    document.getElementById("senate_gen_info").getElementsByTagName("tr")[0].childNodes[5].textContent=repVWPAvg.toFixed(2);
    
    
    var demVWPTotal = 0;
    for (i=0; i<arrayOfDemocrats.length; i++){
        demVWPTotal += arrayOfDemocrats[i].votes_with_party_pct;    
    }
    var demVWPAvg = demVWPTotal/arrayOfDemocrats.length;
    document.getElementById("senate_gen_info").getElementsByTagName("tr")[1].childNodes[5].textContent=demVWPAvg.toFixed(2);
    
    
    var indVWPTotal = 0;
    for (i=0; i<arrayOfIndependents.length; i++){
        indVWPTotal += arrayOfIndependents[i].votes_with_party_pct;    
    }
    var indVWPAvg = indVWPTotal/arrayOfIndependents.length;
    document.getElementById("senate_gen_info").getElementsByTagName("tr")[2].childNodes[5].textContent=indVWPAvg.toFixed(2);
    
    
    var totalRow = document.createElement("tr");
    
    var cellTotal = document.createElement("td");
    cellTotal.textContent = "Total";
    totalRow.appendChild(cellTotal);
    
    var cellTotalMembers = document.createElement("td");
    var totalNoOfMembers = arrayOfRepublicans.length + arrayOfDemocrats.length + arrayOfIndependents.length;
    cellTotalMembers.textContent = totalNoOfMembers;
    totalRow.appendChild(cellTotalMembers);
    
    var cellTotalVotePCT = document.createElement("td");
    var totalVotePCT = ((arrayOfRepublicans.length * repVWPAvg)+(arrayOfIndependents.length * indVWPAvg)+(arrayOfDemocrats.length * demVWPAvg))/totalNoOfMembers;
    cellTotalVotePCT.textContent = totalVotePCT.toFixed(2);
    totalRow.appendChild(cellTotalVotePCT);
    
    document.getElementById("senate_gen_info").appendChild(totalRow);
}

generalStatsByParty();







function createTableFromData (tableID, myArray){

    var tableBody = document.getElementById(tableID);    //// this needs to be a string !!
    
    for (i=0; i<myArray.length; i++){                        
        
        var tableRow = document.createElement("tr");
        
        var cellName = document.createElement("td");
        var cellVotesMissed = document.createElement("td");
        var cellPctMissed = document.createElement("td");
        var anchorLink = document.createElement("a");
          
        anchorLink.setAttribute('href', myArray[i].url);

        if (myArray[i].middle_name === null) {myArray[i].middle_name = "";}
        anchorLink.textContent = myArray[i].first_name + " " + myArray[i].middle_name + " " + myArray[i].last_name;

        cellName.appendChild(anchorLink);
        tableRow.appendChild(cellName);
        
        cellVotesMissed.textContent = myArray[i].missed_votes;
        tableRow.appendChild(cellVotesMissed);
        
        cellPctMissed.textContent = myArray[i].missed_votes_pct;
        tableRow.appendChild(cellPctMissed);
        
        tableBody.appendChild(tableRow);
    }
}




function senateWORSTattendance (){
    
    var cop = members.length/10;                    // cop = cut-off point = 11
    var cop = cop.toFixed(0);
    
    var myArray = Array.from(members);              // read notes on top

    myArray.sort(function (a, b) {                  // read notes for this one too 
        return b.missed_votes_pct - a.missed_votes_pct
    });
    
    var mostVotesMissed = myArray.slice(0, cop);    // create bottom 10% attendance
    
    for (i=cop; i<myArray.length; i++){             // add any additional members
        
        if (myArray[i].missed_votes_pct == mostVotesMissed[cop-1].missed_votes_pct){
            mostVotesMissed.push(myArray[i]);
        }
    }
    
    return mostVotesMissed;    
}



createTableFromData("senate_bottom_attendance", senateWORSTattendance());




function senateBESTattendance (){
    
    var cop = members.length/10;            
    var cop = cop.toFixed(0);
    
    var myArray = Array.from(members);           

    myArray.sort(function (a, b) {               
        return a.missed_votes_pct - b.missed_votes_pct
    });
    
    var topVotingSenators = myArray.slice(0, cop);   
    
    for (i=cop; i<myArray.length; i++){            
        
        if (myArray[i].missed_votes_pct == topVotingSenators[cop-1].missed_votes_pct){
            topVotingSenators.push(myArray[i]);
        }
    }
    
    return topVotingSenators;    
}



createTableFromData("senate_top_attendance", senateBESTattendance());






































//THIS IS MY ATTEMPT AT HAVING A GENERAL FUNCTION FOR CREATING A TOP OR BOT 10 PCT ARRAY
//
//var top10 = true;
//var bot10 = false;
//
//
//
//function getTopOrBotTenPCT (memberList, topORbot, comparisonVAR){           // eg: members, top10, "missed_votes"
//    
//    var cop = memberList.length/10;       
//    var cop = cop.toFixed(0);
//    
//    
//    var myArray = Array.from(memberList);           
//
//    
//    if (topORbot == true) {
//        
//        myArray.sort(function (a, b) {                
//            return a.comparisonVAR - b.comparisonVAR
//        });
//    }
//    else if (topORbot == false) {    
//                
//        myArray.sort(function (a, b) {                
//            return b.comparisonVAR - a.comparisonVAR
//        });
//    }
//    
//    
//    var tenPercent = myArray.slice(0, cop);    
//    
//    for (i=cop; i<myArray.length; i++){  
//        
//        if (myArray[i].comparisonVAR == tenPercent[cop-1].comparisonVAR){
//            tenPercent.push(myArray[i]);
//        }
//    }
//
//    return tenPercent;    
//    
//}












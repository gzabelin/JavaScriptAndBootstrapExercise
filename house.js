var fetchTime = localStorage.getItem("fetchTime");
console.log("this is fetch time: " + fetchTime);

var currentTime = Date.now();
console.log("this is current time: " + currentTime);

var elapsedTimeInMinutes = (currentTime-fetchTime)/(1000*60);
console.log("this is elapsed time in minutes: " + elapsedTimeInMinutes);


var checkDataAvailability = JSON.parse(localStorage.getItem("houseData"));

if ((checkDataAvailability == null) || (elapsedTimeInMinutes>1440)){
    
    console.log("fetching data");

    fetch ("https://api.propublica.org/congress/v1/113/house/members.json", {

        method: "GET",
        headers: {
            'X-API-Key': "KkP9lUsuKv81Rw5UTW7A5dBQqt2vAOpr0ECdyvea"
        }

    }).then(function (response){

        if (response.ok){
            return response.json();
        }
        throw new Error(response.statusText);

    }).then(function (json){

        window.localStorage.setItem("fetchTime", Date.now());
        
        var receivedData = json;
        window.localStorage.setItem("houseData", JSON.stringify(receivedData));
        var storedData = JSON.parse(localStorage.getItem("houseData"));
        var members = storedData.results[0].members;
        
        
        if (document.getElementById("pageBody") !== null){
        
            callVue(members);
            populateDropdownListOfStates(createArrayOfAmericanStates(members));}
        else{
            generalStatsByParty(members);
            }
        
        if (document.getElementById("bottom_attendance") !== null){
                createATTENDANCETableFromData("bottom_attendance", houseWORSTattendance(members));
                createATTENDANCETableFromData("top_attendance", houseBESTattendance(members));
        }
        else if (document.getElementById("bottom_loyalty") !== null){
                createLOYALTYTableFromData("top_loyalty", houseBESTloyalty(members));
                createLOYALTYTableFromData("bottom_loyalty", houseWORSTloyalty(members));
        }
        

    }).catch(function(error){

        console.log("Request failed: " + error.message);

    });
}

else {
        
    console.log(" retreiving data from local storage ");
    var storedData = JSON.parse(localStorage.getItem("houseData"));
    var members = storedData.results[0].members;
    
            if (document.getElementById("pageBody") !== null){
        
            callVue(members);
            populateDropdownListOfStates(createArrayOfAmericanStates(members));}
        else{
            generalStatsByParty(members);
            }
        
        if (document.getElementById("bottom_attendance") !== null){
                createATTENDANCETableFromData("bottom_attendance", houseWORSTattendance(members));
                createATTENDANCETableFromData("top_attendance", houseBESTattendance(members));
        }
        else if (document.getElementById("bottom_loyalty") !== null){
                createLOYALTYTableFromData("top_loyalty", houseBESTloyalty(members));
                createLOYALTYTableFromData("bottom_loyalty", houseWORSTloyalty(members));
        }
    
}




function callVue (members){  
        
    new Vue({
    
    el: "#pageBody",
    
    data: {
            houseMembers: members,
            demTick: false,
            repTick: false,
            indTick: false,
        
            stateBox: 'show_all'
        
    },
    
    methods: {}   
    
    });
    

}


function createArrayOfAmericanStates(members) {
    var arrayOfStates = [];
    for (i = 0; i < members.length; i++) {
        arrayOfStates.push(members[i].state);
    }
    arrayOfStates = arrayOfStates.sort();
    var arrayOfUniqueStates = [];
    for (i = 0; i < arrayOfStates.length; i++) {
        if (arrayOfStates[i] !== arrayOfStates[i + 1]) {
            arrayOfUniqueStates.push(arrayOfStates[i])
        }
    }
    return arrayOfUniqueStates;
}

function populateDropdownListOfStates(stateList) {
    var dropDownList = document.getElementById("statesDropdownBox");
    for (i = 0; i < stateList.length; i++) {
        var state = document.createElement("option");
        state.setAttribute("value", stateList[i]);
        state.textContent = stateList[i];
        dropDownList.appendChild(state);
    }
}






function generalStatsByParty (members){
    
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
    
    document.getElementById("gen_info").getElementsByTagName("tr")[0].childNodes[3].textContent=arrayOfRepublicans.length;
    document.getElementById("gen_info").getElementsByTagName("tr")[1].childNodes[3].textContent=arrayOfDemocrats.length;
    document.getElementById("gen_info").getElementsByTagName("tr")[2].childNodes[3].textContent=arrayOfIndependents.length;
    
    
    var repVWPTotal = 0;
    for (i=0; i<arrayOfRepublicans.length; i++){
        repVWPTotal += arrayOfRepublicans[i].votes_with_party_pct;    
    }
    var repVWPAvg = repVWPTotal/arrayOfRepublicans.length;
    document.getElementById("gen_info").getElementsByTagName("tr")[0].childNodes[5].textContent=repVWPAvg.toFixed(2);
    
    
    var demVWPTotal = 0;
    for (i=0; i<arrayOfDemocrats.length; i++){
        demVWPTotal += arrayOfDemocrats[i].votes_with_party_pct;    
    }
    var demVWPAvg = demVWPTotal/arrayOfDemocrats.length;
    document.getElementById("gen_info").getElementsByTagName("tr")[1].childNodes[5].textContent=demVWPAvg.toFixed(2);
    
    var indVWPTotal = 0;
    var indVWPAvg = 0;
    if (arrayOfIndependents.length<1){
        var indVWPAvg = 0;
    }
    else{ 
        for (i=0; i<arrayOfIndependents.length; i++){
            indVWPTotal += arrayOfIndependents[i].votes_with_party_pct;    
        }
        var indVWPAvg = indVWPTotal/arrayOfIndependents.length;
    }
    document.getElementById("gen_info").getElementsByTagName("tr")[2].childNodes[5].textContent=indVWPAvg.toFixed(2);
    
    
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
    
    document.getElementById("gen_info").appendChild(totalRow);
}





function createLOYALTYTableFromData (tableID, myArray){

    var tableBody = document.getElementById(tableID);   
    
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
        
        cellVotesMissed.textContent = myArray[i].total_votes;
        tableRow.appendChild(cellVotesMissed);
        
        cellPctMissed.textContent = myArray[i].votes_with_party_pct;
        tableRow.appendChild(cellPctMissed);
        
        tableBody.appendChild(tableRow);
    }
}


function houseBESTloyalty (members){
    
    var cop = members.length/10;                    
    var cop = cop.toFixed(0);
    
    var myArray = Array.from(members);             

    myArray.sort(function (a, b) {                   
        return b.votes_with_party_pct - a.votes_with_party_pct
    });
    
    var mostVotesMissed = myArray.slice(0, cop);  
    
    for (i=cop; i<myArray.length; i++){           
        
        if (myArray[i].votes_with_party_pct == mostVotesMissed[cop-1].votes_with_party_pct){
            mostVotesMissed.push(myArray[i]);
        }
    }
    
    return mostVotesMissed;    
}


function houseWORSTloyalty (members){
    
    var cop = members.length/10;            
    var cop = cop.toFixed(0);
    
    var myArray = Array.from(members);           

    myArray.sort(function (a, b) {               
        return a.votes_with_party_pct - b.votes_with_party_pct
    });
    
    var topVotingSenators = myArray.slice(0, cop);   
    
    for (i=cop; i<myArray.length; i++){            
        
        if (myArray[i].votes_with_party_pct == topVotingSenators[cop-1].votes_with_party_pct){
            topVotingSenators.push(myArray[i]);
        }
    }
    
    return topVotingSenators;    
}









function createATTENDANCETableFromData (tableID, myArray){

    var tableBody = document.getElementById(tableID);    
    
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


function houseWORSTattendance (members){
    
    var cop = members.length/10;                  
    var cop = cop.toFixed(0);
    
    var myArray = Array.from(members);            

    myArray.sort(function (a, b) {                
        return b.missed_votes_pct - a.missed_votes_pct
    });
    
    var mostVotesMissed = myArray.slice(0, cop);   
    
    for (i=cop; i<myArray.length; i++){           
        
        if (myArray[i].missed_votes_pct == mostVotesMissed[cop-1].missed_votes_pct){
            mostVotesMissed.push(myArray[i]);
        }
    }
    
    return mostVotesMissed;    
}


function houseBESTattendance (members){
    
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




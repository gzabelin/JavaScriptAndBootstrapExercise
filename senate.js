var checkDataAvailability = JSON.parse(localStorage.getItem("senateData"));

if (checkDataAvailability == null) {

    console.log("fetching data");

    fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {

        method: "GET",
        headers: {
            'X-API-Key': "KkP9lUsuKv81Rw5UTW7A5dBQqt2vAOpr0ECdyvea"
        }

    }).then(function (response) {

        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);

    }).then(function (json) {

        var receivedData = json;
        window.localStorage.setItem("senateData", JSON.stringify(receivedData));



        var storedData = JSON.parse(localStorage.getItem("senateData"));


        var members = storedData.results[0].members;




        if (document.getElementById("senate-table") !== null) {
            createHouseTable(members);
            setPoliticalClassesToDataRows();
            populateDropdownListOfStates(createArrayOfAmericanStates(members));

        } else {
            generalStatsByParty(members);
        }


        if (document.getElementById("senate_bottom_attendance") !== null) {
            createATTENDANCETableFromData("senate_bottom_attendance", senateWORSTattendance(members));
            createATTENDANCETableFromData("senate_top_attendance", senateBESTattendance(members));
        } else if (document.getElementById("senate_bottom_loyalty") !== null) {
            createLOYALTYTableFromData("senate_top_loyalty", senateBESTloyalty(members));
            createLOYALTYTableFromData("senate_bottom_loyalty", senateWORSTloyalty(members));
        }

    }).catch(function (error) {

        console.log("Request failed: " + error.message);

    });
} else {

    console.log(" retreiving data from local storage ");
    var storedData = JSON.parse(localStorage.getItem("senateData"));
    var members = storedData.results[0].members;



    if (document.getElementById("senate-table") !== null) {
        createHouseTable(members);
        setPoliticalClassesToDataRows();
        populateDropdownListOfStates(createArrayOfAmericanStates(members));

    } else {
        generalStatsByParty(members);
    }


    if (document.getElementById("senate_bottom_attendance") !== null) {
        createATTENDANCETableFromData("senate_bottom_attendance", senateWORSTattendance(members));
        createATTENDANCETableFromData("senate_top_attendance", senateBESTattendance(members));
    } else if (document.getElementById("senate_bottom_loyalty") !== null) {
        createLOYALTYTableFromData("senate_top_loyalty", senateBESTloyalty(members));
        createLOYALTYTableFromData("senate_bottom_loyalty", senateWORSTloyalty(members));
    }


}









function createHouseTable(members) {

    var tableBody = document.getElementById("senate-table");

    for (i = 0; i < members.length; i++) {


        var tableRow = document.createElement("tr");

        var cell1 = document.createElement("td");
        var cell4 = document.createElement("td");
        var cell5 = document.createElement("td");
        var cell6 = document.createElement("td");
        var cell7 = document.createElement("td");

        tableRow.appendChild(cell1);

        var anchorLink = document.createElement("a");
        anchorLink.setAttribute('href', members[i].url);

        if (members[i].middle_name === null) {
            members[i].middle_name = "";
        }

        anchorLink.textContent = members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name;

        cell1.appendChild(anchorLink);

        cell4.textContent = members[i].state;
        tableRow.appendChild(cell4);

        cell5.textContent = members[i].party;
        tableRow.appendChild(cell5);

        cell6.textContent = members[i].seniority;
        tableRow.appendChild(cell6);

        cell7.textContent = members[i].votes_with_party_pct;
        tableRow.appendChild(cell7);

        tableBody.appendChild(tableRow);


    }
}


function setPoliticalClassesToDataRows() {

    var numberOfRows = document.getElementById("senate-table").childElementCount;

    for (i = 0; i < numberOfRows; i++) {

        var houseTable = document.getElementById("senate-table");

        var dataRow = houseTable.getElementsByTagName("tr")[i];

        if (dataRow.childNodes[2].textContent === "D") {
            dataRow.setAttribute("class", "democrat_data_row");
        } else if (dataRow.childNodes[2].textContent === "R") {
            dataRow.setAttribute("class", "republican_data_row");
        } else {
            dataRow.setAttribute("class", "independent_data_row");
        }
    }
}



var checkBoxes = document.getElementById("party_filters").getElementsByTagName("input");

document.getElementById("party_filters").addEventListener("click", filterByPartyAndState);


function createArrayOfAmericanStates(members) {

    var arrayOfStates = [];

    for (i = 0; i < members.length; i++) {
        arrayOfStates.push(members[i].state); // create an array of all states
    }

    arrayOfStates = arrayOfStates.sort(); // sort array alphabetically

    var arrayOfUniqueStates = [];

    for (i = 0; i < arrayOfStates.length; i++) {
        if (arrayOfStates[i] !== arrayOfStates[i + 1]) {
            arrayOfUniqueStates.push(arrayOfStates[i]) // push unique items to new array
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


document.getElementById("statesDropdownBox").addEventListener("change", filterByPartyAndState);


function filterByPartyAndState() {

    var filthySocialists = document.getElementsByClassName("democrat_data_row");
    var illiberalBigots = document.getElementsByClassName("republican_data_row");
    var notRealPoliticians = document.getElementsByClassName("independent_data_row");

    var selectedOption = document.getElementById("statesDropdownBox").value;
    var numberOfRows = document.getElementById("senate-table").childElementCount;
    var dataRow = document.getElementById("senate-table").getElementsByTagName("tr");


    if (checkBoxes[0].checked !== true) {
        console.log("dems are unchecked -- they should be hidden");
        for (i = 0; i < filthySocialists.length; i++) {
            filthySocialists[i].classList.add("hidden");
        }
    } else if (checkBoxes[0].checked == true) {
        console.log("dems are checked -- you should see them");
        for (i = 0; i < filthySocialists.length; i++) {
            filthySocialists[i].classList.remove("hidden");
        }
    }


    if (checkBoxes[1].checked !== true) {
        console.log("reps are unchecked -- they should be hidden");
        for (i = 0; i < illiberalBigots.length; i++) {
            illiberalBigots[i].classList.add("hidden");
        }
    } else if (checkBoxes[1].checked == true) {
        console.log("reps are checked -- you should see them");
        for (i = 0; i < illiberalBigots.length; i++) {
            illiberalBigots[i].classList.remove("hidden");
        }
    }

    if (checkBoxes[2].checked !== true) {
        console.log("indies are unchecked -- you shouldnt see them");
        for (i = 0; i < notRealPoliticians.length; i++) {
            notRealPoliticians[i].classList.add("hidden");
        }
    } else if (checkBoxes[2].checked == true) {
        console.log("indies are checked -- you should see them");
        for (i = 0; i < notRealPoliticians.length; i++) {
            notRealPoliticians[i].classList.remove("hidden");
        }
    }

    if ((checkBoxes[0].checked !== true) && (checkBoxes[1].checked !== true) && (checkBoxes[2].checked !== true)) {

        for (i = 0; i < illiberalBigots.length; i++) {
            illiberalBigots[i].classList.remove("hidden");
        }

        for (i = 0; i < notRealPoliticians.length; i++) {
            notRealPoliticians[i].classList.add("hidden");
        }

        for (i = 0; i < filthySocialists.length; i++) {
            filthySocialists[i].classList.remove("hidden");
        }

        // not sure why this doesn't work... Probably because of different class list lengths
        // but it seems a bit wasteful to have 3 for loops


        //           for (i = 0; i < members.length; i++) {
        //               filthySocialists[i].classList.remove("hidden");
        //               illiberalBigots[i].classList.remove("hidden");
        //               notRealPoliticians[i].classList.remove("hidden");
        //           }

    }

    for (i = 0; i < numberOfRows; i++) {
        if (selectedOption === "show_all") {
            break;
        } else if (dataRow[i].childNodes[1].textContent !== selectedOption) {
            dataRow[i].classList.add("hidden");
        }
    }

}







function generalStatsByParty(members) {

    var arrayOfRepublicans = [];
    var arrayOfDemocrats = [];
    var arrayOfIndependents = [];

    for (i = 0; i < members.length; i++) {

        if (members[i].party == "D") {
            arrayOfDemocrats.push(members[i]);
        } else if (members[i].party == "R") {
            arrayOfRepublicans.push(members[i]);
        } else if (members[i].party == "I") {
            arrayOfIndependents.push(members[i]);
        }
    }

    document.getElementById("senate_gen_info").getElementsByTagName("tr")[0].childNodes[3].textContent = arrayOfRepublicans.length;
    document.getElementById("senate_gen_info").getElementsByTagName("tr")[1].childNodes[3].textContent = arrayOfDemocrats.length;
    document.getElementById("senate_gen_info").getElementsByTagName("tr")[2].childNodes[3].textContent = arrayOfIndependents.length;


    var repVWPTotal = 0;
    for (i = 0; i < arrayOfRepublicans.length; i++) {
        repVWPTotal += arrayOfRepublicans[i].votes_with_party_pct;
    }
    var repVWPAvg = repVWPTotal / arrayOfRepublicans.length;
    document.getElementById("senate_gen_info").getElementsByTagName("tr")[0].childNodes[5].textContent = repVWPAvg.toFixed(2);


    var demVWPTotal = 0;
    for (i = 0; i < arrayOfDemocrats.length; i++) {
        demVWPTotal += arrayOfDemocrats[i].votes_with_party_pct;
    }
    var demVWPAvg = demVWPTotal / arrayOfDemocrats.length;
    document.getElementById("senate_gen_info").getElementsByTagName("tr")[1].childNodes[5].textContent = demVWPAvg.toFixed(2);


    var indVWPTotal = 0;
    for (i = 0; i < arrayOfIndependents.length; i++) {
        indVWPTotal += arrayOfIndependents[i].votes_with_party_pct;
    }
    var indVWPAvg = indVWPTotal / arrayOfIndependents.length;
    document.getElementById("senate_gen_info").getElementsByTagName("tr")[2].childNodes[5].textContent = indVWPAvg.toFixed(2);


    var totalRow = document.createElement("tr");

    var cellTotal = document.createElement("td");
    cellTotal.textContent = "Total";
    totalRow.appendChild(cellTotal);

    var cellTotalMembers = document.createElement("td");
    var totalNoOfMembers = arrayOfRepublicans.length + arrayOfDemocrats.length + arrayOfIndependents.length;
    cellTotalMembers.textContent = totalNoOfMembers;
    totalRow.appendChild(cellTotalMembers);

    var cellTotalVotePCT = document.createElement("td");
    var totalVotePCT = ((arrayOfRepublicans.length * repVWPAvg) + (arrayOfIndependents.length * indVWPAvg) + (arrayOfDemocrats.length * demVWPAvg)) / totalNoOfMembers;
    cellTotalVotePCT.textContent = totalVotePCT.toFixed(2);
    totalRow.appendChild(cellTotalVotePCT);

    document.getElementById("senate_gen_info").appendChild(totalRow);
}


function createLOYALTYTableFromData(tableID, myArray) {

    var tableBody = document.getElementById(tableID);

    for (i = 0; i < myArray.length; i++) {

        var tableRow = document.createElement("tr");

        var cellName = document.createElement("td");
        var cellVotesMissed = document.createElement("td");
        var cellPctMissed = document.createElement("td");
        var anchorLink = document.createElement("a");

        anchorLink.setAttribute('href', myArray[i].url);

        if (myArray[i].middle_name === null) {
            myArray[i].middle_name = "";
        }
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


function senateBESTloyalty(members) {

    var cop = members.length / 10; // cop = cut-off point = 11
    var cop = cop.toFixed(0);

    var myArray = Array.from(members); // read notes on top

    myArray.sort(function (a, b) { // read notes for this one too 
        return b.votes_with_party_pct - a.votes_with_party_pct
    });

    var mostVotesMissed = myArray.slice(0, cop); // create bottom 10% attendance

    for (i = cop; i < myArray.length; i++) { // add any additional members

        if (myArray[i].votes_with_party_pct == mostVotesMissed[cop - 1].votes_with_party_pct) {
            mostVotesMissed.push(myArray[i]);
        }
    }

    return mostVotesMissed;
}


function senateWORSTloyalty(members) {

    var cop = members.length / 10;
    var cop = cop.toFixed(0);

    var myArray = Array.from(members);

    myArray.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct
    });

    var topVotingSenators = myArray.slice(0, cop);

    for (i = cop; i < myArray.length; i++) {

        if (myArray[i].votes_with_party_pct == topVotingSenators[cop - 1].votes_with_party_pct) {
            topVotingSenators.push(myArray[i]);
        }
    }
    return topVotingSenators;
}





function createATTENDANCETableFromData(tableID, myArray) {

    var tableBody = document.getElementById(tableID); //// this needs to be a string !!

    for (i = 0; i < myArray.length; i++) {

        var tableRow = document.createElement("tr");

        var cellName = document.createElement("td");
        var cellVotesMissed = document.createElement("td");
        var cellPctMissed = document.createElement("td");
        var anchorLink = document.createElement("a");

        anchorLink.setAttribute('href', myArray[i].url);

        if (myArray[i].middle_name === null) {
            myArray[i].middle_name = "";
        }
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

function senateWORSTattendance(members) {

    var cop = members.length / 10; // cop = cut-off point = 11
    var cop = cop.toFixed(0);

    var myArray = Array.from(members); // read notes on top

    myArray.sort(function (a, b) { // read notes for this one too 
        return b.missed_votes_pct - a.missed_votes_pct
    });

    var mostVotesMissed = myArray.slice(0, cop); // create bottom 10% attendance

    for (i = cop; i < myArray.length; i++) { // add any additional members

        if (myArray[i].missed_votes_pct == mostVotesMissed[cop - 1].missed_votes_pct) {
            mostVotesMissed.push(myArray[i]);
        }
    }

    return mostVotesMissed;
}

function senateBESTattendance(members) {

    var cop = members.length / 10;
    var cop = cop.toFixed(0);

    var myArray = Array.from(members);

    myArray.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct
    });

    var topVotingSenators = myArray.slice(0, cop);

    for (i = cop; i < myArray.length; i++) {

        if (myArray[i].missed_votes_pct == topVotingSenators[cop - 1].missed_votes_pct) {
            topVotingSenators.push(myArray[i]);
        }
    }

    return topVotingSenators;
}

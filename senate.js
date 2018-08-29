
        //        document.getElementById("senate-data").innerHTML = JSON.stringify(data,null,2);
        //        
        //                
        //        
        //        var myObject = {
        //            name: "bob",
        //            age: 25
        //            
        //            
        //        }
        //        
        //        var tBody = document.getElementById("myTable");
        //        var tableRow = document.createElement("tr");
        //        var tdName = document.createElement("td");
        //        
        //        tdName.textContent = myObject.name;
        //        tableRow.appendChild(tdName);
        //        tBody.appendChild(tableRow);  
        //        
        //        





        var tableBody = document.getElementById("senate-table");




        for (i = 0; i < data.results[0].members.length; i++) {


            var tableRow = document.createElement("tr");

            var cell1 = document.createElement("td");
            var cell4 = document.createElement("td");
            var cell5 = document.createElement("td");
            var cell6 = document.createElement("td");
            var cell7 = document.createElement("td");

            tableRow.appendChild(cell1);
            
            var anchorLink = document.createElement("a");
            anchorLink.setAttribute('href', data.results[0].members[i].url);

            if (data.results[0].members[i].middle_name === null) {
                data.results[0].members[i].middle_name = "";
            }

            anchorLink.textContent = data.results[0].members[i].first_name + " " + data.results[0].members[i].middle_name + " " + data.results[0].members[i].last_name;

            cell1.appendChild(anchorLink);

            cell4.textContent = data.results[0].members[i].state;
            tableRow.appendChild(cell4);

            cell5.textContent = data.results[0].members[i].party;
            tableRow.appendChild(cell5);

            cell6.textContent = data.results[0].members[i].seniority;
            tableRow.appendChild(cell6);

            cell7.textContent = data.results[0].members[i].votes_with_party_pct;
            tableRow.appendChild(cell7);

            tableBody.appendChild(tableRow);


        }


        

var members = data.results[0].members;        
        
        
        
function setPoliticalClassesToDataRows (){
    
    var numberOfRows = document.getElementById("senate-table").childElementCount;
    
    for (i=0; i<numberOfRows; i++){                       
        
        var houseTable = document.getElementById("senate-table");     
        
        var dataRow = houseTable.getElementsByTagName("tr")[i];     
        
        if (dataRow.childNodes[2].textContent === "D") {                 
            dataRow.setAttribute("class", "democrat_data_row");
        }
        
        else if (dataRow.childNodes[2].textContent === "R") {
            dataRow.setAttribute("class", "republican_data_row");
        }

        else{
            dataRow.setAttribute("class", "independent_data_row");
        }
    }
}

setPoliticalClassesToDataRows();

        

        
var checkBoxes = document.getElementById("party_filters").getElementsByTagName("input");        
        
        
document.getElementById("party_filters").addEventListener("click", filterByPartyAndState);
        
        
        
        
        
        
 


function createArrayOfAmericanStates (){
    
    var arrayOfStates = [];
    
    for (i=0; i < members.length; i++){
        arrayOfStates.push(members[i].state);                  // create an array of all states
    }
    
    arrayOfStates= arrayOfStates.sort();                       // sort array alphabetically
            
    var arrayOfUniqueStates = [];
    
    for (i=0; i<arrayOfStates.length; i++){
        if (arrayOfStates[i] !== arrayOfStates[i+1]){
            arrayOfUniqueStates.push(arrayOfStates[i])         // push unique items to new array
        }
    }
    return arrayOfUniqueStates;
}



function populateDropdownListOfStates (stateList){

    var dropDownList = document.getElementById("statesDropdownBox");
    
    for (i=0; i<stateList.length; i++){
        
        var state = document.createElement("option");
            
        state.setAttribute("value", stateList[i]); 
        state.textContent = stateList[i];
        
        dropDownList.appendChild(state);
    }
}

populateDropdownListOfStates(createArrayOfAmericanStates());

document.getElementById("statesDropdownBox").addEventListener("change", filterByPartyAndState);         // event triggered by a change. note it's not "onchange". 



function filterByPartyAndState (){
       
    var filthySocialists = document.getElementsByClassName("democrat_data_row");
    var illiberalBigots = document.getElementsByClassName("republican_data_row");
    var notRealPoliticians = document.getElementsByClassName("independent_data_row");
    
    var selectedOption = document.getElementById("statesDropdownBox").value;
    var numberOfRows = document.getElementById("senate-table").childElementCount;
    var dataRow = document.getElementById("senate-table").getElementsByTagName("tr");
    
    
    
    if (checkBoxes[0].checked !==true ){
        console.log("dems are unchecked -- they should be hidden");
        for (i=0; i<filthySocialists.length; i++){
             filthySocialists[i].classList.add("hidden");             
        }  
    }
    else if (checkBoxes[0].checked ==true) {
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
    }
    else if (checkBoxes[1].checked ==true) {
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
    } 
    
    else if (checkBoxes[2].checked ==true) {
        console.log("indies are checked -- you should see them");
        for (i = 0; i < notRealPoliticians.length; i++) {
            notRealPoliticians[i].classList.remove("hidden");
        }
    }
    
    
    
    for (i = 0; i < numberOfRows; i++) {                                       
        if (selectedOption==="show_all"){
            break;    
        }
        
        else if (dataRow[i].childNodes[1].textContent !== selectedOption) {
            dataRow[i].classList.add("hidden");
        } 
    }
    
}


      
        
        
        
        
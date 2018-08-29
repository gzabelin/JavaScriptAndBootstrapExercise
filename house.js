var members = data.results[0].members;




function createHouseTable (members){
        
    
    
    
        var tableBody = document.getElementById("house-table");    
    
        

    
//        var cleanTable = tableBody.getElementsByTagName("tr");
//    
//
//        if (cleanTable.length>0){
//                for (i=0; i<cleanTable.length; i++){
//                    
//                    //var tableRow = cleanTable[i];
//                    //tableBody.removeChild(tableRow);
//                    
//                    var element = cleanTable[i];
//                    element.className = 'hidden';
    
                    //alternative to "hidden" class: 
                      //  element.style.display = ""
//                    
//                }
//            }
//    
//    
//    THE SOLUTION WITH cleanTable[i] WAS NOT WORKING
//    BECAUSE BY DELETING CHILDREN FROM THE ARRAY, I WAS CHANGING THE LENGTH OF THE ARRAY
    
    
        
        
        var cleanTable = tableBody.getElementsByTagName("tr");
    
    
        if (cleanTable.length>0){
            for (i=cleanTable.length; i>0; i--){
                tableBody.removeChild(cleanTable[0]); 
                 console.log("length before compiling array: " + cleanTable.length);
                
            }
        }

    
    

        
    

    
        
    //THIS SOLUTION WORKS
      //  tableBody.innerHTML = "";


    

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
//            console.log("length after compiling array: " + cleanTable.length);
}












createHouseTable (members);









//document.getElementById("dem").addEventListener("click", listDems);
//    
//function listDems() {
//
//    var demsOnly = [];
//        
//        for (i = 0; i < members.length; i++) {
//
//            if (members[i].party === "D") {
//                
//                demsOnly.push(members[i]);
//            }
//        }
//    createHouseTable (demsOnly);
//}










function setPoliticalClassesToDataRows (){
    
    var numberOfRows = document.getElementById("house-table").childElementCount;
    
    
    for (i=0; i<numberOfRows; i++){                       
        
        
        var houseTable = document.getElementById("house-table");     
        
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









var dataRow = document.getElementsByTagName("tr")[2];    ////////////// this works!!!


// console.log(dataRow.childNodes[0].textContent);     /// this gets me the name of the senator in the specified Data Row. 

// console.log(dataRow.childNodes[0].nodeValue); /////why null? 

















//window.addEventListener("load", tickAllBoxes);                                   // this one isn't necessary any more

function tickAllBoxes(){
    
    var partyCheckboxes = party_filters.getElementsByTagName("input");
        
    for (i=0; i<partyCheckboxes.length; i++){
        
     //   partyCheckboxes[i].setAttribute(":checked");
            
            partyCheckboxes[i].checked = true;
       
    }
}





var checkBoxes = document.getElementById("party_filters").getElementsByTagName("input");        // SADLY I CANT ADD EVENTLISTENER TO VAR CHECKBOXES :( 

//checkBoxes[1].setAttribute("class", "setting some checkbox classes")





document.getElementById("party_filters").addEventListener("click", filterByPartyAndState);



function removeDirtySocialists(){

    console.log("a click has been made!");
    
    
    var filthySocialists = document.getElementsByClassName("democrat_data_row");
    
    
   // if (checkBoxes[0].hasAttribute("checked") !== 'true'){
    
    if (checkBoxes[0].checked !==true){
        
        console.log("if statement engaged");
        
        for (i=0; i<filthySocialists.length; i++){
             filthySocialists[i].classList.add("hidden");                                    // now this works! 
        }    
        
//        document.getElementsByClassName("democrat_data_row").setAttribute("class", "hidden");     // doesnt work because i need a loop
        
//        for (i=filthySocialists.length; i>0; i--){
//            
//             filthySocialists[0].setAttribute("class", "hidden");                         // this works
//            
//            // filthySocialists[0].classList.add("hidden");                               // this doesn't work :( 
//      
//        }   
//      
    }
    
    else {
            console.log("else statement engaged");

            for (i = 0; i < filthySocialists.length; i++) {
                filthySocialists[i].classList.remove("hidden");
            }
        }
}











// I HAVE A BUG


// IF THE INDPENDENT BOX IS UNTICKED,
// AND THE REPUBLICAN BOX ALSO GETS UNTICKED

// THEN CLICKING ON THE REPUBLICAN BOX AGAIN DOES NOT UNHIDE THEM


// ...... :( 














function filterByParty(){

    
    
    console.log("a click has been made!");
    
    
    var filthySocialists = document.getElementsByClassName("democrat_data_row");
    
    var illiberalBigots = document.getElementsByClassName("republican_data_row");
    
    var notRealPoliticians = document.getElementsByClassName("independent_data_row");
    
    
    
    

    
    if (checkBoxes[0].checked !==true){
        
        console.log("hiding the socialists");
        
        for (i=0; i<filthySocialists.length; i++){
             filthySocialists[i].classList.add("hidden");             
        }    
        

    }
    
    else if (checkBoxes[0].checked ==true) {
            console.log("unhiding the socialists");

            for (i = 0; i < filthySocialists.length; i++) {
                filthySocialists[i].classList.remove("hidden");
            }
        }
    
        
    
    
    if (checkBoxes[1].checked !== true) {

        console.log("hiding the bigots");

        for (i = 0; i < illiberalBigots.length; i++) {
            illiberalBigots[i].classList.add("hidden"); 
        }
    } 
    
    else if (checkBoxes[2].checked ==true) {
        console.log("unmasking the bigots");

        for (i = 0; i < illiberalBigots.length; i++) {
            illiberalBigots[i].classList.remove("hidden");
        }
    }




    if (checkBoxes[2].checked !== true) {

        console.log("hiding the pretend-politicians");

        for (i = 0; i < notRealPoliticians.length; i++) {
            notRealPoliticians[i].classList.add("hidden"); 
        }
    } 
    
    else if (checkBoxes[2].checked ==true) {
        console.log("unhiding the pretend-politicians");

        for (i = 0; i < notRealPoliticians.length; i++) {
            notRealPoliticians[i].classList.remove("hidden");
        }
    }
    
    
    
    if (checkBoxes[0].checked !== true && checkBoxes[1].checked !== true && checkBoxes[2].checked !== true){
        
        
        console.log('displaying the full spectrum of American """""""politics""""""" ');
        
        for (i = 0; i < filthySocialists.length; i++) {
                filthySocialists[i].classList.remove("hidden");
        }
        
        for (i = 0; i < illiberalBigots.length; i++) {
            illiberalBigots[i].classList.remove("hidden");
        }
        
        for (i = 0; i < notRealPoliticians.length; i++) {
            notRealPoliticians[i].classList.remove("hidden");
        }

    }    
}


















function createArrayOfAmericanStates (){
    
    var arrayOfStates = [];
    
    for (i=0; i < members.length; i++){
        arrayOfStates.push(members[i].state);                  // create an array of all states
    }
    
    arrayOfStates= arrayOfStates.sort();                       // sort array alphabetically
    
//    return arrayOfStates.join(", ");
    
    
    var arrayOfUniqueStates = [];
    
    for (i=0; i<arrayOfStates.length; i++){
        
        if (arrayOfStates[i] !== arrayOfStates[i+1]){
            
            arrayOfUniqueStates.push(arrayOfStates[i])         // push unique items to new array
        }
    }

    return arrayOfUniqueStates;
}

//      console.log(createArrayOfAmericanStates());















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



function filterByState() {
    
    

    
    
//    console.log("a click has been made on the dropdown box");
    
    var selectedOption = document.getElementById("statesDropdownBox").value;
    
//    console.log(selectedOption);
  

    var numberOfRows = document.getElementById("house-table").childElementCount;
   
    
    if (selectedOption==="show_all"){                                                           // unhides all rows if "all states" is clicked
        
        for (i=0; i<numberOfRows; i++){
            var dataRow = document.getElementById("house-table").getElementsByTagName("tr")[i];     
            dataRow.classList.remove("hidden");
        }
    }
    
    else{                                                                                       // this happens if a particular state is selected
       
        for (i=0; i<numberOfRows; i++){                       

                var dataRow = document.getElementById("house-table").getElementsByTagName("tr")[i];
          
            
            // dataRow is defined  
                                                   // all rows are unhidden for the purpose of refreshing

            if (dataRow.childNodes[1].textContent !== selectedOption) {   
                 // all rows that dont match selection are hidden
                dataRow.classList.add("hidden");
            }else  {
                 console.log(dataRow.childNodes[1].textContent )
                   dataRow.classList.remove("hidden");            
            }      
        
        
        
        }
    }
    
}








function filterByPartyAndState (){
       
    var filthySocialists = document.getElementsByClassName("democrat_data_row");
    var illiberalBigots = document.getElementsByClassName("republican_data_row");
    var notRealPoliticians = document.getElementsByClassName("independent_data_row");
    
    var selectedOption = document.getElementById("statesDropdownBox").value;
    var numberOfRows = document.getElementById("house-table").childElementCount;
    var dataRow = document.getElementById("house-table").getElementsByTagName("tr");
    
    
    
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






























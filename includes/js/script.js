//alert("Test")
//Declare variables
let dailyHours = ["12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"]
let plannerTable = $("#plannerTable");                  //The section for the normal business hours events  
let earlyMornTable = $("#earlyMornTable");              //The section for the early morning events   
let lateAfterTable = $("#lateAfterTable");              //The section for the late afternoon events
let plannerContent = $('#plannerContent');              //THe content div where the evnt items will display
let minusOneDay = $("#minusOneDay");                    //Button for backing up one day  
let plusOneDay = $("#addOneDay");                       //Button for advancing one day
let plannerRowContent = "";                             // used to store the event description text
let dailyEvents = {};                                   //object to store event data (time and description)
let eventDate = dayjs().format('ddd, MMM DD, YYYY')     //the event date that is displayed in the JumboTron

//Get the current date and load it into the jumboTron
let plannerDate = $('#currentDay');
plannerDate.text(eventDate)
plannerDate.append()

//Code to save user input when any of the save buttons are clicked.
plannerTable.on('click', '.saveBtn', function () {
    saveEventDesc()
});

//Code to back the calendar up one day.
minusOneDay.on('click', function () {
    eventDate = dayjs(eventDate).subtract(1, 'day').format('ddd, MMM DD, YYYY')
    plannerDate.text(eventDate)
    plannerDate.append()
    loadEventDesc()
});

//Code to advance the calendar one day.
plusOneDay.on('click', function () {
    eventDate = dayjs(eventDate).add(1, 'day').format('ddd, MMM DD, YYYY')
    plannerDate.text(eventDate)
    plannerDate.append()
    loadEventDesc()
});

//Build the 3 tables for the time slots in 1 hour increments, display hour, Event Text and a Save button.
// table for early morning hours, normal business hours and late evening hours
for (let i = 0; i <= dailyHours.length; i++) {
    plannerRowContent = (`<tr id='rowDesc${[i]}' class='row p-3'>`);
    plannerRowContent += (`<td id='rowHour${[i]}' style="width: 15%" class='hour' >${dailyHours[i]}</td>`);
    plannerRowContent += (`<td id='rowEvent${[i]}' style="width: 70%" class='description'><textarea  placeholder='Enter your event text here' cols=50></textarea></td>`);
    plannerRowContent += (`<td id='rowSave${[i]}' style="width: 15%" class='btn saveBtn'>Save</td>`);
    plannerRowContent += ("</tr>");
    if (i < 8) {
        earlyMornTable.append(plannerRowContent)
    }
    else if (i > 18) {
        lateAfterTable.append(plannerRowContent)
    }
    else {
        plannerTable.append(plannerRowContent)
    }
}

//Format the background color of the event text area based on past, present or future.
let plannerRow = plannerContent.find('tr')
let plannerEvent = $('td[class*="desc"]')
for (let i = 0; i < plannerEvent.length; i++) {
    if (i === (parseInt(dayjs().format('H')))) {
        $(`#${plannerEvent[i].id}`).addClass("present")
    }
    else if (i < (parseInt(dayjs().format('H')))) {
        $(`#${plannerEvent[i].id}`).addClass("past")
    }
    else {
        $(`#${plannerEvent[i].id}`).addClass("future")
    }
}

//The save daily events description function will save the user input to local storage
function saveEventDesc() {
    for (let i = 0; i <= dailyHours.length; i++) {
        eventDescText = $(`#rowEvent${[i]} textarea`).val()
        evntDescProp = `rowEvent${[i]}`
        dailyEvents[evntDescProp] = eventDescText
        localStorage.setItem(plannerDate.text(), JSON.stringify(dailyEvents));
    }
    alert("Changes have been saved.")
}

//function to retrieve the saved event description, that is stored in local storage
function loadEventDesc() {
    // alert(plannerDate.text())
    dailyEvents = {}
    dailyEvents = JSON.parse(localStorage.getItem(plannerDate.text()));
    console.log(dailyEvents)
    if (dailyEvents) {
        for (let key in dailyEvents) {
            $(`#${key} textarea`).val(dailyEvents[key])
        }
    }
    else {
        alert("need to reset the event date")
    }
}
//Invoke the loadEventDesc function to load the event desc text into their respective rows in the
loadEventDesc()
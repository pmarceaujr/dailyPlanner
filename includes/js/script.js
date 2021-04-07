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

//Code to save user input when a save button is clicked on the normal business hours table.
plannerTable.on('click', '.saveBtn', function (event) {
    event.preventDefault();
    saveEventDesc(event)
});

//Code to save user input when a save button is clicked on the early morning business hours table.
earlyMornTable.on('click', '.saveBtn', function (event) {
    event.preventDefault();
    saveEventDesc(event)
});

//Code to save user input when a save button is clicked on the after hours business hours table.
lateAfterTable.on('click', '.saveBtn', function (event) {
    event.preventDefault();
    saveEventDesc(event)
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
for (let i = 0; i < dailyHours.length; i++) {
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
function saveEventDesc(event) {
    let clickedSave = event.target;
    let rowEventId = $(clickedSave).prev().attr('id');
    eventDescText = $(`#${rowEventId} textarea`).val()
    //check if the user enterd an event for the save button clicked
    if (eventDescText) {
        evntDescProp = rowEventId
        if (!dailyEvents) {
            dailyEvents = {}
        }
        dailyEvents[evntDescProp] = eventDescText
        localStorage.setItem(plannerDate.text(), JSON.stringify(dailyEvents));
        alert("Changes have been saved.")
    }
    else {
        //if no data enterd for the event for the save button clicked, alert the user they clicked the wrong save
        alert("Please enter an event descrption before clicking SAVE.")
    }
}

//function to retrieve the saved event description, that is stored in local storage
function loadEventDesc() {
    dailyEvents = {}
    //if this is getting called it's to load the events, so we set them all to empty string
    for (let i = 0; i <= dailyHours.length; i++) {
        $(`#rowEvent${i} textarea`).val("")
    }
    //load the daily events for the time slots specified in the date object stored in local storage
    dailyEvents = JSON.parse(localStorage.getItem(plannerDate.text()));
    console.log(dailyEvents)
    if (dailyEvents) {
        for (let key in dailyEvents) {
            $(`#${key} textarea`).val(dailyEvents[key])
        }
    }
}
//Invoke the loadEventDesc function to load the event desc text into their respective rows in the
loadEventDesc()
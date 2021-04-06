//alert("Test")
//Declare variables
let dailyHours = ["12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"]
let plannerTable = $("#plannerTable");
//let plannerBody = $("#plannerTBody")
let earlyMornTable = $("#earlyMornTable");
//let earlyMornBody = $("#earlyMornBody")
let lateAfterTable = $("#lateAfterTable");
//let lateAfterBody = $("#lateAfterBody")
let plannerContent = $('#plannerContent')
//let plannerRow1 = $("<tr>")
//console.log(plannerRow1)
let plannerRowContent = "";
//let
//Get the current date and load it into the jumboTron
let plannerDate = $('#currentDay');
plannerDate.text(dayjs().format('ddd, MMM DD, YYYY'))
plannerDate.append()

//alert(dayjs('01/01/2000 13:15:22'))

for (let i = 0; i <= 23; i++) {
    plannerRowContent = (`<tr id='rowDesc${[i]}' class='row p-3'>`);
    plannerRowContent += (`<td id='rowHour${[i]}' class='hour' >${dailyHours[i]}</td>`);
    plannerRowContent += (`<td id='rowEvent${[i]}' class='description'><textarea  placeholder='Enter your event text here' cols=50></textarea></td>`);
    plannerRowContent += (`<td id='rowSave${[i]}' class='saveBtn'>Save</td>`);
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

let plannerRow = plannerContent.find('tr')
let plannerEvent = $('td[class*="desc"]')
console.log(`length: ${plannerEvent.length}`)
console.log(`event: ${plannerEvent}`)
for (let i = 0; i < plannerEvent.length; i++) {
    //console.log(plannerRow.find(`#rowEvent${i}`))
    // let rowEventId = plannerRow.find(`#rowEvent${i}`).id
    // console.log(`rowevent: ${rowEvent}`)
    if (i === (parseInt(dayjs('01/01/2000 10:15:22').format('H')))) {
        $(`#${plannerEvent[i].id}`).addClass("present")
    }
    else if (i < (parseInt(dayjs('01/01/2000 10:15:22').format('H')))) {
        $(`#${plannerEvent[i].id}`).addClass("past")
    }
    else {
        $(`#${plannerEvent[i].id}`).addClass("future")
    }
}


//alert("tb end")
//$("#dailyRows").append("</tbody>");
//$("#dailyRows").append("</table>");
/*
      <section id="hours" class="hour col-12 col-md-1">hours</section>
      <section id="events" class="description col-12 col-md-10">events</section>
      <section id="delete" class="saveBtn col-12 col-md-1">X</section>

        <tr class="d-flex">
          <td class="hour col-12 col-md-1">hours</td>
          <td class="description col-12 col-md-10">
            <textarea name="" id="">This is my event</textarea>
          </td>
          <td class="saveBtn col-12 col-md-1">Save</td>
        </tr>

function createTable() {
    //alert("test")
    let projectTable = $("#theTable")
    let projectTableTh = $('<thead class="thead-dark" ><td>Project Name</td><td>Project Type</td><td>Hourly wage</td><td>Due date</td><td>Days until</td><td>Estimated total</td><td>Delete</td></thead>')
    //projectTable.text(');
    projectTable.append(projectTableTh);
    var content = "<table>"
    for (i = 0; i < 3; i++) {
        content += `< tr ><td> row ${i} column 1</td> <td> row ${i} columnsds 1</td> <td> row ${i} column 1</td> <td> row ${i} column 1</td> <td> row ${i} column 1</td></tr > `;
    }
    content += "</table>"

    $('#theTable').append(content);


    //projectTable.append(projectTableTh);
}
createTable()


*/
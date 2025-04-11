// popup.js 

'use strict'; 
let prep = document.querySelector(".prepped");
let res = document.querySelector(".reserved");
let book = document.querySelector(".bookedOut");
let checkedIn = document.querySelector(".checkedIn");
let partCheckedIn = document.querySelector(".partCheckedIn");
let total = document.querySelector(".total");


chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "getStats"}, function(response) {
        console.log(response);
        prep.innerHTML = `Amount prepped: ${response.prepped}`;
        res.innerHTML = `Amount Reserved: ${response.reserved}`;
        book.innerHTML = `Amount Booked Out: ${response.bookedOut}`;
        checkedIn.innerHTML = `Amount Checked In: ${response.checkedIn}`;
        partCheckedIn.innerHTML = `Amount Part Checked In: ${response.partCheckedIn}`;
        total.innerHTML = `Total Items: ${response.prepped + response.reserved + response.bookedOut + response.checkedIn + response.partCheckedIn}`;

    })
})

'use strict';

const prepped = 'success';
const reserved = 'info';
const bookedOut = 'danger';
const checkedIn = 'primary';
const partCheckedIn = 'reserved';

// content.js
const getCount = function(option) {
    const node = document.querySelectorAll(`span.label.label-${option}`);
    const arr = [...node];
    return arr.length; 
}

const countPrep = getCount(prepped);
const countRes = getCount(reserved);
const countBook = getCount(bookedOut);
const countCheck = getCount(checkedIn);
const partChecked = getCount(partCheckedIn);

chrome.runtime.onMessage.addListener(function(request, _, sendResponse) {
    if (request.action === 'getStats') {
        sendResponse({
            prepped: countPrep,
            reserved: countRes,
            bookedOut: countBook, 
            checkedIn: countCheck,
            partCheckedIn: partChecked
        });
    }
    return true; 
})

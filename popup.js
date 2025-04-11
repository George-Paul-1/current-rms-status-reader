// popup.js 

'use strict'; 
document.addEventListener('DOMContentLoaded', () => {
    let prep = document.querySelector(".prepped");
    let res = document.querySelector(".reserved");
    let book = document.querySelector(".bookedOut");
    let checkedIn = document.querySelector(".checkedIn");
    let partCheckedIn = document.querySelector(".partCheckedIn");
    let total = document.querySelector(".total");
    let percentage = document.querySelector(".percentage");
    let progressBar = document.querySelector('.progress');

    const calcPercentage = function (total, portion) {
        console.log(total, portion);
        return Math.round((portion / total) * 100);
    }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "getStats"}, function(response) {
            console.log(response);
            const totalItems = response.prepped + response.reserved + response.bookedOut + response.checkedIn + response.partCheckedIn;
            if (response.prepped) {
                prep.classList.add('tag');
                prep.classList.add('is-primary');
                prep.innerHTML = `Amount prepped: ${response.prepped}`;
                const percentageNum = calcPercentage(totalItems, response.prepped)
                percentage.innerHTML = ` Percentage Prepped ${percentageNum}%`;
                progressBar.max = totalItems;
                progressBar.value = response.prepped; 
                progressBar.style.visibility = "visible";
                }
            if (response.reserved) {
                res.classList.add('tag');
                res.classList.add('is-info');
                res.innerHTML = `Amount Reserved: ${response.reserved}`;
            }
            if (response.bookedOut) {
                book.classList.add('tag');
                book.classList.add('is-danger');
                book.innerHTML = `Amount Booked Out: ${response.bookedOut}`;
            }
            if (response.checkedIn) {
                checkedIn.classList.add('tag');
                checkedIn.classList.add('is-success');
                checkedIn.innerHTML = `Amount Checked In: ${response.checkedIn}`;
                const percentageCheckedIn = calcPercentage(totalItems, response.checkedIn);
                percentage.innerHTML = ` Percentage Checked In ${percentageCheckedIn}%`;
                
            }
            if (response.partCheckedIn) {
                partCheckedIn.classList.add('tag');
                partCheckedIn.classList.add('is-link');
                partCheckedIn.innerHTML = `Amount Part Checked In: ${response.partCheckedIn}`;
            }
            total.innerHTML = `Total Items: ${totalItems}`;
        })
    })
})

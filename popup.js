// popup.js 

'use strict'; 

document.addEventListener('DOMContentLoaded', () => {
    let prep = document.querySelector(".prepped");
    let res = document.querySelector(".reserved");
    let book = document.querySelector(".bookedOut");
    let checkedIn = document.querySelector(".checkedIn");
    let partCheckedIn = document.querySelector(".partCheckedIn");
    let allocated = document.querySelector(".allocated");
    let total = document.querySelector(".total");
    let percentage = document.querySelector(".percentage");
    let progressBar = document.querySelector('.progress');
    let error = document.querySelector('.error');

    const calcPercentage = function (total, portion) {
        return Math.round((portion / total) * 100);
    }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log(tabs);
        chrome.tabs.sendMessage(tabs[0].id, {action: "getStats"}, function(response) {
            console.log(`RESPONSE : ${response}`);

            if (!response.url.includes("/opportunities/")) error.innerHTML = "No Items Visible";
            else error.innerHTML = "";

            const totalItems = response.prepped + response.reserved + response.bookedOut + response.checkedIn + response.partCheckedIn + response.allocated;
            progressBar.max = totalItems;

            if (response.prepped) {
                prep.classList.add('tag');
                prep.classList.add('is-primary');
                prep.innerHTML = `Prepped: ${response.prepped}`;
                const percentagePrep = calcPercentage(totalItems, response.prepped)
                prep.addEventListener("mouseover", () => {
                    progressBar.removeAttribute("class");
                    progressBar.classList.add("progress", "is-success");
                    progressBar.style.visibility = "visible";
                    percentage.innerHTML = ` Percentage Prepped ${percentagePrep}%`;
                    progressBar.value = response.prepped;
                });
            }

            if (response.reserved) {
                res.classList.add('tag');
                res.classList.add('is-info');
                res.innerHTML = `Reserved: ${response.reserved}`;
                const percentageRes = calcPercentage(totalItems, response.reserved);
                res.addEventListener("mouseover", () => {
                    progressBar.removeAttribute("class");
                    progressBar.classList.add("progress", "is-info");
                    progressBar.style.visibility = "visible";
                    percentage.innerHTML = ` Percentage Reserved ${percentageRes}%`;
                    progressBar.value = response.reserved;
                });
            }

            if (response.bookedOut) {
                book.classList.add('tag');
                book.classList.add('is-danger');
                book.innerHTML = `Booked Out: ${response.bookedOut}`;
                const percentageBooked = calcPercentage(totalItems, response.bookedOut);
                book.addEventListener("mouseover", () => {
                    progressBar.removeAttribute("class");
                    progressBar.classList.add("progress", "is-danger");
                    progressBar.style.visibility = "visible";
                    percentage.innerHTML = ` Percentage Booked ${percentageBooked}%`;
                    progressBar.value = response.bookedOut;
                });
            }

            if (response.checkedIn) {
                checkedIn.classList.add('tag');
                checkedIn.classList.add('is-info');
                checkedIn.innerHTML = `Checked In: ${response.checkedIn}`;
                const percentageCheckedIn = calcPercentage(totalItems, response.checkedIn);
                checkedIn.addEventListener("mouseover", () => {
                    progressBar.removeAttribute("class");
                    progressBar.classList.add("progress", "is-info");
                    progressBar.style.visibility = "visible";
                    percentage.innerHTML = ` Percentage Check In ${percentageCheckedIn}%`;
                    progressBar.value = response.checkedIn;
                });
            }

            if (response.partCheckedIn) {
                partCheckedIn.classList.add('tag');
                partCheckedIn.classList.add('is-link');
                partCheckedIn.innerHTML = `Part Checked In: ${response.partCheckedIn}`;
                const percentPartChecked = calcPercentage(totalItems, response.partCheckedIn);
                partCheckedIn.addEventListener("mouseover", () => {
                    progressBar.removeAttribute("class");
                    progressBar.classList.add("progress", "is-link");
                    progressBar.style.visibility = "visible";
                    percentage.innerHTML = ` Percentage Part Checked In ${percentPartChecked}%`;
                    progressBar.value = response.partCheckedIn;
                });
            }
            if (response.allocated) {
                allocated.classList.add('tag');
                allocated.classList.add('is-warning');
                allocated.innerHTML = `Allocated: ${response.allocated}`;
                const percentAllocated = calcPercentage(totalItems, response.allocated);
                allocated.addEventListener("mouseover", () => {
                    progressBar.removeAttribute("class");
                    progressBar.classList.add("progress", "is-warning");
                    progressBar.style.visibility = "visible";
                    percentage.innerHTML = ` Percentage Allocated ${percentAllocated}%`;
                    progressBar.value = response.allocated;
                });
            }

            total.innerHTML = `Total Items: ${totalItems}`;
        })
    })
})

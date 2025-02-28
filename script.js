document.addEventListener("DOMContentLoaded", function () {
    const date1 = document.getElementById("date1");
    const date2 = document.getElementById("date2");
    const errorMessage = document.getElementById("error-message");
    const resultFields = {
        seconds: document.getElementById("seconds"),
        minutes: document.getElementById("minutes"),
        hours: document.getElementById("hours"),
        days: document.getElementById("days"),
        months: document.getElementById("months"),
        years: document.getElementById("years"),
    };

    const bgColorPicker = document.getElementById("bgColor");
    const textColorPicker = document.getElementById("textColor");
    const body = document.body;
    const historyList = document.getElementById("history");

    // Initialize with the current date and time
    const now = new Date().toISOString().slice(0, 16);
    date1.value = now;
    date2.value = now;

    date1.addEventListener("change", () => handleDateChange("Date 1", date1.value));
    date2.addEventListener("change", () => handleDateChange("Date 2", date2.value));
    bgColorPicker.addEventListener("input", updateColors);
    textColorPicker.addEventListener("input", updateColors);

    function handleDateChange(label, newValue) {
        if (new Date(newValue).toString() === "Invalid Date") {
            errorMessage.textContent = "Please enter valid dates.";
            return;
        }
        errorMessage.textContent = "";
        addToHistory(`${label} changed to ${newValue}`);
        calculateDifference();
    }

    function calculateDifference() {
        const d1 = new Date(date1.value);
        const d2 = new Date(date2.value);

        if (isNaN(d1) || isNaN(d2)) {
            return;
        }

        const diffInMilliseconds = Math.abs(d2 - d1);
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        const monthsDiff = monthDifference(d1, d2);
        const yearsDiff = Math.floor(monthsDiff / 12);

        resultFields.seconds.textContent = diffInSeconds;
        resultFields.minutes.textContent = diffInMinutes;
        resultFields.hours.textContent = diffInHours;
        resultFields.days.textContent = diffInDays;
        resultFields.months.textContent = monthsDiff;
        resultFields.years.textContent = yearsDiff;
    }

    function monthDifference(date1, date2) {
        return Math.abs(
            (date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth())
        );
    }

    function updateColors() {
        if (bgColorPicker.value === textColorPicker.value) {
            alert("Background and text colors must be different!");
            return;
        }

        body.style.backgroundColor = bgColorPicker.value;
        body.style.color = textColorPicker.value;

        addToHistory(`Colors changed - Background: ${bgColorPicker.value}, Text: ${textColorPicker.value}`);
    }

    function addToHistory(entry) {
        const listItem = document.createElement("li");
        listItem.textContent = `${new Date().toLocaleString()} - ${entry}`;
        historyList.prepend(listItem);
    }
});

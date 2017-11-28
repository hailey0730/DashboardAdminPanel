import { Injectable } from "@angular/core";
export var DateRangeUtilService = (function () {
    function DateRangeUtilService() {
    }
    DateRangeUtilService.prototype.isDateRangeValid = function (daterange, dateFormat, minYear, maxYear, disableUntil, disableSince, disableDates, disableDateRanges, enableDates, monthLabels) {
        var invalidDateRange = {
            beginDate: { day: 0, month: 0, year: 0 },
            endDate: { day: 0, month: 0, year: 0 }
        };
        var isMonthStr = dateFormat.indexOf("mmm") !== -1;
        if (daterange.length !== 23 && !isMonthStr || daterange.length !== 25 && isMonthStr) {
            return invalidDateRange;
        }
        var dates = daterange.split(" - ");
        if (dates.length !== 2) {
            return invalidDateRange;
        }
        var validDates = [];
        for (var i in dates) {
            var date = this.isDateValid(dates[i], dateFormat, minYear, maxYear, monthLabels, isMonthStr);
            if (date.day === 0 && date.month === 0 && date.year === 0) {
                return invalidDateRange;
            }
            if (this.isDisabledDay(date, minYear, maxYear, disableUntil, disableSince, disableDates, disableDateRanges, enableDates)) {
                return invalidDateRange;
            }
            validDates.push(date);
        }
        if (this.getTimeInMilliseconds(validDates[1]) < this.getTimeInMilliseconds(validDates[0])) {
            return invalidDateRange;
        }
        return {
            beginDate: { day: validDates[0].day, month: validDates[0].month, year: validDates[0].year },
            endDate: { day: validDates[1].day, month: validDates[1].month, year: validDates[1].year }
        };
    };
    DateRangeUtilService.prototype.isMonthLabelValid = function (monthLabel, monthLabels) {
        for (var key = 1; key <= 12; key++) {
            if (monthLabel.toLowerCase() === monthLabels[key].toLowerCase()) {
                return key;
            }
        }
        return -1;
    };
    DateRangeUtilService.prototype.isYearLabelValid = function (yearLabel, minYear, maxYear) {
        if (yearLabel >= minYear && yearLabel <= maxYear) {
            return yearLabel;
        }
        return -1;
    };
    DateRangeUtilService.prototype.parseDatePartNumber = function (dateFormat, dateString, datePart) {
        var pos = dateFormat.indexOf(datePart);
        if (pos !== -1) {
            var value = dateString.substring(pos, pos + datePart.length);
            if (!/^\d+$/.test(value)) {
                return -1;
            }
            return parseInt(value);
        }
        return -1;
    };
    DateRangeUtilService.prototype.parseDatePartMonthName = function (dateFormat, dateString, datePart, monthLabels) {
        var pos = dateFormat.indexOf(datePart);
        if (pos !== -1) {
            return this.isMonthLabelValid(dateString.substring(pos, pos + datePart.length), monthLabels);
        }
        return -1;
    };
    DateRangeUtilService.prototype.parseDefaultMonth = function (monthString) {
        var month = { monthTxt: "", monthNbr: 0, year: 0 };
        if (monthString !== "") {
            var split = monthString.split(monthString.match(/[^0-9]/)[0]);
            month.monthNbr = split[0].length === 2 ? parseInt(split[0]) : parseInt(split[1]);
            month.year = split[0].length === 2 ? parseInt(split[1]) : parseInt(split[0]);
        }
        return month;
    };
    DateRangeUtilService.prototype.isDisabledDay = function (date, minYear, maxYear, disableUntil, disableSince, disableDates, disableDateRanges, enableDates) {
        var dateMs = this.getTimeInMilliseconds(date);
        for (var _i = 0, enableDates_1 = enableDates; _i < enableDates_1.length; _i++) {
            var d = enableDates_1[_i];
            if (d.year === date.year && d.month === date.month && d.day === date.day) {
                return false;
            }
        }
        if (date.year < minYear && date.month === 12 || date.year > maxYear && date.month === 1) {
            return true;
        }
        if (this.isInitializedDate(disableUntil) && dateMs <= this.getTimeInMilliseconds(disableUntil)) {
            return true;
        }
        if (this.isInitializedDate(disableSince) && dateMs >= this.getTimeInMilliseconds(disableSince)) {
            return true;
        }
        for (var _a = 0, disableDates_1 = disableDates; _a < disableDates_1.length; _a++) {
            var d = disableDates_1[_a];
            if (d.year === date.year && d.month === date.month && d.day === date.day) {
                return true;
            }
        }
        for (var _b = 0, disableDateRanges_1 = disableDateRanges; _b < disableDateRanges_1.length; _b++) {
            var d = disableDateRanges_1[_b];
            if (this.isInitializedDate(d.beginDate) && this.isInitializedDate(d.endDate) && dateMs >= this.getTimeInMilliseconds(d.beginDate) && dateMs <= this.getTimeInMilliseconds(d.endDate)) {
                return true;
            }
        }
        return false;
    };
    DateRangeUtilService.prototype.isMonthDisabledByDisableUntil = function (date, disableUntil) {
        return this.isInitializedDate(disableUntil) && this.getTimeInMilliseconds(date) <= this.getTimeInMilliseconds(disableUntil);
    };
    DateRangeUtilService.prototype.isMonthDisabledByDisableSince = function (date, disableSince) {
        return this.isInitializedDate(disableSince) && this.getTimeInMilliseconds(date) >= this.getTimeInMilliseconds(disableSince);
    };
    DateRangeUtilService.prototype.isInitializedDate = function (date) {
        return date.year !== 0 && date.month !== 0 && date.day !== 0;
    };
    DateRangeUtilService.prototype.getTimeInMilliseconds = function (date) {
        return new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0).getTime();
    };
    DateRangeUtilService.prototype.getWeekNumber = function (date) {
        var d = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
        d.setDate(d.getDate() + (d.getDay() === 0 ? -3 : 4 - d.getDay()));
        return Math.round(((d.getTime() - new Date(d.getFullYear(), 0, 4).getTime()) / 86400000) / 7) + 1;
    };
    DateRangeUtilService.prototype.isDateValid = function (date, dateFormat, minYear, maxYear, monthLabels, isMonthStr) {
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var invalidDate = { day: 0, month: 0, year: 0 };
        if (date.length !== 10 && !isMonthStr || date.length !== 11 && isMonthStr) {
            return invalidDate;
        }
        var separator = dateFormat.replace(/[dmy]/g, "")[0];
        var parts = date.split(separator);
        if (parts.length !== 3) {
            return invalidDate;
        }
        var day = this.parseDatePartNumber(dateFormat, date, "dd");
        var month = isMonthStr ? this.parseDatePartMonthName(dateFormat, date, "mmm", monthLabels) : this.parseDatePartNumber(dateFormat, date, "mm");
        var year = this.parseDatePartNumber(dateFormat, date, "yyyy");
        if (day !== -1 && month !== -1 && year !== -1) {
            if (year < minYear || year > maxYear || month < 1 || month > 12) {
                return invalidDate;
            }
            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
                daysInMonth[1] = 29;
            }
            if (day < 1 || day > daysInMonth[month - 1]) {
                return invalidDate;
            }
            return { day: day, month: month, year: year };
        }
        return invalidDate;
    };
    DateRangeUtilService.decorators = [
        { type: Injectable },
    ];
    DateRangeUtilService.ctorParameters = [];
    return DateRangeUtilService;
}());
//# sourceMappingURL=my-date-range-picker.date.range.util.service.js.map
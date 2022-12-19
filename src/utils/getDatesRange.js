const addDays = (date, days) => {
    date.setDate(date.getDate() + days);
    return date;
}

export const getDatesRange = (initDate, endDate) => {
    const dateArray = new Array();
    const startDate = new Date(initDate);
    const finishDate = new Date(endDate);
    let currentDate = startDate;
    while (startDate <= finishDate) {
        currentDate = addDays(currentDate, 1);
        dateArray.push(new Date(currentDate.getTime()))
    }
    return dateArray;
}
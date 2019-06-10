export function getNormalizedDates(entry: { month: number, date: number }) : { month: string, date: string }
{
    return {
        month: entry.month < 10 ? "0" + entry.month.toString() : entry.month.toString(),
        date: entry.date < 10 ? "0" + entry.date.toString() : entry.date.toString()
    }
}

export function getFullDate(month: number, date: number) : string
{   
    const monthName = getMonthName(month);
    const day = `${date}${getDayStringSuffix(date)}`;
    const year = new Date().getFullYear();

    return `${monthName} ${day}, ${year}`;
}

export function getDailyDataFileName(month: number, date: number) : string
{
    const normalizedDates = getNormalizedDates({ month, date });
    return `${normalizedDates.month}${normalizedDates.date}-daily.json`;
}

function getMonthName(month: number) : string
{
    switch(month)
    {
        case 1:
            return 'January';
        case 2:
            return 'February';
        case 3:
            return 'March';
        case 4:
            return 'April';
        case 5:
            return 'May';
        case 6:
            return 'June';
        case 7:
            return 'July';
        case 8:
            return 'August';
        case 9:
            return 'September';
        case 10:
            return 'October';
        case 11:
            return 'November';
        default:
            return 'December';            
    }
}

function getDayStringSuffix(day: number) : string
{
    switch (day)
    {
        case 1:
        case 21:
        case 31:
            return 'st';
        case 2:
        case 22: 
            return 'nd';
        case 3:
        case 23:
            return 'rd';
        default:
            return 'th';
    }
}
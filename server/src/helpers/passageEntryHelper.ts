export function getNormalizedDates(entry: { month: number, date: number }) : { month: string, date: string }
{
    return {
        month: entry.month < 10 ? "0" + entry.month.toString() : entry.month.toString(),
        date: entry.date < 10 ? "0" + entry.date.toString() : entry.date.toString()
    }
}
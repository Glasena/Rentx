import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
    
    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    compareInHours(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUTC(end_date)
        const end_start_utc = this.convertToUTC(start_date)
        return dayjs(end_date_utc).diff(end_start_utc, "hours")
    }

    dateNow(): Date {
        return dayjs().toDate();
    }

    compareInDays(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUTC(end_date)
        const end_start_utc = this.convertToUTC(start_date)
        return dayjs(end_date_utc).diff(end_start_utc, "days")
    }

    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }

}

export { DayjsDateProvider }
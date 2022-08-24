import { Injectable } from '@angular/core';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class DaysService {

  constructor() { }

  formatDays(days: number){
    let daysS = 0;
    let months = 0;
    let years = 0;
    if(days >= 365){
      years = Number((days/365).toFixed(0));
      let cal_months = days-(365*years);
      if(cal_months > 0){
        if(cal_months >=30){
          months = Number(((cal_months/30)).toFixed(0));
          let calcul_day = cal_months-(30*months);
          daysS = calcul_day;
        }
      }else{

      }
    }else{
      if(days >=30){
        months = Number((days/30).toFixed(0));
        daysS = days -(30*months);

      }else{
        daysS = days;
      }
    }
    let format_days = "";
    format_days += years > 0 ? years + (years == 1?  ' año ': ' años ') : ''
    format_days += months > 0 ? months + (months == 1 ?  ' mes ': ' meses ') : ''
    format_days += daysS > 0 ? daysS + (daysS == 1 ?  ' día ': ' días ') : ''
    return format_days;
  }

  formatDaysWithDate(date){
    let today = new Date()
    let date_of = new Date(date);
    let difference = Math.floor(((today.getTime() - date_of.getTime()) / (1000*60*60*24)));
    return this.formatDays(difference);
  }

  getHourDiff(initial_hour, final_hour, format?){
    console.log("Intial", initial_hour);
    console.log("final_hour", final_hour);
    var entryHour = moment(initial_hour, format ? format :'hh:mm ');
    var exitHour = moment(final_hour, format ? format :'hh:mm ');
    console.log("Entry", entryHour);
    console.log("exit", exitHour);
    
    return moment.duration(exitHour.diff(entryHour)).asHours();
  }

  getDifferencesInMinutes(date1, date2){
    let dat1d = new Date(date1)
    let date_of = new Date(date2);
    let difference = Math.floor(((dat1d.getTime() - date_of.getTime()) / (1000*60)));
    return difference;
  }

}

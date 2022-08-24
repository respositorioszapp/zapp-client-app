import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatHour'
})
export class DateFormatHourPipe implements PipeTransform {

  transform(value: string, format12: boolean ): string {
    const date_to_format = new Date(value);
    console.log("Value", value)
    if(format12){
      let hour = date_to_format.getHours() > 12 ? date_to_format.getHours()-12 : date_to_format.getHours();
      let minutes = date_to_format.getMinutes();
      let hour_aux = "";
      let min_aux = "";
      let format = 'AM';
      if(date_to_format.getHours() > 12){
        format = 'PM'
      }else{
        if(date_to_format.getHours() == 12 && minutes ==0){
          format = 'M'
        }else{
          if(date_to_format.getHours() == 12 && minutes >0){
            format = 'PM'
          }else{
            format = 'AM'
          }
        }
      }
      hour_aux = hour < 10 ? hour == 0 ? 12+'':'0'+ hour: hour+'';
      min_aux = minutes < 10 ? '0'+ minutes: minutes+'';
      return hour_aux + ":" +min_aux + " "+ format
    }
    const hour = date_to_format.getHours();
    const minutes = date_to_format.getMinutes();
    let hour_aux = hour < 10 ? hour == 0 ? 12:'0'+ hour: hour+'';
    let min_aux = minutes < 10 ? '0'+ minutes: minutes+'';
    return hour_aux + ":" +min_aux;
  }

}

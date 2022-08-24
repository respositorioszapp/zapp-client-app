import { Component, Input, OnInit } from '@angular/core';
import { RealtimeService } from 'src/app/services/realtime.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-order-detail-timeline',
  templateUrl: './order-detail-timeline.page.html',
  styleUrls: ['./order-detail-timeline.page.scss'],
})
export class OrderDetailTimelinePage implements OnInit {
  @Input() order
  store_states = {
    52: {
      message: "Tu orden ha sido recibida y pronto será confirmada.",
      json: "/assets/lottie-files/1-confirmed.json",

      state: 52
    },
    53: {
      message: "Tu orden ha sido confirmada y se está preparando.",
      json: "/assets/lottie-files/2-order-packed.json",
      state: 53,
      icon: "order-inproccess"
    },
    54: {
      message: "El mensajero va en camino a tu ubicación. ",
      json: "/assets/lottie-files/3-delivery-riding.json",
      state: 54,
      icon: "deliverygo"
    },
    55: {
      message: "¡El mensajero ha llegado! Recibe tu pedido. ",
      json: "/assets/lottie-files/4-food-delivery.json",
      state: 55,
      icon: "delivery-location"
    },
    57: {
      message: "La orden ha sido finalizada",
      json: "/assets/lottie-files/4-food-delivery.json",
      state: 57,
      icon: "delivery-location"
    },
    58: {
      message: "La orden fue cancelada",
      json: "/assets/lottie-files/4-food-delivery.json",
      state: 58,
      icon: "delivery-location"
    },
    59: {
      message: "Ubicando el repartidor más cercano...",
      json: "/assets/lottie-files/4-food-delivery.json",
      state: 58,
      icon: "delivery-location"
    },
    22:{
      message:"No Asignada",
      state:22,
      class:"danger"
    },
    24:{
      message:"En proceso",
      state:24,
      class:"in-proccess"
    },
    25:{
      message: "Finalizada",
      state: 25,
      class:"success"
    },
    31:{
      message: "Cancelada",
      
      state: 31,
     class:"warning"
    },
    36:{
      message: "Cancelada por mensajero",
     
      state: 36,
      class:"danger"
    },
    48:{
      message: "Orden no efectiva",
      
      state: 48,
      color:"dark"
     
    }

  }
  constructor(private ui:UiService, private realtime:RealtimeService) { }

  ngOnInit() {
    if(!this.order.details){
      this.order.details=this.order.detail;
    }
  }

  ionViewWillEnter() {
    if(!this.order.details){
      this.order.details=this.order.detail;
    }
    if(this.orderActive){
      this.realtime.getFirebaseCollectionList(`order_detail_report/${this.order.id}`)
      .subscribe((res:any[])=>{
        if(res!=null){
          
          if(res.length>0){
            res.forEach(detail=>{
              let detailOrder= this.order.details.findIndex(d=> d.id== detail.id);
              if(detailOrder!=-1){
                const wait_time = detail.timer? detail.timer.minutes:0;
                const surplus_money = detail.total_charge ? Number(detail.total_charge):0;
                this.order.details[detailOrder]={...detail, wait_time,surplus_money };
                console.log("Order Details", this.order.details)
              }else{
                console.log("No encontrado")
              }
            })
            
          }else{
            console.log("Array vacío")
          }
        }
      })
    }
  }

  get orderActive(){
    return this.order.status_order!=31&& this.order.status_order!=48 && this.order.status_order!=25&& this.order.status_order!=36;
  }

  dismiss() {
    this.ui.dismiss()
  }

}

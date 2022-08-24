import { Component, OnInit, Input } from '@angular/core';
import ModalOptions from 'src/app/interfaces/ModalOptions';
import { Product } from 'src/app/interfaces/Product';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { UiService } from 'src/app/services/ui.service';
import { CloseShopPage } from '../close-shop/close-shop.page';

export interface Category {
  id: string
  name: string
  other_fields: any[]
}

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  quantity: number = 1
  price: number
  @Input() product: any
  shop: any = {}
  radiobuttons: any[] = []
  other_items: any[] = []
  radio_group_item_price = ""
  previous_product: any = {}
  fields_radio: any = {}
  fields_others: any = {}
  slideOpts4 = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    autoplay: {
      delay: 2000,
    },
  };
  constructor(public auth: AuthService, private ui: UiService, private request: RequestService) { }

  ngOnInit() {


  }

  ionViewWillEnter() {
    this.slideOpts4 = {
      initialSlide: 0,
      speed: 400,
      slidesPerView: 1,
      autoplay: {
        delay: 2000,
      },
    };
    this.previous_product = { ...this.product };
    if (this.product.quantity) {
      this.quantity = this.product.quantity;
    }
    console.log("Product", this.product)
    // this.product.additional_price = 0;
    this.radiobuttons = this.product.fields.filter(f => f.type.includes("radio"));
    const categories_radios = []

    this.radiobuttons.forEach(r => {
      if (r.category_id) {
        if (!this.fields_radio[r.category_id]) {
          const other_fields = this.radiobuttons.filter(ra => ra.category_id == r.category_id)
          const required = typeof other_fields.find(f => f.required == 'true') != 'undefined'
          this.fields_radio[r.category_id] = {
            id: r.category_id,
            name: r.category_name,
            other_fields,
            radio_item: "",
            required
          }
        }
      }
    });

    console.log("Fields With Category Radio", this.fields_radio)
    this.other_items = this.product.fields.filter(f => !f.type.includes("radio"));

    this.other_items = this.other_items.map((i, index) => {
      return {
        ...i,
        selected: this.isSelected(i) ? true : false,
        open: index == 0
      }
    })
    this.other_items.forEach((o, index) => {
      if (o.category_id) {
        if (!this.fields_others[o.category_id]) {
          const other_fields = this.other_items.filter(r => r.category_id == o.category_id);
          const required = typeof other_fields.find(f => f.required == 'true') != 'undefined'
          this.fields_others[o.category_id] = {
            id: o.category_id,
            name: o.category_name,
            other_fields,
            required,

          }

        }
      }
    })
    console.log("Fields With Category Others", this.fields_others)
    this.radio_group_item_price = "";
    this.product.additional_price = "";
    this.product.additionals_ids = [];
    this.product.additional_radio = [];
    console.log("Other items", this.other_items)
    if (this.auth.person.cart_items && this.auth.person.cart_items.length > 0) {
      const product: Product = this.auth.person.cart_items.find(ci => ci.id == this.product.id);
      if (product) {
        this.product.comments = product.comments;
        this.radio_group_item_price = product.radio_id;
        this.product.additional_price = product.additional_price;
        this.product.additionals_ids = product.additionals_ids ? product.additionals_ids : [];
        this.product.additional_radio = product.additional_radio ? product.additional_radio : []
        //Setting selected items
        this.getArray(this.fields_others).forEach((key) => {
          this.fields_others[key].other_fields =
            this.fields_others[key].other_fields.map(o => {
              return {
                ...o,
                selected: this.isSelected(o) ? true : false
              }
            })
        })
        this.getArray(this.fields_radio).forEach(key => {
          //Create a constant object for easy reading
          const object = this.fields_radio[key];
          object.radio_item = this.product.additional_radio.find(ad => object.other_fields.find(o => o.id == ad))
        })

      }
    }
    // if (localStorage.getItem("shop")) {
    //   this.shop = JSON.parse(localStorage.getItem("shop"))

    // }
    console.log("Product", this.product)
    this.request.get("/?option=shopById&id=" + this.product.store.id, true)
      .subscribe((res: any) => {
        console.log("Tienda", res)
        this.shop = res.data;
        let date = new Date();
        let day = date.toLocaleString('en-us', { weekday: 'long' });
        console.log(day);
        day = day.toLowerCase();
        const dokan_store_time = res.data.profile_settings.dokan_store_time;
        let status_today: any = {}
        if (!Array.isArray(dokan_store_time)) {
          Object.keys(dokan_store_time).map(key => {
            if (key == day) {
              status_today = dokan_store_time[key];
            }
          });
          // this.status_shop = status_today;
          console.log("Status Today", status_today);
          const closing_time = status_today.closing_time.trim();
          const opening_time = status_today.opening_time.trim();
          let format_date = date.getFullYear() + "/";
          format_date += (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
          format_date += "/" + ((date.getDate()) < 10 ? "0" + (date.getDate()) : (date.getDate()));
          console.log("Fecha Inicial FOrmat", format_date + " " + opening_time)
          console.log("Fecha Final FOrmat", format_date + " " + closing_time)
          const opening_date = new Date(format_date + " " + opening_time);
          const closing_date = new Date(format_date + " " + closing_time);
          console.log("Opening Date ", opening_date)
          console.log("Closing Date ", closing_date)
          if (date >= opening_date && date < closing_date) {
            this.shop.status = 'open'
          } else {
            this.shop.status = 'close'
          }
        }

        // localStorage.setItem("shop", JSON.stringify(this.shop));
        // this.shop = JSON.parse(localStorage.getItem("shop"))
      })
  }

  openExpansion(array, item) {
    console.log("Open", item)
    array.forEach(i => {
      if (i.id != item.id) {
        i.open = false;
      }
    })
    item.open = item.open ? false : true;



  }

  get total() {
    const y = (this.quantity * this.product.price + (this.product.additional_price ? this.product.additional_price : 0));
    console.log("Precio", y);
    return (this.quantity * this.product.price + (this.product.additional_price ? this.product.additional_price : 0))
  }

  getArray(item) {
    return Object.keys(item)
  }

  add() {
    this.quantity++;
  }

  sub() {
    if (this.quantity > 1) {
      this.quantity--;
    }

  }

  dismiss(cancel?) {
    if (cancel) {
      console.log("Cancel")
      console.log("Prevoius Product", this.previous_product)
      this.product = this.previous_product;
    }
    this.ui.dismiss({
      cancel,
      product: this.product
    })
  }

  selectRadio(item, key?) {
    const previous_selected = this.fields_radio[key].other_fields.find(r => {
      console.log("Radio", r)
      return r.selected_radio
    });

    console.log("Previous ELement", previous_selected)
    if (!this.product.additional_price) {
      this.product.additional_price = 0;
    }
    if (previous_selected) {
      console.log("Previuos")
      previous_selected.selected_radio = false;
      this.product.additional_price -= Number(previous_selected.price);
    }
    this.product.additional_radio = []
    this.fields_radio[key].error = undefined;
    // this.product.additional_price += Number(item.price);
    this.fields_radio[key].price = item.price;
    this.calculatePrice()

    this.fields_radio[key].radio_item = item.id;

    item.selected_radio = true;
    this.getArray(this.fields_radio).forEach(key => {
      this.product.additional_radio.push(this.fields_radio[key].radio_item);
    })

    console.log("Selected")

  }

  async showClose() {
    const obj: ModalOptions = {
      image: 'assets/imgs/online-store-closed.gif',
      title: "Tienda Cerrada ",
      message: (this.shop.profile_settings.dokan_store_close_notice ? this.shop.profile_settings.dokan_store_close_notice : 'Cerrado'),
      color_message: "#eb445a",
      //  color_title : "#eb445a"
    }
    this.showModal(obj);

  }

  async showNotInStock() {
    const obj: ModalOptions = {
      image: 'assets/imgs/not-found.gif',
      title: "Producto Agotado",
      color_message: "#eb445a",
      color_title: "#5952fd"
      //  color_title : "#eb445a"
    }
    this.showModal(obj);

  }

  async showModal(obj) {
    const modal = await this.ui.presentModal(CloseShopPage, obj, ["modal-xs"])
  }

  async addToCartInvited(){
    this.ui.presentAlert({
      header: 'Notificación',
      message: 'Para poder realizar pedidos debes estar registrado',
      buttons: ['Entendido']
    });
  }
  addToCart() {
    //Convert object to array
    const fields_others_array = Object.keys(this.fields_others);

    fields_others_array.forEach(key => {
      //Reset error property
      this.fields_others[key].error = undefined;
      if (this.fields_others[key].required) {
        if (this.product.additionals_ids && this.product.additionals_ids.length > 0) {
          this.fields_others[key].valid = this.fields_others[key].other_fields
            .find(d => this.product.additionals_ids.find(ad => ad == d.id))
        } else {
          this.fields_others[key].valid = false
        }
      } else {
        this.fields_others[key].valid = true;
      }
      if (!this.fields_others[key].valid) {
        this.fields_others[key].error = "yes";
      }
    })
    const fields_radio_array = Object.keys(this.fields_radio);
    fields_radio_array.forEach(key => {
      this.fields_radio[key].error = undefined;
      if (this.fields_radio[key].required) {
        if (this.product.additional_radio && this.product.additional_radio.length > 0) {
          this.fields_radio[key].valid = this.fields_radio[key].other_fields
            .find(d => this.product.additional_radio.find(ad => ad == d.id))
        } else {
          this.fields_radio[key].valid = false
        }
      } else {
        this.fields_radio[key].valid = true;
      }
      if (!this.fields_radio[key].valid) {
        this.fields_radio[key].error = "yes";
      }
    })
    const valid = fields_others_array.every(key => this.fields_others[key].valid) && fields_radio_array.every(key => this.fields_radio[key].valid)
    if (valid) {
      if (this.product.available && this.product.available == 1) {
        if (Object.keys(this.shop).length > 0) {
          //Validate if there are any products in the cart
          if (this.auth.person.cart_items && this.auth.person.cart_items.length > 0) {
            const firstItem = this.auth.person.cart_items[0];
            if (firstItem.store.id == this.product.store.id) {
              if (this.shop.status && this.shop.status == 'open') {

                this.price = (((Number(this.product.price) + Number(this.product.additional_price ? this.product.additional_price : 0)) * Number(this.product.quantity)));;
                this.product.quantity = this.quantity;
                if (!this.auth.person.cart_items) {
                  this.auth.person.cart_items = [];
                }
                const index = this.auth.person.cart_items.findIndex(p => p.id == this.product.id)
                if (index != -1) {
                  this.auth.person.cart_items[index].additional_price = this.product.additional_price;
                  this.auth.person.cart_items[index].quantity = this.quantity;
                  this.auth.person.cart_items[index].radio_id = this.product.radio_id;
                  this.auth.person.cart_items[index].additionals_ids = this.product.additionals_ids;
                  this.auth.person.cart_items[index].additional_radio = this.product.additional_radio;
                } else {
                  this.auth.person.cart_items.push(this.product)
                }
                this.auth.setPerson(this.auth.person)
                this.dismiss()
              } else {
                this.showClose()
              }

            } else {
              this.ui.presentAlert({
                mode: 'ios',
                header: 'No se puede agregar productos de otra tienda',
                buttons: [
                  {
                    text: 'Aceptar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {

                    }
                  },
                ]
              })
            }
          } else {
            
            if (this.shop.status && this.shop.status == 'open') {

              this.price = (((Number(this.product.price) + Number(this.product.additional_price ? this.product.additional_price : 0)) * Number(this.product.quantity)));;
              this.product.quantity = this.quantity;
              if (!this.auth.person.cart_items) {
                this.auth.person.cart_items = [];
              }
              const index = this.auth.person.cart_items.findIndex(p => p.id == this.product.id)
              if (index != -1) {
                this.auth.person.cart_items[index].additional_price = this.product.additional_price;
                this.auth.person.cart_items[index].quantity = this.quantity;
                this.auth.person.cart_items[index].radio_id = this.product.radio_id;
                this.auth.person.cart_items[index].additionals_ids = this.product.additionals_ids;
                this.auth.person.cart_items[index].additional_radio = this.product.additional_radio;
              } else {
                this.auth.person.cart_items.push(this.product)
              }
              this.auth.setPerson(this.auth.person)
              this.dismiss()
            } else {
              this.showClose()
            }
          }

        } else {
          localStorage.setItem("shop", JSON.stringify(this.product.store));
          this.price = this.product.price * this.quantity
          this.product.quantity = this.quantity;
          if (!this.auth.person.cart_items) {
            this.auth.person.cart_items = [];
          }
          const index = this.auth.person.cart_items.findIndex(p => p.id == this.product.id)
          if (index != -1) {
            this.auth.person.cart_items[index].quantity = this.quantity;
          } else {
            this.auth.person.cart_items.push(this.product)
          }
          this.auth.setPerson(this.auth.person)
          this.dismiss()
        }
      } else {
        this.showNotInStock()
      }
    } else {
      console.log("NOt Selected")
    }

  }

  isSelected(item) {
    if (!this.product.additionals_ids) {
      return false;
    }
    return this.product.additionals_ids.find(id => id == item.id);
  }

  addorRemoveAdditional(item, key?) {
    console.log("Item add", item)
    this.fields_others[key].error = undefined;
    if (!this.product.additional_price) {
      this.product.additional_price = 0;
    }
    if (!this.product.additionals_ids) {
      this.product.additionals_ids = []
    }
    if (item.selected) {
      this.product.additionals_ids.push(item.id);
      if (!this.fields_others[key].price) {
        this.fields_others[key].price = 0
      }
      this.fields_others[key].price += Number(item.price);
    } else {
      if (this.product.additionals_ids.find(id => id == item.id)) {
        this.product.additionals_ids = this.product.additionals_ids.filter(id => id != item.id);
        this.fields_others[key].price -= item.price;
      }
    }

    if (Number(item.price) > 0) {
      this.calculatePrice();
    }

    console.log("Product Aditional price", this.product.additional_price)

    // item.selected = !item.selected;
    console.log("Item add After", item.selected)
  }

  calculatePrice() {
    this.product.additional_price = 0;

    const array = Object.keys(this.fields_others);
    this.getArray(this.fields_others).forEach(key => {
      this.product.additional_price += this.fields_others[key].price ? Number(this.fields_others[key].price) : 0;
    })
    this.getArray(this.fields_radio).forEach(key => {
      this.product.additional_price += this.fields_radio[key].price ? Number(this.fields_radio[key].price) : 0;
    })
  }

}

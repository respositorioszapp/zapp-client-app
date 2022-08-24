import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';
import { ProductPage } from 'src/app/dialogs/product/product.page';
import { ErrorResponseService } from 'src/app/services/error-response.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: any
  @Input() isOffer: any = false
  @Input() shop_open: any = true
  @Input() productFavorites: any[]
  constructor(private request: RequestService,
    private auth: AuthService, private ui: UiService,
    private error:ErrorResponseService) { }

  ngOnInit() {
    this.product.product= this.product.product.replace("?", "ñ");
    const metadata_extras = this.product.meta_data.find(m => m.key == "_wapf_fieldgroup");
    let fields = []
    if (metadata_extras) {

      const meta_fields: any[] = metadata_extras.value.fields;

      if (meta_fields) {
        meta_fields.map(field => {
          fields.push({
            label: field.label,
            price: field.options.choices[0] ? field.options.choices[0].pricing_amount : 0,
            required: field.required,
            type: field.type,
            id: field.id,
            description: field.description,
            category_id: field.category_id,
            category_name: field.category_name
          })
        })
      }

      console.log("Metadata Extras Fields", fields);
    }
    this.product.fields = fields;
    this.findIsOnWishList()
  }

  async wishList() {
    console.log("Wish")

    if (!this.product.wishlist) {
      const loader = await this.ui.loading("Por favor espere...")
      this.request.get("/?option=wish_list&user_id=" + this.auth.user.id + "&page=1&per_page=2", true)
        .subscribe((res: any) => {
          console.log("Res", res.data)
          if (res.data.length > 0) {
            const object = {
              product_id: this.product.id,
              quantity: 1,
              user_id: this.auth.user.id,
              wishlist_id: res.data[0].ID

            }
            this.request.post("/?option=add_product_wish_list", object, true)
              .subscribe(async (res: any) => {
                (await loader).dismiss()
                this.product.wishlist = true
              }, async err => {
                (await loader).dismiss()
              })
          } else {
            const obj = {
              user_id: this.auth.user.id
            }

            this.request.post("/?option=create_wish_list", obj, true)
              .subscribe(async (res: any) => {
                const object = {
                  product_id: this.product.id,
                  quantity: 1,
                  user_id: this.auth.user.id,
                  wishlist_id: res.data.ID
                }
                this.request.post("/?option=add_product_wish_list", object, true)
                  .subscribe(async (res: any) => {
                    (await loader).dismiss()
                    this.product.wishlist = true
                  }, async err => {
                    (await loader).dismiss()
                    console.log("Error add Product", err)
                  })
              }, async err => {

                (await loader).dismiss()
                console.log("Error Create List", err)
                await this.ui.presentAlert({
                  mode: 'ios',
                  header: "No se pudo crear la lista",
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
              })
          }


        }, err => {
          console.log("Error", err)
        })
    }else{
      //del_product_wish_list
      const loader = await this.ui.loading("Por favor espere...")
      this.request.get("/?option=wish_list&user_id=" + this.auth.user.id + "&page=1&per_page=2", true)
        .subscribe((res: any) => {
          console.log("Res", res.data)
          if (res.data.length > 0) {
            const object = {
              product_id: this.product.id,
              wishlist_id: res.data[0].ID
            }
            this.request.post("/?option=del_product_wish_list", object, true)
              .subscribe(async (res: any) => {
                (await loader).dismiss()
                this.product.wishlist=false;
                if(this.productFavorites){
                  this.productFavorites= this.productFavorites.filter(p=>p.id!=this.product.id)
                }
              }, async err => {
                (await loader).dismiss()
              })
          } else {
            
          }


        }, err => {
          console.log("Error", err)
        })
    }



  }

  findIsOnWishList(){
    //?option=find_product_in_wish_list
    this.request.get("/?option=wish_list&user_id=" + this.auth.user.id + "&page=1&per_page=2", true)
        .subscribe((res: any) => {
          console.log("Res", res.data)
          this.request.get("/?option=find_product_in_wish_list&wishlist_id=" + res.data[0].ID + "&prod_id="+this.product.id, true)
          .subscribe((res:any)=>{
            this.product.wishlist=res.data.product_exists
            console.log("Url Respuesta endpoint", res);
          })
        }, err => {
          console.log("Error", err)
        })
  }

  

  getPriceItem(item) {
    return (((Number(item.price) + Number(item.additional_price ? item.additional_price : 0)) * Number(item.quantity)));
  }

  async showProduct() {

    const modal = await this.ui.presentModal(ProductPage, { product: this.product })
    modal.onDidDismiss().then((obj: any) => {
      console.log("Cancel", obj)
      if (!obj.data.cancel) {
        this.auth.person.total = 0;
        this.auth.person.quantity = 0;
        if (this.auth.person.cart_items && this.auth.person.cart_items.length > 0) {
          console.log("Calculating")
          this.auth.person.cart_items.map(p => {
            console.log(`Total ${p.id}`, this.getPriceItem(p))
            this.auth.person.total += this.getPriceItem(p);
            this.auth.person.quantity += p.quantity;
            this.auth.setPerson(this.auth.person)
          })
        }
      } else {
        this.product = obj.data.product;
      }

    })

  }

}

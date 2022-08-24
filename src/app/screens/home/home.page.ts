import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';
import { ProductPage } from 'src/app/dialogs/product/product.page';
import { RequestService } from 'src/app/services/request.service';
import { QualificationPage } from 'src/app/dialogs/qualification/qualification.page';
import { ErrorResponseService } from 'src/app/services/error-response.service';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { MapLocationService } from 'src/app/services/map-location.service';
import { RealtimeService } from 'src/app/services/realtime.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],

})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, { read: IonContent, static: false }) myContent: IonContent;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef
  shopPerCategories: any = {}
  slideOptsBusiness = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2,
    autoplay: {
      delay: 2000,
    },
  };
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 3,
    autoplay: {
      delay: 2000,
    },
  };
  slideOpts2 = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 4
  };
  slideOpts3 = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 3,
    autoplay: {
      delay: 5000,
    },
  };
  slideOpts5 = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2
  };
  slideOpts4 = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    autoplay: {
      delay: 2000,
    },
  };
  array2: any[] = [
    {
      image: "assets/imgs/promotions.png",
      text: "Promociones",
      type: "image",
      route: "tabs/offers"
    },
    {
      image: "assets/imgs/mensajería.jpg",
      text: "Mensajería",
      type: "image",
      route: "tabs/transport-type"
    },
    {
      image: "assets/imgs/trending.png",
      text: "Tendencias",
      type: "image"
    },
    {
      image: "assets/imgs/new-products.png",
      text: "Lo nuevo",
      type: "image"
    },

  ]
  array3: any[] = [


  ]
  feautured_products: any[] = []
  banners = []
  banners_loading = true

  shops_loading = false
  categories: any[] = []
  categories_loading = false
  dataParams: any = {
    total: 0,
    per_page: 5,
    page: 1,
    filters: [],
  };
  cities: any[]
  principal_items: any[] = []


  constructor(private router: Router, private auth: AuthService,
    private ui: UiService, private request: RequestService,
    private error: ErrorResponseService,
    private realtime: RealtimeService

  ) { }

  ngOnInit() {
  }



  showProducts(item) {
    const id = item.id ? item.id : Number(item.seller_id)
    // localStorage.setItem("shop", JSON.stringify(item.store));

    if (id != 0) {
      localStorage.setItem("back_route", "tabs/home");
      this.auth.setBack(true);
      this.router.navigate(["tabs/show-products/" + id])
    }
  }

  async scrollToTop(): Promise<void> {
    try {
      this.myContent.scrollToTop(300);
    } catch (err) { }
  }

  



  async ionViewWillEnter() {
    this.shopPerCategories = {}
    this.slideOptsBusiness = {
      initialSlide: 0,
      speed: 400,
      slidesPerView: 2,
      autoplay: {
        delay: 2000,
      },
    }

    this.scrollToTop();
    this.request.get("indexcities").subscribe(async (res: any) => {
      this.cities = res.data
      /**Cargamos las categorías */
      await this.loadCategories();
      this.loadData(true);
    }, err => {
      this.error.response(err)
    })
    this.auth.removeBack()
    this.infiniteScroll.disabled = false;
    this.slideOpts4 = {
      initialSlide: 0,
      speed: 400,
      slidesPerView: 1,
      autoplay: {
        delay: 2000,
      },
    };
    this.slideOpts3 = {
      initialSlide: 0,
      speed: 400,
      slidesPerView: 3,
      autoplay: {
        delay: 5000,
      },
    }
    //  this.ui.presentModal(QualificationPage)
    if (!this.auth.person.cart_items) {
      localStorage.removeItem("shop")
    } else {
      if (this.auth.person.cart_items && this.auth.person.cart_items.length == 0) {
        localStorage.removeItem("shop")
      }
    }

    localStorage.removeItem("filters");
    this.auth.removeBack()
    this.auth.person.hide_cart = false;
    this.auth.setPerson(this.auth.person);
    this.banners_loading = true;
    this.categories_loading = true;
    this.request.get("/?featured=true&page=1&per_page=10&option=products_by_featured", true)
      .subscribe((res: any) => {
        this.feautured_products = [];
        console.log("Productos Destacados", res);
        const array: any[] = res.data;
        if (array) {
          array.forEach(e => {
            console.log("Producto", e)
            const metadata_extras = e.meta_data.find(m => m.key == "_wapf_fieldgroup");
            let fields = []
            if (metadata_extras) {

              const meta_fields: any[] = metadata_extras.value.fields;
              if (meta_fields) {
                meta_fields.map(field => {
                  fields.push({
                    label: field.label,
                    price: field.options.choices[0] ? Number(field.options.choices[0].pricing_amount) : 0,
                    required: field.required,
                    type: field.type,
                    id: field.id,
                    category_id: field.category_id,
                    category_name: field.category_name
                  })
                })
              }

              console.log("Medata Extras Fields", fields);
            }

            const obj = {
              id: e.id,
              image:  e.images[0] ? e.images[0].src : 'assets/imgs/sinimagen.png',
              business: e.store ? e.store.shop_name : "Mc Donalds",
              product: e.name ? e.name.replace("?", "ñ") : "",
              description: e.description ? e.description : e.short_description ? e.short_description : "Sin descripción",
              price: e.price ? e.price : 20000,
              time: "40-45 min",
              calification: "4.7",
              comments: "",
              store: e.store ? e.store : {},
              fields,
              available: e.stock_status == "instock",
              meta_data: e.meta_data,
              images: e.images
            }
            this.feautured_products.push(obj)
          }, err => {
            this.feautured_products = []
          })
        }

        console.log("Products Featured Array", this.feautured_products)
      })
    this.request.get("/?option=banners&page=1&per_page=10", true)
      .subscribe((res: any) => {
        this.banners_loading = false;
        console.log("Banners", res.data)
        this.banners = res.data;
      }, err => {
        this.banners_loading = false
      })




  }

  loadCategories() {
    return new Promise(resolve => {
      this.request
        .get("/?option=products/categories&page=1&per_page=100", true)
        .subscribe((async (res: any) => {
          resolve({})
          this.categories_loading = false;
          // (await loader).dismiss()

          // res.data = res.data.filter(c => c.id != 15);
          if (res.data) {
            res.data = res.data.map(c => {
              switch (c.id) {
                case 107:
                  c.icon = "casera"
                  break;
                case 106:
                  c.icon = "hamburger-r"
                  break;
                case 115:
                  c.icon = "shops"
                  break;
                default:
                  c.icon = "home"
                  break;
              }
              return c
            });
          }

          this.categories = res.data ? res.data : [];
          console.log("Categorías", res.data);
          if (this.categories.length > 0) {

            this.categories = [];
            const other_items = res.data.filter(c => c.id == 116).sort((a, b) => a.id - b.id);
            this.principal_items = res.data.filter(c => c.id == 115 || c.id == 124 || c.id == 135).sort((a, b) => a.id - b.id);
            const otherCategories = res.data.filter(c => c.parent == 0 && c.id != 15 && c.id != 115 && c.id != 116 &&c.id!=135 && c.id != 124 && c.id != 194 && c.image)
            console.log("Otras categorías", otherCategories);
            const length = Number((otherCategories.length / 2).toFixed(0));
            for (let i = 0; i < length; i++) {
              this.principal_items.push(otherCategories[i]);
            }
            console.log("Principal items", this.principal_items)
            
            const items = otherCategories.filter(c => !this.principal_items.find(pr => pr.id == c.id) && c.parent == 0)
            other_items.map(o => {
              this.categories.unshift(o);
            })
            

            this.categories.unshift({
              count: 3,
              description: "",
              display: "default",
              icon: "casera",
              id: 0,
              menu_order: 0,
              name: "Mensajería",
              parent: 115,
              slug: "comidas-caseras",
              image: {
                src: "assets/imgs/mensajeria.png"
              },
              route: "tabs/transport-type"
            })
            items.forEach(c => {
              this.categories.push(c)
            })
            this.categories.splice(0, 0, this.categories[1]);
            const categories = [];
            this.categories.forEach(c => {
              if (!categories.find(cate => cate.id == c.id)) {
                categories.push(c);
              }
            });
            this.categories = categories;
            this.categories.forEach(c => {
              if (c.id == 117 || c.id == 115) {
                c.route = "tabs/stores"
              }
              if (c.id == 116) {
                c.route = "tabs/offers"
              }
            })
            
            this.realtime.getFirebaseCollectionObject(`application_resources/3/5`)
              .subscribe((res: any) => {
                resolve({})
                if (res != null) {
                  const category = this.categories.find(c => c.id == 0);
                  category.image.src = res.image;
                  console.log("Res Image", res)
                } else {
                  this.realtime.setObject(`application_resources/3/5`,{
                    image: "https://firebasestorage.googleapis.com/v0/b/zapp-logistica-dev.appspot.com/o/mensajeria.png?alt=media&token=efc0e415-5773-467b-a595-3cc96c616d39"
                  })
                 
                }
              })
          }

        }), async (err: any) => {
          resolve({})
          this.categories_loading = false;
          console.log("Err", err);
        })
    })
  }

  get arrayShopPerCategories() {
    return Object.keys(this.shopPerCategories)
  }

  async loadData(starting, event?) {
    if (!starting) {
      this.dataParams.page++;
    }
    if (starting) {
      this.array3 = []
      this.dataParams.page = 1;
    }
    console.log("Page Number", this.dataParams.page)

    // this.orders = []
    let loader
    console.log("Loader init", loader)
    this.shops_loading = true
    if (!event) {
      loader = await this.ui.loading("Por favor espere...");
    }
    console.log("/?option=shops&page=" + this.dataParams.page + "&per_page=10")
    this.request.get("/?option=shops&page=" + this.dataParams.page + "&per_page=200", true)
      .subscribe(async (res: any) => {
        console.log("Tiendas", res)
        this.shops_loading = false;
        console.log("Loader", loader)
        if (loader) {
          console.log("Cancel Loading");
          (await loader).dismiss()
        }
        console.log("Tiendas", res.data)


        const array: any[] = res.data;
        console.log("Array de tiendas", array);
        array.forEach(sh => {
          console.log(sh.profile_settings ? sh.profile_settings.store_name : sh.display_name, sh)
          if (sh.profile_settings.address) {
            let str: string = sh.profile_settings.address.city;
            console.log("Ciudad antes", str);
            let city_selected: string = this.auth.person.city_selected ? this.auth.person.city_selected.name : this.auth.person.city;
            let city_id = this.auth.person.city_selected ? this.auth.person.city_selected.id : this.auth.person.city_id;
            city_selected = city_selected.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            console.log("Ciudad seleccionada ", city_selected);
            console.log("Ciudad restaurante ", str);
            if (str.includes(city_selected) || this.cities.find(d => (d.id == str && d.id == city_id))) {
              const obj = {
                id: sh.ID,
                image: sh.profile_settings.img_gravatar ? sh.profile_settings.img_gravatar : "assets/imgs/sinimagen.png",
                business: sh.profile_settings ? sh.profile_settings.store_name : sh.display_name,
                time: "40-45 min",
                calification: "4.7",
                price: 20000,
                description: "Sin descripción",
                store: sh
              }
              let categories = sh.profile_settings.categories;
              if (categories) {
                
                console.log("Categorías restaurante ", obj.business, categories)
                console.log("Categorías actuales", this.principal_items)
                console.log("Categorías Seleccionada", categories[0])
                const arrayCategories=[...this.principal_items,...this.categories]
                const category = arrayCategories.find(c => {
                  return typeof categories.find(cat=>cat.slug.includes(c.slug)) != "undefined";
                });
                console.log("Category is match")
                if (category) {
                  if (!this.shopPerCategories[category.id]) {
                    this.shopPerCategories[category.id] = {
                      title: category.name,
                      shops: []
                    }
                  }
                 
                  if(!this.array3.find(ti=>{
                    console.log("Id Shop", obj.business, obj.id, ti.id)
                    return ti.id==obj.id
                  })){
                    this.shopPerCategories[category.id].shops.push(obj);
                    this.array3.push(obj)
                  }
                  
                }
              }



            }
          } else {
            const obj = {
              id: sh.ID,
              image: sh.profile_settings.img_gravatar ? sh.profile_settings.img_gravatar : "assets/imgs/sinimagen.png",
              business: sh.profile_settings ? sh.profile_settings.store_name : sh.display_name,
              time: "40-45 min",
              calification: "4.7",
              price: 20000,
              description: "Lorem ipsumz dolor sit amet consectetur, adipisicing elit. Necessitatibus expedita ex ab ad sed molestiae deserunt aperiam cumque,",
              store: sh
            }
            this.array3.push(obj)
          }


        })
        console.log("Products Array", this.array3)
        if (event) {
          event.target.complete();
          if (res.data.length <= 0) {
            event.target.disabled = true;
          }
        }

      }, async err => {
        console.log("error", err)
        this.shops_loading = false;
        if (event) {
          event.target.complete();
        }
        if (loader) {
          (await loader).dismiss()
        }

        if (event && err.status && err.status == 400) {

          event.target.disabled = true;
        } else {
          (await loader).dismiss()
          if (!err.status) {
            this.error.response(err)
          }
          if (err.status && err.status != 400) {
            this.error.response(err)
          }
        }
      })




  }
  
  async showProduct(product) {

    const modal = await this.ui.presentModal(ProductPage, { product })
    modal.onDidDismiss().then((obj: any) => {
      console.log("Cancel", obj)
      if (!obj.data.cancel) {
        this.auth.person.total = 0;
        this.auth.person.quantity = 0;
        if (this.auth.person.cart_items && this.auth.person.cart_items.length > 0) {
          this.auth.person.cart_items.map(p => {
            this.auth.person.total += (Number(p.quantity) * (Number(p.price) + (p.additional_price ? Number(p.additional_price) : 0)))
            this.auth.person.quantity += p.quantity;
            this.auth.setPerson(this.auth.person)
          })
        }
      } else {
        product = obj.data.product;
      }

    })

  }

  hideCart() {
    this.auth.person.hide_cart = true;
    this.auth.setPerson(this.auth.person);
  }

  selectCategory(category) {
    if (!category.route) {
      const filters = {
        category: category.id
      };
      localStorage.setItem("filters", JSON.stringify(filters));
    }
    if (localStorage.getItem("category_selected")) {
      localStorage.removeItem("category_selected");
    }

    localStorage.setItem("category_selected", JSON.stringify(category))
    this.goTo(!category.route ? `tabs/stores/${category.id}` : category.route);

  }

  goTo(route) {

    if (route) {
      console.log("Route", route)
      this.hideCart()
      this.router.navigateByUrl(route)

      localStorage.setItem("back_route", "tabs/home");
      this.auth.setBack(true);

    }
    console.log("Aquí")
  }

  showCart() {
    this.auth.person.hide_cart = false;
    this.auth.setPerson(this.auth.person);
  }

}

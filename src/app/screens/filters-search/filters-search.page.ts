import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FiltersPage } from 'src/app/dialogs/filters/filters.page';
import { ProductPage } from 'src/app/dialogs/product/product.page';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorResponseService } from 'src/app/services/error-response.service';
import { RequestService } from 'src/app/services/request.service';
import { UiService } from 'src/app/services/ui.service';
import { Capacitor } from '@capacitor/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Keyboard } from '@capacitor/keyboard';
import { IonInfiniteScroll } from '@ionic/angular';
@Component({
  selector: 'app-filters-search',
  templateUrl: './filters-search.page.html',
  styleUrls: ['./filters-search.page.scss'],
})
export class FiltersSearchPage implements OnInit, AfterViewInit {
  @ViewChild('searchElemnt',{static:true}) searchElemnt: ElementRef;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  searchFilter = ""
  dataParams: any = {
    total: 0,
    per_page: 5,
    page: 1,
    filters: [],
  };
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 3,
    autoplay: {
      delay: 2000,
    },
  };
  feautured_products: any[] = []
  categories: any[] = []
  loading = false
  filters = {
    search: null,
    category: null,
    min_price: null,
    max_price: null,
    attribute: null,
    attribute_term: null
  };
  banners_loading = false
  banners: any[] = []
  array3: any[] = []
  constructor(private ui: UiService,
    private http: RequestService,
    private error: ErrorResponseService, private auth: AuthService) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    
  }

  async ionViewWillEnter() {
    this.getFilters()
    this.saveFilters();
    this.banners_loading = true;
    this.http.get("/?option=banners&page=1&per_page=10", true)
      .subscribe((res: any) => {
        this.banners_loading = false;
        console.log("Banners", res.data)
        this.banners = res.data;
      }, err => {
        this.banners_loading = false
      })
    this.http.get("/?featured=true&page=1&per_page=10&option=products_by_featured", true)
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
              image: e.images[0] ? e.images[0].src : 'assets/imgs/sinimagen.png',
              business: e.store ? e.store.shop_name : "Mc Donalds",
              product:e.name ? e.name.replace("?", "ñ"):"",
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
      this.infiniteScroll.disabled = false;
    this.loadData(true);

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

  focusGone(){

    if(Capacitor.platform!='web'){
      Keyboard.hide()
    }
    
  }

  saveFilters() {
    localStorage.setItem("filters", JSON.stringify(this.filters));
  }

  getFilters() {
    if (localStorage.getItem("filters")) {
      this.filters = JSON.parse(localStorage.getItem("filters"));
    } else {
      this.filters = {
        search: null,
        category: null,
        min_price: null,
        max_price: null,
        attribute: null,
        attribute_term: null
      }
    }
  }

  get activeFilters() {
    let i = 0;
    Object.keys(this.filters).map(key => {
      if (this.filters[key] != null) {
        i++;
      }
    });
    return i++;
  }

  clearFilter() {
    this.filters.search = null;
    this.filters.attribute = null;
    this.filters.attribute_term = null;
    this.filters.category = null;
    this.filters.max_price = null;
    this.filters.min_price = null;
    localStorage.removeItem("filters");
  }

  search() {
    this.infiniteScroll.disabled = false;
    if (this.searchFilter) {
      this.clearFilter()
      this.filters.search = this.searchFilter;
      this.saveFilters();
      this.infiniteScroll.disabled = false;
      this.loadData(true);
    } else {
      this.infiniteScroll.disabled = false;
      this.filters.search = null;
      this.saveFilters();
      this.array3 = []
    }


  }

  async loadData(starting, event?) {
    this.infiniteScroll.disabled = false;
    if (!starting) {
      this.dataParams.page++;

    }
    if (starting) {
      const arrayFiltersKeys= Object.keys(this.filters);
      const filterNotNull = arrayFiltersKeys.find(key=> this.filters[key] != null);
      this.array3 = []
      this.dataParams.page = 1;
      if(!filterNotNull) return;
      
    }

    // this.orders = []
    let loader
    console.log("Loader init", loader)
    this.loading = true
    let obj = {

    };
    Object.keys(this.filters).map(key => {
      if (this.filters[key] != null) {
        if (key.includes("price")) {
          this.filters[key] = this.filters[key].toString();
        }
        obj[key] = this.filters[key]
      }
    });
    let filters = {
      filters: obj
    }
    console.log("Objeto a enviar", obj);
    console.log("Url", "/?option=filter_products&page=" + this.dataParams.page + "&per_page=10")
    this.http
      .post("/?option=filter_products&page=" + this.dataParams.page + "&per_page=40", filters, true)
      .subscribe(async (res: any) => {

        this.loading = false;
        console.log("Loader", loader)
        if (loader) {
          console.log("Cancel Loading");
          (await loader).dismiss()
        }
        console.log("Products", res.data)

        const array: any[] = res.data;
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
                  price: field.options.choices[0] ? field.options.choices[0].pricing_amount : 0,
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
            image: e.images[0] ? e.images[0].src : 'assets/imgs/sinimagen.png',
            business: e.store ? e.store.shop_name : "Mc Donalds",
            product: e.name,
            description: e.description ? e.description : e.short_description ? e.short_description : "Sin descripción",
            price: e.price ? e.price : 20000,
            time: "40-45 min",
            calification: "4.7",
            comments: "",
            categories: e.categories,
            store: e.store ? e.store : {},
            fields,
            available: e.stock_status == "instock",
            meta_data: e.meta_data,
            images: e.images
          }
          if (!this.array3.find(a => a.id == obj.id)) {
            this.array3.push(obj)
          }
        })
        this.array3 = this.array3.sort((a, b) => { return a.price - b.price });
        console.log("Products Array", this.array3)
        if (event) {
          console.log("Event", event)
          event.target.complete();
          if (res.data.length <= 0) {
            event.target.disabled = true;
          }
        }

      }, async err => {
        console.log("error", err)
        this.loading = false;
        event.target.complete();
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

  async viewFilters() {
    const modal = await this.ui.presentModal(FiltersPage,);
    modal.onDidDismiss().then((data: any) => {
      console.log("Data Cancel", data)
      if (!data.data) {
        this.getFilters();
        this.loadData(true);
      }
    });
  }

}
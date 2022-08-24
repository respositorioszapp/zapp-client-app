import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ProductPage } from 'src/app/dialogs/product/product.page';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorResponseService } from 'src/app/services/error-response.service';
import { RequestService } from 'src/app/services/request.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
})
export class StoresPage implements OnInit {
  categories: any[] = []
  categories_loading = false
  category_selected :any= {}
  slideOpts3 = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 'auto'
  };
  dataParams: any = {
    total: 0,
    per_page: 5,
    page: 1,
    filters: [],
  };
  category = 0
  shops_loading = false
  array3: any[] = [
  ]
  cities:any[]=[]
  constructor(private router: Router, private auth: AuthService,
    private ui: UiService, private request: RequestService,
    private error: ErrorResponseService, private route: ActivatedRoute,) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.route.paramMap.pipe(take(1)).subscribe((data: any) => {
      if (typeof data.params.category != "undefined") {
        this.category = data.params.category;
        this.categories_loading = true;
        this.request
          .get("/?option=products/categories&page=1&per_page=100", true)
          .subscribe((async (res: any) => {
            this.categories_loading = false;
            // (await loader).dismiss()
            console.log("Categorías", res);
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
            if (this.categories.length > 0) {
              this.categories = this.categories.filter(c => c.parent == this.category);
            }
          }), async (err: any) => {
            this.categories_loading = false;
            console.log("Err", err);
          })
        if(localStorage.getItem("category_selected")){
          this.category_selected=JSON.parse(localStorage.getItem("category_selected"));
          this.request.get("indexcities").subscribe((res:any)=>{
            this.cities= res.data
            this.loadData(true);
          },err=>{
            this.error.response(err)
          })
        }
      }
    });

  }

  selectCategory(category) {
    if (!category.route) {
      const filters = {
        category: category.id
      };
      localStorage.setItem("filters", JSON.stringify(filters));
    }
    this.goTo(!category.route ? "tabs/search" : category.route);
  }

  showProducts(item) {
    // localStorage.setItem("shop", JSON.stringify(item.store));
    localStorage.setItem("back_route", "tabs/home");
    this.auth.setBack(true);

    this.router.navigate(["tabs/show-products/" + item.id])
  }

  async loadData(starting, event?) {
    if (!starting) {
      this.dataParams.page++;
    }
    if (starting) {
      this.array3 = []
      this.dataParams.page = 1;
    }

    // this.orders = []
    let loader
    console.log("Loader init", loader)
    this.shops_loading = true
    
    console.log("/?option=shops&page=" + this.dataParams.page + "&per_page=40")
    this.request.get("/?option=shops&page=" + this.dataParams.page + "&per_page=40", true)
      .subscribe(async (res: any) => {
        console.log("Products", res)
        this.shops_loading = false;
        console.log("Loader", loader)
        if (loader) {
          console.log("Cancel Loading");
          (await loader).dismiss()
        }
        console.log("Products", res.data)


        const array: any[] = res.data;
        console.log("Array de productos", array);
        array.forEach((sh,index) => {
          console.log(sh.display_name, sh)
          if(sh.profile_settings.categories){
            console.log("Profile categories Slug", sh.profile_settings.categories)
            console.log("Profile SLug", sh.profile_settings.categories[0].slug)
            console.log("Category SLug", this.category_selected.slug)
            const category = sh.profile_settings.categories.find(c =>c.slug.includes(this.category_selected.slug));
            if(category){
              if (sh.profile_settings.address) {
                let str: string = sh.profile_settings.address.city;
                console.log("Ciudad antes", str);
                let city_selected: string = this.auth.person.city_selected ? this.auth.person.city_selected.name : this.auth.person.city;
                let city_id= this.auth.person.city_selected ? this.auth.person.city_selected.id : this.auth.person.city_id;
                city_selected = city_selected.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                console.log("Str", str)
                console.log("Str ID", city_id)
                console.log("Str cities", this.cities)
                console.log("COmparación",this.cities.find(d=> (d.id==str && d.id==city_id)))
                if (str.includes(city_selected) || this.cities.find(d=> (d.id==str && d.id==city_id))) {
                  const obj = {
                    id: sh.ID,
                    image: sh.profile_settings.img_gravatar ? sh.profile_settings.img_gravatar : "assets/imgs/mccombo.jpg",
                    business:sh.profile_settings ? sh.profile_settings.store_name: sh.display_name,
                    time: "40-45 min",
                    calification: "4.7",
                    price: 20000,
                    description: "Sin descripción",
                    store: sh
                  }
                  this.array3.push(obj)
                }
              }else{
                const obj = {
                  id: sh.ID,
                  image: sh.profile_settings.img_gravatar ? sh.profile_settings.img_gravatar : "assets/imgs/mccombo.jpg",
                  business:sh.profile_settings ? sh.profile_settings.store_name: sh.display_name,
                  time: "40-45 min",
                  calification: "4.7",
                  price: 20000,
                  description: "Lorem ipsumz dolor sit amet consectetur, adipisicing elit. Necessitatibus expedita ex ab ad sed molestiae deserunt aperiam cumque,",
                  store: sh
                }
                this.array3.push(obj)
              }
            }else{

            }
            
          }
          if(index==(array.length-1)){
            this.array3= this.array3.sort((a,b)=> a.id-b.id);
          }
        })
        
        //Elimino duplicados
        let hash = {};
        this.array3 = this.array3.filter(o => hash[o.id] ? false : hash[o.id] = true);
        console.log("Shops Array", this.array3);
        

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

  goTo(route) {

    if (route) {
      console.log("Route", route)
      // this.hideCart()
      this.router.navigateByUrl(route)

      localStorage.setItem("back_route", `tabs/stores/${this.category}`);
      this.auth.setBack(true);

    }
    console.log("Aquí")
  }

}

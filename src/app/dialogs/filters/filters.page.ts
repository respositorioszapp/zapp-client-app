import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {
  slideOpts2 = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 4
  };
  slideOpts3 = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 4
  };
  array2: any[] = [
    {
      image: "assets/imgs/promotions.png",
      text: "Promociones",
      type: "image",
      route: "tabs/offers"
    },
    {
      image: "assets/imgs/zapp-m.png",
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

  max = 1000
  min = 1000
  category = 0

  categories: any[] = []
  filters = {
    search: null,
    category: null,
    min_price: null,
    max_price: null,
    attribute: null,
    attribute_term: null
  };
  banners:any[]=[]
  banners_loading = false
  constructor(private ui: UiService, private request: RequestService) { }

  ngOnInit() {
    this.slideOpts2.slidesPerView = 4;
  }

  get categoriesSorted(){
    const categorySlected = this.categories.find(c=>c.id==this.filters.search);
    if(categorySlected){
      return [categorySlected, ...this.categories.filter(c=>c.id!=categorySlected.id)]
    }
    return this.categories
  }

  async ionViewWillEnter() {
    console.log("Ion Cycle Will enter")

    this.slideOpts2 = {
      initialSlide: 0,
      speed: 400,
      slidesPerView: 4
    };
    if (localStorage.getItem("filters")) {
      this.filters = JSON.parse(localStorage.getItem("filters"));
      this.category = this.filters.category;
      this.min = this.filters.min_price != null && this.filters.min_price > 1000 ? this.filters.min_price : 1000;
      this.max = this.filters.max_price != null && this.filters.max_price > 1000 ? this.filters.max_price : 1000;
    }
    const loader = await this.ui.loading("Por favor espere...")
    this.request
      .get("/?option=products/categories&page=1&per_page=100", true)
      .subscribe((async (res: any) => {
        console.log("Categorías", res);
        res.data = res.data.filter(c => c.id != 15);
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
        this.categories = res.data.filter(c => c.parent != 0);
        (await loader).dismiss()
      }), async (err: any) => {
        (await loader).dismiss()
        console.log("Err", err);
      })
      this.banners_loading = true;
    this.request.get("/?option=banners&page=1&per_page=10", true)
      .subscribe((res: any) => {
        this.banners_loading = false;
        this.banners = res.data;
      }, err => {
        this.banners_loading = false;
      })
  }


  selectCategory(category) {
    console.log("Category", category)
    this.category = category.id;
  }

  dismiss(obj?) {

    this.ui.dismiss(obj)
  }

  applyFilters() {
    this.filters.min_price = this.min != null && this.min > 1000 ? this.min : null;
    this.filters.max_price = this.max != null && this.max > 1000 ? this.max : null;
    this.filters.category = this.category != null && this.category != 0 ? this.category : null;
    console.log("Filters", this.filters)
    localStorage.setItem("filters", JSON.stringify(this.filters));
    this.dismiss();
  }

  clearFilter() {
    this.filters = {
      search: null,
      category: null,
      min_price: null,
      max_price: null,
      attribute: null,
      attribute_term: null
    };
    this.min = 1000;
    this.max = 1000;
    this.category = 0;
    localStorage.removeItem("filters");
    this.dismiss()

  }

}

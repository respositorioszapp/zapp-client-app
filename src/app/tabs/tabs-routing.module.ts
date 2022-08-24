import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'select-client-city',
        loadChildren: () => import('../screens/select-client-city/select-client-city.module').then(m => m.SelectClientCityPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../screens/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'trending',
        loadChildren: () => import('../screens/trending/trending.module').then(m => m.TrendingPageModule)
      },
      {
        path: 'offers',
        loadChildren: () => import('../screens/offers/offers.module').then(m => m.OffersPageModule)
      },
      {
        path: 'summary',
        loadChildren: () => import('../screens/summary/summary.module').then(m => m.SummaryPageModule)
      },
      {
        path: 'select-address',
        loadChildren: () => import('../screens/select-address/select-address.module').then(m => m.SelectAddressPageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('../screens/orders/orders.module').then(m => m.OrdersPageModule)
      },
      {
        path: 'select-payment',
        loadChildren: () => import('../screens/select-payment/select-payment.module').then(m => m.SelectPaymentPageModule)
      },
      {
        path: 'transport-type',
        loadChildren: () => import('../screens/transport-type/transport-type.module').then(m => m.TransportTypePageModule)
      },
      {
        path: 'service-type',
        loadChildren: () => import('../screens/service-type/service-type.module').then(m => m.ServiceTypePageModule)
      },
      {
        path: 'select-city',
        loadChildren: () => import('../screens/select-city/select-city.module').then(m => m.SelectCityPageModule)
      },
      {
        path: 'trip',
        loadChildren: () => import('../screens/trip/trip.module').then(m => m.TripPageModule)
      },
      {
        path: 'select-time',
        loadChildren: () => import('../screens/select-time/select-time.module').then(m => m.SelectTimePageModule)
      },
      {
        path: 'add-driver',
        loadChildren: () => import('../screens/add-driver/add-driver.module').then(m => m.AddDriverPageModule)
      },
      {
        path: 'drivers',
        loadChildren: () => import('../screens/drivers/drivers.module').then(m => m.DriversPageModule)
      },
      {
        path: 'time-summary',
        loadChildren: () => import('../screens/time-summary/time-summary.module').then(m => m.TimeSummaryPageModule)
      },

      {
        path: 'profile',
        loadChildren: () => import('../screens/profile/profile.module').then(m => m.ProfilePageModule)
      },
      
      {
        path: 'personal-information',
        loadChildren: () => import('../screens/personal-information/personal-information.module').then(m => m.PersonalInformationPageModule)
      },
      
      {
        path: 'change-password',
        loadChildren: () => import('../screens/change-password/change-password.module').then(m => m.ChangePasswordPageModule)
      },
      
      {
        path: 'history',
        loadChildren: () => import('../screens/history/history.module').then(m => m.HistoryPageModule)
      },
      
      {
        path: 'about',
        loadChildren: () => import('../screens/about/about.module').then(m => m.AboutPageModule)
      },
      
      {
        path: 'payment-method',
        loadChildren: () => import('../screens/payment-method/payment-method.module').then(m => m.PaymentMethodPageModule)
      },
      {
        path: 'create-order',
        loadChildren: () => import('../screens/dummy-create-order/dummy-create-order.module').then(m => m.DummyCreateOrderPageModule)
      },
      {
        path: 'show-products/:shop',
        loadChildren: () => import('../screens/show-products/show-products.module').then(m => m.ShowProductsPageModule)
      },
      {
        path: 'wish-list',
        loadChildren: () => import('../screens/wishlist/wishlist.module').then(m => m.WishlistPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../screens/filters-search/filters-search.module').then(m => m.FiltersSearchPageModule)
      },
      {
        path: 'stores/:category',
        loadChildren: () => import('../screens/stores/stores.module').then(m => m.StoresPageModule)
      },

      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

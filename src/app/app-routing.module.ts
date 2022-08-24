import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) 
  },
  {
    path: 'login',
    loadChildren: () => import('./screens/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./screens/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'select-type',
    loadChildren: () => import('./screens/select-type/select-type.module').then( m => m.SelectTypePageModule)
  },
  {
    path: 'signup-business',
    loadChildren: () => import('./screens/signup-business/signup-business.module').then( m => m.SignupBusinessPageModule)
  },
  {
    path: 'signup-business',
    loadChildren: () => import('./screens/signup-business/signup-business.module').then( m => m.SignupBusinessPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'transport-type',
    loadChildren: () => import('./screens/transport-type/transport-type.module').then( m => m.TransportTypePageModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./screens/order/order.module').then( m => m.OrderPageModule)
  },
  {
    path: 'service-type',
    loadChildren: () => import('./screens/service-type/service-type.module').then( m => m.ServiceTypePageModule)
  },
  {
    path: 'select-city',
    loadChildren: () => import('./screens/select-city/select-city.module').then( m => m.SelectCityPageModule)
  },
  {
    path: 'select-address',
    loadChildren: () => import('./screens/select-address/select-address.module').then( m => m.SelectAddressPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./dialogs/map/map.module').then( m => m.MapPageModule)
  },

  {
    path: 'trip',
    loadChildren: () => import('./screens/trip/trip.module').then( m => m.TripPageModule)
  },
  {
    path: 'select-time',
    loadChildren: () => import('./screens/select-time/select-time.module').then( m => m.SelectTimePageModule)
  },
  {
    path: 'summary',
    loadChildren: () => import('./screens/summary/summary.module').then( m => m.SummaryPageModule)
  },
  {
    path: 'select-payment',
    loadChildren: () => import('./screens/select-payment/select-payment.module').then( m => m.SelectPaymentPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./screens/orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'view-order',
    loadChildren: () => import('./dialogs/view-order/view-order.module').then( m => m.ViewOrderPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./screens/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'add-driver',
    loadChildren: () => import('./screens/add-driver/add-driver.module').then( m => m.AddDriverPageModule)
  },
  {
    path: 'drivers',
    loadChildren: () => import('./screens/drivers/drivers.module').then( m => m.DriversPageModule)
  },
  {
    path: 'select-driver',
    loadChildren: () => import('./dialogs/select-driver/select-driver.module').then( m => m.SelectDriverPageModule)
  },
  {
    path: 'time-summary',
    loadChildren: () => import('./screens/time-summary/time-summary.module').then( m => m.TimeSummaryPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./screens/history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./screens/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'personal-information',
    loadChildren: () => import('./screens/personal-information/personal-information.module').then( m => m.PersonalInformationPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./screens/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./dialogs/events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'image',
    loadChildren: () => import('./dialogs/image/image.module').then( m => m.ImagePageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./screens/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'payment-method',
    loadChildren: () => import('./screens/payment-method/payment-method.module').then( m => m.PaymentMethodPageModule)
  },
  {
    path: 'dummy-create-order',
    loadChildren: () => import('./screens/dummy-create-order/dummy-create-order.module').then( m => m.DummyCreateOrderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./screens/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'offers',
    loadChildren: () => import('./screens/offers/offers.module').then( m => m.OffersPageModule)
  },
  {
    path: 'select-client-city',
    loadChildren: () => import('./screens/select-client-city/select-client-city.module').then( m => m.SelectClientCityPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./screens/password/password.module').then( m => m.PasswordPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./dialogs/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'trending',
    loadChildren: () => import('./screens/trending/trending.module').then( m => m.TrendingPageModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./dialogs/product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'show-products',
    loadChildren: () => import('./screens/show-products/show-products.module').then( m => m.ShowProductsPageModule)
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./screens/wishlist/wishlist.module').then( m => m.WishlistPageModule)
  },
  {
    path: 'qualification',
    loadChildren: () => import('./dialogs/qualification/qualification.module').then( m => m.QualificationPageModule)
  },
  {
    path: 'cart-select-payment',
    loadChildren: () => import('./dialogs/cart-select-payment/cart-select-payment.module').then( m => m.CartSelectPaymentPageModule)
  },
  {
    path: 'filters-search',
    loadChildren: () => import('./screens/filters-search/filters-search.module').then( m => m.FiltersSearchPageModule)
  },
  {
    path: 'filters',
    loadChildren: () => import('./dialogs/filters/filters.module').then( m => m.FiltersPageModule)
  },  {
    path: 'close-shop',
    loadChildren: () => import('./dialogs/close-shop/close-shop.module').then( m => m.CloseShopPageModule)
  },
  {
    path: 'stores',
    loadChildren: () => import('./screens/stores/stores.module').then( m => m.StoresPageModule)
  },
  {
    path: 'order-detail-timeline',
    loadChildren: () => import('./dialogs/order-detail-timeline/order-detail-timeline.module').then( m => m.OrderDetailTimelinePageModule)
  },
  {
    path: 'activate-location',
    loadChildren: () => import('./dialogs/activate-location/activate-location.module').then( m => m.ActivateLocationPageModule)
  },
  {
    path: 'little-alert',
    loadChildren: () => import('./dialogs/little-alert/little-alert.module').then( m => m.LittleAlertPageModule)
  },
  {
    path: 'datetime-input',
    loadChildren: () => import('./dialogs/datetime-input/datetime-input.module').then( m => m.DatetimeInputPageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

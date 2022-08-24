import { Component, OnInit, Input } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { RequestService } from 'src/app/services/request.service';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorResponseService } from 'src/app/services/error-response.service';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.page.html',
  styleUrls: ['./qualification.page.scss'],
})
export class QualificationPage implements OnInit {

  @Input() order: any
  @Input() driver: any
  qualification: any = {
    one: false,
    two: false,
    three: false,
    four: false,
    five: false
  }
  opinion = ""
  constructor(private ui: UiService,
    private request: RequestService,
    private auth: AuthService,
    private error: ErrorResponseService) { }

  ngOnInit() {
    console.log("Driver", this.driver)
  }

  dismiss() {
    this.ui.dismiss({},'QualificationPage')
  }

  star(item) {
    Object.keys(this.qualification).forEach(key => {
      this.qualification[key] = false;
    });
    Object.keys(this.qualification).forEach(key => {
      switch (item) {
        case "one":
          this.qualification[item] = true;
          break;
        case "two":
          this.qualification["one"] = true;
          this.qualification[item] = true;
          break;
        case "three":
          this.qualification["one"] = true;
          this.qualification["two"] = true;
          this.qualification[item] = true;
          break;
        case "four":
          this.qualification["one"] = true;
          this.qualification["two"] = true;
          this.qualification["three"] = true;
          this.qualification[item] = true;
          break;
        case "five":
          this.qualification["one"] = true;
          this.qualification["two"] = true;
          this.qualification["three"] = true;
          this.qualification["four"] = true;
          this.qualification[item] = true;
          break;
      }

    })

  }

  async scoreIt() {
    let score = 0;
    Object.keys(this.qualification).forEach(key => {
      if (this.qualification[key]) {
        score++;
      }
    })
    if (score > 0) {
      const obj = {
        user_id: this.driver.driver_id,
        customer_id: this.auth.user.id,
        order_id: this.order.id,
        score,
        description: this.opinion
      }
      const loader = await this.ui.loading("Por favor espere...");
      this.request.post("score/rate_user", obj)
        .subscribe(async (res: any) => {
          (await loader).dismiss();
          this.order.score_service = score;
          this.dismiss();
        }, async (err: any) => {
          (await loader).dismiss();
          this.error.response(err);
        })
      console.log("Score", score)
      console.log("Opinion", this.opinion)
    }else{
      await this.ui.presentAlert({
        mode: 'ios',
        header: 'Debe poner una calificación ',
        buttons: [
          {
            text: 'Aceptar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {

            }
          },
        ]
      });
    }

  }

}

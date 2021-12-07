import { Component, NgZone } from '@angular/core';
import { ICustomWindow, WindowRefService } from 'src/app/service/window-ref.service';
import { DataService} from '../../data.service';
import {HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Integer } from 'aws-sdk/clients/apigateway';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  private _window: ICustomWindow;
  public rzp: any;
  public username: string="";
  public fee_amount: Integer=0;
  public lambda_fees_update= environment.lambda_fees_update_url;
  public lambda_fees_fetch_url= environment.lambda_fees_fetch_url;


  public options: any = {
    key: 'rzp_test_fRTTnrqA3tR3wZ', // add razorpay key here
    name: 'Fees payment',
    description: 'Admission',
    amount: this.fee_amount, // razorpay takes amount in paisa
    prefill: {
      name: 'Fees Payment',
      email: this.dataservice.email, // add your email id
    },
    notes: {},
    theme: {
      color: '#3880FF'
    },
    handler: this.paymentHandler.bind(this),
    modal: {
      ondismiss: (() => {
        this.zone.run(() => {
          // add current page routing if payment fails
        })
      })
    }
  };

  public getFees()
  {
     this.httpClient.get(this.lambda_fees_fetch_url+this.username,{responseType:'json'}).subscribe((data)=>{
       this.options.amount=data['Item']['due_fee'] * 100;
     //this.fee_amount=data['Item']['due_fee'];
     //this.fee_amount=this.fee_amount * 100; //change into paisa
     //this.options.amount=this.fee_amount;
     });
 }
  constructor(
    private zone: NgZone,
    private winRef: WindowRefService,
    public dataservice: DataService,
    private httpClient: HttpClient
  ) {
    this._window = this.winRef.nativeWindow;
    this.username=localStorage.getItem('username');
    this.getFees();

  }

  initPay(): void {
    //this.getFees();

    if(this.options.amount==0)
    {
      alert('No due amount');
    }
    else
    {
      this.rzp = new this.winRef.nativeWindow['Razorpay'](this.options);
      this.rzp.open();
    }
  //  console.log(localStorage.getItem('rzp_device_id'));
   // console.log(localStorage.getItem('rzp_preffered_instruments'));
    //console.log(localStorage.getItem('onComplete'));
  }

  paymentHandler(res: any) {
    this.zone.run(() => {
      // add API call here
      console.log("payment success");

      //call lambda url to update fees to 0 as it is paid
      this.feesUpdate();
      this.getFees();

    });
  }

  public feesUpdate()
   {
      this.httpClient.get (this.lambda_fees_update+this.username,{responseType:'json'}).subscribe((data)=>{
        withCredentials:true
      
      });
  }

}

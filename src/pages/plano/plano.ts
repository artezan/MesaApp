import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController  } from 'ionic-angular';
import {Provider} from  '../../providers/provider/provider'
import { Storage } from '@ionic/storage';
import { AngularFireDatabase  } from 'angularfire2/database';
import { Http, Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {HomePage} from '../home/home'
/**
 * Generated class for the PlanoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plano',
  templateUrl: 'plano.html',
})
export class PlanoPage {
mesa= [];
nivel1 = "Red";
nivel2 = "Cyan"
nivel3 = "secondary"
nivel_1 = [];
seleccionar = 0;
cliente;
libre=[];
numero = 0;
employee;
pivotes=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public provider: Provider,private storage: Storage,private http:Http,
   public afd: AngularFireDatabase,public toastCtrl: ToastController) {
    if (this.navParams.get('dar')==1) {
      this.cliente = this.navParams.get('item')
      this.seleccionar=1;
    }

    for (var i = 0; i < 62; ++i) {
     this.mesa.push({numero:i,estado:"secondary"})
    }
  
    this.obtener();
  this.libres();

  	
  }
  obtener(){
    this.provider.firebase().subscribe(items => {
    this.provider.mesas_store = items;
    this.activar(items);
    this.activar_pivote(items);  
     
  });
  }
  pivote(element){
  
    
      for (var i = this.provider.mesas_store.length - 1; i >= 0; i--) {
      if (this.provider.mesas_store[i].numero == element && this.provider.mesas_store[i].estado=="radio-button-off" ) {
        this.provider.mesas_store[i].estado="radio-button-on"
        this.afd.list('mesas').update(this.provider.mesas_store[i].key,this.provider.mesas_store[i]); 
             var myData = JSON.stringify({app_id: "18b2cb4f-b75d-456d-9c81-8577b8500b8b",
             contents: {"en": "Mesa ocupada: "+String(element)},
             included_segments: ["All"]});
              let headers = new Headers();
              headers.append('Authorization', 'Basic ZGE0ODgxOWEtN2M5MC00MDVkLThkMWMtYTBhYjhmODE5Y2Zj' );
             headers.append('Content-Type', 'application/json; charset=utf-8');
               let options = new RequestOptions({ headers: headers});
             this.http.post(' https://onesignal.com/api/v1/notifications',myData, options ).map(res =>  res.json()).subscribe(data => {
              console.log(data);
              });
             this.presentToast();
    }else if (this.provider.mesas_store[i].numero == element && this.provider.mesas_store[i].estado=="radio-button-on" ) {
        this.provider.mesas_store[i].estado="radio-button-off"
        this.afd.list('mesas').update(this.provider.mesas_store[i].key,this.provider.mesas_store[i]);   
        

      }

    
  }
  
}

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Mesa asignada correctamente',
      duration: 3000
    });
    toast.present();
  }
  libres(){
    for (var i = this.mesa.length - 1; i >= 0; i--) {
     for (var ii = this.provider.mesas_store.length - 1; ii >= 0; ii--) {
       if (this.mesa[i].numero==this.provider.mesas_store[ii].numero && this.provider.mesas_store[ii].tipo_res == "libre" && 
         this.provider.mesas_store[ii].estado == "radio-button-off" && this.mesa[i].numero!=0  ) {
          this.libre.push({numero:this.mesa[i].numero})
        }

     }
    }
    
  }
  
  activar(items){
    for (var i = items.length - 1; i >= 0; i--) {
    if (items[i].estado == 'radio-button-on' ) {
      for (var ii = this.mesa.length - 1; ii >= 0; ii--) {
        if(items[i].numero == this.mesa[ii].numero){
           this.mesa[ii].estado = "Grey";
            }
    
    }

  }else if (items[i].estado == 'radio-button-off' ) {
      for (var ii = this.mesa.length - 1; ii >= 0; ii--) {
        if(items[i].numero == this.mesa[ii].numero){
           this.mesa[ii].estado = "secondary";
            }
    
    }

  }
}
}
 activar_pivote(items){
   var ii=0;
    for (var i = items.length - 1; i >= 0; i--) {
    if (items[i].desc=='Pivote' ) {
      this.pivotes[ii] = items[i]
      ii++
}
}
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlanoPage');
  }

  select(element){ 
    if (this.navParams.get('dar')==1) {
      var dar = this.navParams.get('item')
     
     for (var i = this.provider.mesas_store.length - 1; i >= 0; i--) {
      if (this.provider.mesas_store[i].numero == element && this.provider.mesas_store[i].estado=="radio-button-off"  ) {
        this.mesa[element].estado = "Grey";
        this.afd.list('mesas').update(dar.key,{numero:element,estado:"radio-button-on"});   
        this.afd.list('mesas').update(this.provider.mesas_store[i].key,{numero:dar.numero,estado:"radio-button-off"});   
          
        

             var myData = JSON.stringify({app_id: "18b2cb4f-b75d-456d-9c81-8577b8500b8b",
             contents: {"en": "Mesa ocupada: "+String(element)},
             included_segments: ["All"]});
              let headers = new Headers();
              headers.append('Authorization', 'Basic ZGE0ODgxOWEtN2M5MC00MDVkLThkMWMtYTBhYjhmODE5Y2Zj' );
             headers.append('Content-Type', 'application/json; charset=utf-8');
               let options = new RequestOptions({ headers: headers});
             this.http.post(' https://onesignal.com/api/v1/notifications',myData, options ).map(res =>  res.json()).subscribe(data => {
              console.log(data);
              });
         this.presentToast();
      }else if (this.mesa[element].estado=="Grey"){
        console.log("ocupado")
      }
    }
   
    }else{
      console.log(element)
    for (var i = this.provider.mesas_store.length - 1; i >= 0; i--) {
      if (this.provider.mesas_store[i].numero == element && this.provider.mesas_store[i].estado=="radio-button-off"  ) {
        this.provider.mesas_store[i].estado="radio-button-on"
        this.mesa[element].estado = "Grey";
        this.afd.list('mesas').update(this.provider.mesas_store[i].key,this.provider.mesas_store[i]);   


             var myData = JSON.stringify({app_id: "18b2cb4f-b75d-456d-9c81-8577b8500b8b",
             contents: {"en": "Mesa ocupada: "+String(element)},
             included_segments: ["All"]});
              let headers = new Headers();
              headers.append('Authorization', 'Basic ZGE0ODgxOWEtN2M5MC00MDVkLThkMWMtYTBhYjhmODE5Y2Zj' );
             headers.append('Content-Type', 'application/json; charset=utf-8');
               let options = new RequestOptions({ headers: headers});
             this.http.post(' https://onesignal.com/api/v1/notifications',myData, options ).map(res =>  res.json()).subscribe(data => {
              console.log(data);
              });
             this.presentToast();

      }else if (this.provider.mesas_store[i].numero == element && this.provider.mesas_store[i].estado=="radio-button-on"  ) {
        this.provider.mesas_store[i].estado="radio-button-off"
        this.mesa[element].estado = "secondary";
        this.afd.list('mesas').update(this.provider.mesas_store[i].key,this.provider.mesas_store[i]);   
        
      }
    }
     console.log(this.provider.mesas_store)
    }
  this.obtener();
}
dar_mesa(){
this.seleccionar=1;

}

}
 
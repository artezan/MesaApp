import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {HomePage} from  '../home/home';
import {Provider} from  '../../providers/provider/provider'
import { Storage } from '@ionic/storage';
import { Clipboard } from '@ionic-native/clipboard';
import { AngularFireDatabase  } from 'angularfire2/database';

/**
 * Generated class for the CapturarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-capturar',
  templateUrl: 'capturar.html',
})
export class CapturarPage {
textarea;
textarea2;
textarea_rp;
mesas=[];
disponibles = 0;
numero;
desc;
nivel;
nombre;
nombre_res;
numero_mesa=[];
tipo_res;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public provider: Provider,private storage: Storage,
    private clipboard: Clipboard, public afd: AngularFireDatabase) {
    for (var i = this.provider.mesas_store.length - 1; i >= 0; i--) {
      if (this.provider.mesas_store[i].tipo_res=="libre" && this.provider.mesas_store[i].numero<=55) {
        this.disponibles++;
        this.numero_mesa.push({numero:this.provider.mesas_store[i].numero,key:this.provider.mesas_store[i].key})
      }
    }
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CapturarPage');
  }
  generar(data,text,campo){
   this.mesas.length=0;
    var a = String(data.mesas).split(",")
    
 var ii = 0 ;
  var num = (text.match(/\n/g)||[]).length;

    var res = text.split(/\n/g);
    console.log(res)
  for (var i = 0; i < 100; ++i) {
  	var nivel=0;
      if (i<=12 && i!=0) {
        nivel = 1
      }else if (i<=29 && i>=20) {
        nivel = 2;
      }else if (i<=35 && i>=30) {
        nivel = 3
      }else if (i<=49 && i>=40) {
        nivel = 2;
      }else if (i<=55 && i>=50) {
        nivel = 3;
      }
      if (nivel != 0 && campo == '1') {
    if (ii<res.length) {
      this.mesas.push({numero:i,nombre:res[ii],tipo_res: "capitan", nombre_res: "capitan"+String(i), desc: "algo",estado:"radio-button-off",
        nivel:nivel})
     ii++;
     if (a.indexOf(String(i)) != -1) {
       this.mesas.push({numero:String(i)+'a',nombre:res[ii],tipo_res: "capitan", nombre_res: "capitan"+String(i), desc: "Pivote",estado:"radio-button-off",
        nivel:nivel})
       ii++;
        }
    }else  {
      this.mesas.push({numero:i,nombre:" ",tipo_res: "libre", nombre_res: " ", desc: "algo",estado:"radio-button-off",
        nivel:nivel})
    }
 	
      }else if (nivel !=0 && campo == '2' && ii<res.length ) {
        for (var iii = this.provider.mesas_store.length - 1; iii >= 0; iii--) {
          if (this.provider.mesas_store[iii].tipo_res=="libre" && this.provider.mesas_store[iii].numero==i) {
          this.provider.mesas_store[iii]=({numero:this.provider.mesas_store[iii].numero,nombre:res[ii],tipo_res: "capitan", nombre_res: "capitan"+String(iii)
         , desc: "algo",estado:"radio-button-off",nivel:nivel, key: this.provider.mesas_store[iii].key});
          this.mesas.push({numero:this.provider.mesas_store[iii].numero,nombre:res[ii],tipo_res: "capitan", nombre_res: "capitan"+String(iii)
         , desc: "algo",estado:"radio-button-off",nivel:nivel, key: this.provider.mesas_store[iii].key});
     ii++;
        }
        }
        
      }
  	 
  }
 if (campo == '1') {
    this.afd.list('/mesas/').remove();
    this.provider.mesas_store.length = 0;
  this.provider.mesas_store=this.mesas;
  for (var i = this.provider.mesas_store.length - 1; i >= 0; i--) {
    this.afd.list('/mesas/').push(this.provider.mesas_store[i]);
  }

 }else{
   for (var i = this.mesas.length - 1; i >= 0; i--) {
    this.afd.list('/mesas/').update(this.mesas[i].key,this.mesas[i]);
  }
  this.provider.mesas_store.push(this.mesas);
 }
  

        this.navCtrl.setRoot(HomePage);
  
  
  
  }
 
  /* generar_normal_rp(data){
 var res_rp = this.textarea_rp.split(/\n/g);
 var ii = 0 ;    
 var iii=0;

  for (var i = 0; i < 62; ++i) {
    var nivel=0;
      if (i<=12 && i!=0) {
        iii=i;
        nivel = 1
      }else if (i<=29 && i>=20) {
        iii=i;
        nivel = 2;
      }else if (i<=35 && i>=30) {
        iii++;
        nivel = 3
      }else if (i<=49 && i>=40) {
        iii++;
        nivel = 2;
      }else if (i<=55 && i>=50) {
        iii++;
        nivel = 3;
      }
      if (ii<res_rp.length && i<this.provider.mesas_store.length ) {
        console.log(i)
      if(nivel != 0 && data == "r" && this.provider.mesas_store[i].tipo_res == "libre" ){

        
        
        this.provider.mesas_store[i]=({numero:this.provider.mesas_store[i].numero,nombre:res_rp[ii],tipo_res: "rp", nombre_res: "RP"+String(i), desc: "algo",estado:"radio-button-off",
        nivel:nivel});
     ii++;
        }
      }
     
  }

 this.storage.set('lista',this.provider.mesas_store);
 if (data == 'r') {
      this.navCtrl.setRoot(HomePage);
 }
console.log(this.mesas)
  
  }*/
  rp_pegar(){
    var str = this.textarea_rp.split(/\n/g);
    for (var i = this.textarea_rp.split(/\n/g).length - 1; i >= 0; i--) {
      this.provider.mesas_store.push({nombre:str[i],tipo_res:'rp',estado:"radio-button-off",numero:i+56 })
      this.afd.list('/mesas/').push({nombre:str[i],tipo_res:'rp',estado:"radio-button-off",numero:i+56 });
    }
        this.navCtrl.setRoot(HomePage);

  }

  pegar_r(){
this.clipboard.paste().then(
   (resolve: string) => {
      this.textarea_rp=resolve;
    },
    (reject: string) => {
      alert('Error: ' + reject);
    }
  );
 
  }
  pegar_c(){
this.clipboard.paste().then(
   (resolve: string) => {
      this.textarea=resolve;
    },
    (reject: string) => {
      alert('Error: ' + reject);
    }
  );
 
  }
  pegar_c2(){
this.clipboard.paste().then(
   (resolve: string) => {
      this.textarea2=resolve;
    },
    (reject: string) => {
      alert('Error: ' + reject);
    }
  );
 
  }

   presentPrompt(num) {
     var texto;
     if (num == '1') {
      texto  = this.textarea;
     }else {
      texto = this.textarea2;
     }
     if (texto==null) {
      
     }else{
  const alert = this.alertCtrl.create({
    title: 'Hay pivotes (a)?',
    inputs: [
      {
        name: 'mesas',
        placeholder: '20,29,30...',

      }
      
    ],
    buttons: [
       {
        text: 'Si',
        handler: data => {
          this.generar(data,texto,num);
        }
      },
       {
        text: 'No',
        role: 'cancel',
        handler: data => {
          this.generar("data",texto,num);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  alert.present();
}
}
agregar(){

    this.afd.list('/mesas/').update(this.numero.key,{numero:this.numero.numero,nombre:this.nombre,tipo_res:this.tipo_res, nombre_res: " ", desc: "algo",estado:"radio-button-off",
        nivel:" ",key:this.numero.key});
    this.navCtrl.setRoot(HomePage);

}

}

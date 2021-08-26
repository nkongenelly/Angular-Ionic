import { AngularFireDatabase } from '../../node_modules/angularfire2/database';
import { Injectable } from '../../node_modules/@angular/core';
import { AlertController } from '../../node_modules/@ionic/angular';

@Injectable({
    providedIn: 'root'
  })

export class FirebaseService{
    public mySavings: {savings:String,amount: Number,id?: Number, month: String}[] = [];
    public mySaving: {savings:String,amount: Number,id?: Number, month: String}[] = [];
    
    constructor(public db: AngularFireDatabase, public alertCtrl: AlertController){

    }

    onAdd(value:{savings: String,amount: Number,id?: Number,month: String},menu){
        this.db.list('/'+menu).push(value).then((item) => { 
            this.db.object('/'+menu+'/'+item.key).update({ id: item.key });
            console.log(item.key); 
           
          });

    }
    editMenu(id,menu,all){
        if(menu == 'savings'){
            this.mySaving = [];
            this.mySavings = all;
   // alert(this.myProjects);
         for(let saving of this.mySavings){
            if(this.mySavings.indexOf(saving)== id){
                this.mySaving.push(this.mySavings[id]); 
                return this.mySaving;
            }
         }
        }
    }

    replaceOneMenu(){
        return this.mySaving;
    }
    onEdit(value,menu){
        if(menu == "savings"){
            let menus = value.savings;
       
        this.db.object('/'+menu+'/'+value.Number).update({
            menu:menus,
            amount:value.amount,
            id:value.Number,
            month:value.month
          });
        }
    }

   async onDelete(index, menu){
        let alert = await this.alertCtrl.create({
            header: 'Confirm delete user',
            message: 'Are you sure you want to permanently delete this'+ menu +'item?',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                    console.log(index);
                    this.db.list('/'+menu).remove(index);
                    }
                }
            ]
        })
        
        
        await alert.present();
        
    }
        
    
}
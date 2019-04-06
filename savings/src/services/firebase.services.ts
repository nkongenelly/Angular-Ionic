import { AngularFireDatabase } from '../../node_modules/angularfire2/database';

export class FirebaseService{
    private mySavings: {savings:String,amount: Number,id?: Number, month: String}[] = [];
    private mySaving: {savings:String,amount: Number,id?: Number, month: String}[] = [];

    // constructor(public db: AngularFireDatabase){

    // }

    onAdd(value:{savings: String,amount: Number,id?: Number,month: String},menu){
        // this.db.list('/'+menu).push(value).then((item) => { 
        //     this.db.object('/'+menu+'/'+item.key).update({ id: item.key });
        //     console.log(item.key); 
           
        //   });

    }
}
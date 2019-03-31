export class SavingsService{
    private mySavings: {savings:String,amount: Number}[] = [];

    addSavings(mySaving: {savings:String,amount: Number}){
        this.mySavings.push(mySaving);
    }

    getMySaving(){
        return this.mySavings.slice();
    }

}
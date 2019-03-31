export class SavingsService{
    private mySavings: {savings:String,amount: Number}[] = [];
    private mySaving: {savings:String,amount: Number}[] = [];

    addSavings(mySaving: {savings:String,amount: Number}){
        this.mySavings.push(mySaving);
    }

    addSaving(myOneSaving: {savings:String,amount: Number}){
        this.mySaving = [];
        this.mySaving.push(myOneSaving);
        //console.log(myOneSaving);
        //console.log(this.mySaving);
    }

    getMySaving(){
        return this.mySavings.slice();
    }

    getOneSaving(){
        console.log(this.mySaving);
        return this.mySaving;
    }
    
    editMySavings(i){
        let editable = this.mySavings[i]
        return editable;
    }

}
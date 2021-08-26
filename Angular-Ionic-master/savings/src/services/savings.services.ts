export class SavingsService{

    private mySavings: {savings:String,amount: Number}[] = [];
    private mySaving: {savings:String,amount: Number,id?: Number}[] = [];

    private myProjects=[];
    private myProject: {savings:String,amount: Number|String,id?: Number|String, month: String}[] = [];

    addSavings(mySaving: {savings:String,amount: Number}){
        this.mySavings.push(mySaving);
    }

    replaceSavings(value: {savings:String,amount: Number,id?}){
        this.mySaving = [];
        return this.mySavings[value.id] = {savings:value.savings,amount:value.amount};
        //console.log(this.mySavings);
    }

    addSaving(myOneSaving: {savings:String,amount: Number,id?: Number}){
        this.mySaving = [];
        this.mySaving.push(myOneSaving);
        console.log(myOneSaving);
        console.log(this.mySaving);
    }

    getMySaving(){
        return this.mySavings.slice();
    }

    getOneSaving(){
        console.log(this.mySaving);
        return this.mySaving;
    }
    
    editMySavings(i){
        let editable: {savings:String,amount: Number,id?: Number} = this.mySavings[i];
        editable['id'] = i;
        console.log(editable);
        return editable;

    }
    //Firebase
    allProjects(projects){
       this.myProjects = projects;
        //return this.myProjects;
    }

    editMyProjects(id){
    this.myProject = [];
   // alert(this.myProjects);
         for(let project of this.myProjects){
            if(this.myProjects.indexOf(project)== id){
                this.myProject.push(this.myProjects[id]); 
                return this.myProject;
            }
         }
    }
    getEditableProject(){
        return this.myProject;
    }

}
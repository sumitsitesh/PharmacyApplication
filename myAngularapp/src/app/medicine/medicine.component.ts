import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';


@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {
  Medicines :any [];
  medicineType = [
    {type:"tablet"},
    {type:"syrup"},
    {type:"capsul"},
    {type:"gel"}
  ]
  id;
  name = "";
  type = "";
  ExpDate = "";
  Price = '';
  Manufacturer = "";
  

  constructor(private http:Http) {
    http.get('http://localhost:3000/Medicines')
    .subscribe(response =>{
        this.Medicines = response.json();
        console.log(this.Medicines,response.json());
    });
   }

   addMedicine(){
     let med = {
      "name": this.name,
      "type": this.type,
      "ExpDate": this.ExpDate,
      "Price": this.Price,
      "manufacturer": this.Manufacturer
     }
    
     this.http.post('http://localhost:3000/Medicines/addmedicineslist',med)
     .subscribe(response =>{
      console.log(response)
       this.Medicines.unshift(response.json());
      //  this.Medicines.splice(0,0,response);
       console.log(this.Medicines)
     })

     this.name= "";
     this.type = "";
     this.ExpDate = "";
     this.Price = '';
     this.Manufacturer = "";
   }
   deleteMedicine(med){
  
     this.id = med.id;
     console.log("med ID",this.id);
     this.http.delete('http://localhost:3000/Medicines/medicineslist'+'/'+med.id)
     .subscribe(response =>{
       let index = this.Medicines.indexOf(med);
       this.Medicines.splice(index,1);
       console.log(response.json())
     })
   
  }
  EditMedicine(med){
  console.log(med.name, med.id);
  this.updateObj = med;
  this.id = med.id
  this.name= med.name;
  this.type = med.type;
  this.ExpDate = med.ExpDate;
  this.Price = med.Price;
  this.Manufacturer = med.manufacturer
  ;
  }
  updateObj;
  updateMedicine(){
    
    let medObj = {
      
      "name": this.name,
      "type": this.type,
      "ExpDate": this.ExpDate,
      "Price": this.Price,
      "manufacturer": this.Manufacturer
    }
    console.log(medObj)

    this.http.put('http://localhost:3000/Medicines/medicineslist'+'/'+this.id,medObj)
    .subscribe(response =>{
      console.log(response.json())
      let index = this.Medicines.findIndex(it=> it.id == this.id);
      // let index = this.Medicines.indexOf(this.updateObj)
      // console.log(index);
      this.Medicines[index] = response.json();
      // console.log("current id",index1 ,this.id);
      // this.Medicines.splice(index1,1);
      // this.Medicines.push(medObj);
      // console.log("after Update",this.Medicines);
    })
    this.name= "";
    this.type = "";
    this.ExpDate = "";
    this.Price = '';
    this.Manufacturer = "";
  }

  ngOnInit() {
  }

}

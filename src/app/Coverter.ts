import { Injectable } from "@angular/core";
import { IConverter } from "./IConverter";
import { Employee } from "./Employee";
@Injectable({
  providedIn: "root",
})
export class Converter implements IConverter<Employee> {
  convert(item: any): Employee {
   // return new Employee({ Name: item.Name, Gender: item.Gender, Phone: item.Phone, Email: item.Email, id: 1,createdAt:new Date(),updatedAt:new Date() });
    return new Employee({ id:item.id, Name: item.Name, Gender: item.Gender, Phone: item.Phone, Email: item.Email, createdAt:new Date() });
  }
}
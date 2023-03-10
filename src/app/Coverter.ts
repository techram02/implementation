import {Injectable }from "@angular/core";
import { IConverter } from "./IConverter";
import { Employee } from "./Employee";

@Injectable({
      providedIn: "root",
    })

export class Converter implements IConverter<Employee> {
     convert(item: any): T {
     return new Employee();
     }
    }
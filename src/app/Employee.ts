import { ResourceModel } from './resource.model';

export class Employee extends ResourceModel<Employee>{
    id: number | undefined;
    Name: string | undefined;
    Gender: string | undefined;
    Phone: string | undefined;
    Email: string | undefined;

    constructor(model?: Partial<Employee>) {
        super(model!);
      }
}

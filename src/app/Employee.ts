import { ResourceModel } from './resource.model';
export class Employee extends ResourceModel<Employee> {
  public Name!: string;
  public Gender!: string;
  public Phone!: string;
  public Email!: string;
  constructor(model?: Partial<Employee>) {
    super(model);
  }
}


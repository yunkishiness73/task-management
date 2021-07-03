import { IsNotEmpty } from 'class-validator'
import { TaskStatus } from '../interfaces/tasks.interface';

export class CreateTaskDto {
  @IsNotEmpty()
  readonly title: string;
  
  @IsNotEmpty()
  readonly description: string;

  readonly status: TaskStatus;
}  
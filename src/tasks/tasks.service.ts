import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './interfaces/tasks.interface';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async findAll(): Promise<Task[]> {
    const tasks = await this.taskRepository.find();

    return tasks;
  }

  async findOne(id: number): Promise<Task> {
    console.log(id);
    const found = await this.taskRepository.findOne(id);
    
    if (!found) {
      throw new NotFoundException('Resource not found');
    }

    return found;
  }

  async create(createTaskDto: CreateTaskDto): Promise<any> {
   const { title, description } = createTaskDto;
   
   const task = new Task();
  
   task.title = title;
   task.description = description;
   task.status = TaskStatus.Open;

   const taskEntity = await task.save();

   return taskEntity;
  }

  async update(id: string, task: Task): Promise<void> {
    const updatedEntity = await this.taskRepository.update(id, task);
   
    if (!updatedEntity.affected) {
      throw new NotFoundException('Resource not found');
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (!result.affected)  {
      throw new NotFoundException('Resource not found');
    }
  }
}

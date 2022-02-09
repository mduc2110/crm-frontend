export interface Tag {
   id: number;
   name: string;
}

export interface TaskState {
   startTime: Date;
   endTime: Date;
   id: string;
   taskName: string;
   taskDescription: string;
   status: string;
   createdAt: Date;
   updatedAt: Date;
   user: {
      id: string;
      name: string;
   };
   customer: {
      customerName: string;
      id: string;
   };
   tasktype: {
      nameType: string;
      id: string;
   };
}

export interface SelectType {
   id: string;
   name: string;
}

export interface Role {
   id: string;
   name: string;
   description: string;
}

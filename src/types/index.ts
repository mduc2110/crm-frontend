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
   taskType: {
      nameType: string;
      id: string;
   };
}

export interface UserState {
   id: string;
   username: string;
   password: string;
   email: string;
   active: string;
   phone: string;
   name: string;
   roleId: string;
}

export interface SelectType {
   id: string;
   name: string;
}

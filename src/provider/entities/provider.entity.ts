export interface ServiceProvider {
    id: string;
    name: string;
    email: string;
    phone: string;
    street: string;
    number: string;
    postalCode: string;
    document: string;
    services: Service[];
    createdAt: Date;
    updatedAt: Date;
    scheduling: Scheduling[];
    evaluations: Evaluation[];
  }
  
  export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    serviceProviderId: string;
    serviceProvider: ServiceProvider;
    createdAt: Date;
    updatedAt: Date;
    scheduling: Scheduling[];
    evaluations: Evaluation[];
  }
  
  export interface Contractor {
    id: string;
    name: string;
    email: string;
    phone: string;
    street: string;
    number: string;
    postalCode: string;
    document: string;
    createdAt: Date;
    updatedAt: Date;
    scheduling: Scheduling[];
    evaluations: Evaluation[];
  }
  
  export interface Scheduling {
    id: string;
    serviceProviderId: string;
    contractorId: string;
    serviceId: string;
    scheduledDate: Date;
    createdAt: Date;
    updatedAt: Date;
    serviceProvider: ServiceProvider;
    contractor: Contractor;
    service: Service;
  }
  
  export interface Evaluation {
    id: string;
    serviceProviderId: string;
    contractorId: string;
    serviceId: string;
    rating: number;
    comment?: string | null;
    createdAt: Date;
    updatedAt: Date;
    serviceProvider: ServiceProvider;
    contractor: Contractor;
    service: Service;
  }
  
export interface ServiceResponse {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    serviceProviderId: string;
    valueMeter: number;
    valueHour: number;
    valueConvenient: number;
    createdAt: Date;
    updatedAt: Date;
    serviceProvider: {
      id: string;
      name: string;
      email: string;
      phone: string;
      street: string;
      number: string;
      postalCode: string;
      password: string;
      document: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }
  
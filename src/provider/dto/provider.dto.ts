import { z } from 'zod';

export const CreateProviderDto = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  street: z.string(),
  number: z.string(),
  password: z.string(),
  postalCode: z.string(),
  document: z.string(),
});

export const LoginDto = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const CreateServiceDto = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  duration: z.number(),
  serviceProviderId: z.string(),
});

export const CreateContractorDto = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  street: z.string(),
  number: z.string(),
  postalCode: z.string(),
  document: z.string(),
});

export const CreateSchedulingDto = z.object({
  serviceProviderId: z.string(),
  contractorId: z.string(),
  serviceId: z.string(),
  scheduledDate: z.date(),
});

export const CreateEvaluationDto = z.object({
  serviceProviderId: z.string(),
  contractorId: z.string(),
  serviceId: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
});


export type CreateProviderDtoType = z.infer<typeof CreateProviderDto>;
export type LoginDtoType = z.infer<typeof LoginDto>;
export enum PersonType {
   Natural = "N",
   Juridico = "J",
}

export interface IPerson {
   id: number;
   phone: number;
   address: string;
   personType: PersonType;
   identification: number;
   lastName?: string;
   firstName?: string;
   email: string;
   bussinessName?: string;
}

export type CreatePerson = Omit<IPerson, "id">;
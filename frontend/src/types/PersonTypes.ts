export enum PersonType {
   Natural = "N",
   Juridico = "J",
}
export interface IPeople {
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
export type IPeopleList = Omit<IPeople, "bussinessName" | "firstName" | "lastName" > & {
   name?: string;
}


export type CreatePerson = Omit<IPeople, "id">;
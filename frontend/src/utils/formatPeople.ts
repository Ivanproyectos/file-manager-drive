import { Person, PersonType } from "@/types";


export const formatPersonName = (person: Person) => {
    if (!person) return '';
  
    return person.personType === PersonType.Natural
      ? `${person.firstName} ${person.lastName}`
      : person.bussinessName;
  };
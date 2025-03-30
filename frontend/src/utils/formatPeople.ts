import { Person, PersonType } from "@/types";


export const formatPersonName = (person: Person): string => {
    if (!person) return '';
  
    return person.personType === PersonType.Natural
      ? `${person.firstName} ${person.lastName}`
      : person.bussinessName ?? '';
  };
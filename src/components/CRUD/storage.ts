import * as React from 'react';
import { Person, PersonId } from './models';

type Identifiable = {
  id: number;
}
type NewPerson = Omit<Person, 'id'>;

interface Storage<T extends Identifiable> {
  select(surnamePrefix?: string): ReadonlyArray<T>;
  insert(person: Omit<T, 'id'>): Readonly<T>;
  update(personId: PersonId, newPerson: NewPerson): Person | null;
  remove(personId: PersonId);
}

class InMemoryStorage implements Storage {
  private data: Person[] = [];
  private nextId: PersonId = 0;

  select(surnamePrefix?: string): ReadonlyArray<Person> {
    return surnamePrefix
      ? this.data.filter(person => person.surname.startsWith(surnamePrefix))
      : this.data;
  }

  private getId(): PersonId {
    this.nextId += 1;
    return this.nextId;
  }

  insert(newPerson: NewPerson): Readonly<Person> {
    const id = this.getId();

    const person = {
      id,
      ...newPerson,
    };

    this.data.push(person);
    return person;
  }

  update(personId: PersonId, newPerson: NewPerson): Readonly<Person> | null {
    let updatedPerson = null;
    this.data = this.data.map(person => {
      if (person.id === personId) {
        updatedPerson = { id: personId, ...newPerson };
        return updatedPerson;
      } else {
        return person;
      }
    });
    return updatedPerson;
  }

  remove(personId: PersonId): void {
    this.data = this.data.filter(person => person.id !== personId);
  }
}

const storage: Storage = new InMemoryStorage();
storage.person.all();
const rows = storage.select();

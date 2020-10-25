import { action, computed, makeObservable, observable } from 'mobx';

export class Animal {
  age!: number;

  constructor() {
    makeObservable(this, {
      age: observable,
      hashCode: computed,
    });
  }

  get hashCode(): string {
    // console.log('animal hashCode gets called');
    return `ani - ${(this.age === undefined) ? 0 : this.age} yrs`;
  }
}

export class Person extends Animal {
  name?: string;
  @observable children!: number;

  constructor() {
    super();
    makeObservable(this, {
      name: observable,
      // age: observable,
      incrementAge: action
    });
    // extendObservable(this, { age: this.age }, { age: observable });
  }

  incrementAge(): void {
    this.age = (this.age === undefined) ? 1 : (this.age + 1);
  }

  get hashCode(): string {
    // console.log('human hashCode gets called');
    return `${this.name ? this.name : '(unknown)'} - ${(this.age === undefined) ? 0 : this.age} yrs`;
  }
}

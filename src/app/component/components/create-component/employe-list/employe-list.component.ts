import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEmployeLastName'
})

export class FilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any[] {
      if (!items) {
          return [];
      }
      if (!field || !value) {
          return items;
      }

      return items.filter(singleItem => singleItem[field].toLowerCase().includes(value.toLowerCase()));
  }
}

export interface Employe {
  id: number;
  givenName: String;
  lastName: String;
  email: String;
  department: String;
  employeCheckBoxValue: boolean;
}

@Component({
  selector: 'sw-employe-list',
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.scss']
})

export class EmployeListComponent implements OnInit {

  test: Employe;
  test2: Employe;
  test3: Employe;
  list = [];
  newModerators = [];
  public searchString: string;

  constructor() {

  }

  ngOnInit() {

    this.test = {
      id: 1,
      givenName: 'hans',
      lastName: 'gruber',
      email: 'mail@gmail.de',
      department: 'berlin',
      employeCheckBoxValue: false
    };

    this.test2 = {
      id: 2,
      givenName: 'petra',
      lastName: 'grün',
      email: '@ba',
      department: 'departmentC',
      employeCheckBoxValue: false
    };

    this.test3 = {
      id: 3,
      givenName: 'georg',
      lastName: 'müller',
      email: '123@mweinmail',
      department: 'hamburg',
      employeCheckBoxValue: false
    };

    this.list.push(this.test);
    this.list.push(this.test2);
    this.list.push(this.test3);
    


  }
  testus() {
    console.log(this.newModerators);
  }

  addModerator(employe: Employe) {
    if (employe.employeCheckBoxValue) {
      this.newModerators.push(employe);
    }
    if (!employe.employeCheckBoxValue) {
      let index = this.newModerators.findIndex(d => d.id === employe.id);
      this.newModerators.splice(index, 1);
    }


  };

}


import { Component, OnInit } from '@angular/core';
import {TemplateRef, ViewChild} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-orgs',
  templateUrl: './orgs.component.html',
  styles: []
})
export class OrgsComponent implements OnInit {
  readonly BaseURI = 'http://localhost:60844/api/Organisation';
  Organisations: Array<Organisation>;
  editOrg: Organisation;
  isNewRecord: boolean;
  statusMessage: string;

  //типы шаблонов
  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getOrgs();
  }

  getOrgs() {
    var temp = this.http.get(this.BaseURI);
    //alert('SUCCESS temp!! :-)\n\n' + temp);
    temp.subscribe((data: Organisation[]) => {
      //alert('SUCCESS data!! :-)\n\n' + data);
      this.Organisations = data; 
    });
  }

  createOrg(user: Organisation){
    return this.http.post(this.BaseURI, user); 
  }
  updateOrg(id: number, user: Organisation) {
    const urlParams = new HttpParams().set("id", id.toString());
    return this.http.put(this.BaseURI, user, { params: urlParams});
  }
  deleteOrg(id: number){
    return this.http.delete(this.BaseURI + '/' + id);
  }
  
  // добавление пользователя
  addOrganisation() {
    this.editOrg = new Organisation(-1,"","","");
    this.Organisations.push(this.editOrg);
    this.isNewRecord = true;
  }

  // редактирование пользователя
  editOrganisation(org: Organisation) {
      this.editOrg = new Organisation(org.orgId, org.orgName, org.orgINN,org.orgAddress);
  }
  // загружаем один из двух шаблонов
  loadTemplate(org: Organisation) {
    if (this.editOrg && this.editOrg.orgId == org.orgId) {
        return this.editTemplate;
    } else {
        return this.readOnlyTemplate;
    }
  }

  saveOrganisation() {
    if (this.isNewRecord) {
        // добавляем пользователя
        this.createOrg(this.editOrg).subscribe(data => {
            this.statusMessage = 'Данные успешно добавлены',
            this.getOrgs();
        });
        this.isNewRecord = false;
        this.editOrg = null;
    } else {
        // изменяем пользователя
        this.updateOrg(this.editOrg.orgId, this.editOrg).subscribe(data => {
            this.statusMessage = 'Данные успешно обновлены',
            this.getOrgs();
        });
        this.editOrg = null;
    }
  }
  // отмена редактирования
  cancel() {
      // если отмена при добавлении, удаляем последнюю запись
      if (this.isNewRecord) {
          this.Organisations.pop();
          this.isNewRecord = false;
      }
      this.editOrg = null;
  }
  // удаление пользователя
  deleteOrganisation(org: Organisation) {
      this.deleteOrg(org.orgId).subscribe(data => {
          this.statusMessage = 'Данные успешно удалены',
          this.getOrgs();
      });
  }
}

export class Organisation{
  constructor(
      public orgId: number,
      public orgName: string,
      public orgINN: string,
      public orgAddress: string)
      { }
}

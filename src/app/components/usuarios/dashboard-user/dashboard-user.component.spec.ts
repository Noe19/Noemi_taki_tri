import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from '@firebase/util';

import { DashboardUserComponent } from './dashboard-user.component';

//const firebase = require ('@firebase/testing');
//const MY_PROYECTO ="takitesis";
describe('DashboardUserComponent', () => {
  let component: DashboardUserComponent;
  let fixture: ComponentFixture<DashboardUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/*
  it('NOga',async () => {
    const db =firebase.initializaTestApp({projectId:MY_PROYECTO}).firebase();
    const testDoc =db.collection('generos').doc("testDoc");
    await firebase.assertSucceeds(testDoc.get());
   // expect(component).toBeTruthy();
  });*/
});

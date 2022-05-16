import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAlbumesComponent } from './edit-albumes.component';

describe('EditAlbumesComponent', () => {
  let component: EditAlbumesComponent;
  let fixture: ComponentFixture<EditAlbumesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAlbumesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAlbumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

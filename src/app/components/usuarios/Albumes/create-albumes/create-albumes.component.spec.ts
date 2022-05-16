import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlbumesComponent } from './create-albumes.component';

describe('CreateAlbumesComponent', () => {
  let component: CreateAlbumesComponent;
  let fixture: ComponentFixture<CreateAlbumesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAlbumesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAlbumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

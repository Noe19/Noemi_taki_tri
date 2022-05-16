import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAlbumesComponent } from './show-albumes.component';

describe('ShowAlbumesComponent', () => {
  let component: ShowAlbumesComponent;
  let fixture: ComponentFixture<ShowAlbumesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAlbumesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAlbumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

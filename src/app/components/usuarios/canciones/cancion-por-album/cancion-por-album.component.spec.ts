import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancionPorAlbumComponent } from './cancion-por-album.component';

describe('CancionPorAlbumComponent', () => {
  let component: CancionPorAlbumComponent;
  let fixture: ComponentFixture<CancionPorAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancionPorAlbumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancionPorAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

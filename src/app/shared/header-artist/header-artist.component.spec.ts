import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderArtistComponent } from './header-artist.component';

describe('HeaderArtistComponent', () => {
  let component: HeaderArtistComponent;
  let fixture: ComponentFixture<HeaderArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderArtistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

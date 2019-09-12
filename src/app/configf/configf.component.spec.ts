import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigfComponent } from './configf.component';

describe('ConfigfComponent', () => {
  let component: ConfigfComponent;
  let fixture: ComponentFixture<ConfigfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

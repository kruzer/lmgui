import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigrComponent } from './configr.component';

describe('ConfigrComponent', () => {
  let component: ConfigrComponent;
  let fixture: ComponentFixture<ConfigrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

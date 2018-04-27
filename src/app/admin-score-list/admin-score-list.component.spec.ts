import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScoreListComponent } from './admin-score-list.component';

describe('AdminScoreListComponent', () => {
  let component: AdminScoreListComponent;
  let fixture: ComponentFixture<AdminScoreListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminScoreListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminScoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchComponent } from './switch.component';

describe('SwitchComponent', () => {
  let fixture: ComponentFixture<SwitchComponent>;
  let component: SwitchComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SwitchComponent,
      ],
    });
    fixture = TestBed.createComponent(SwitchComponent);
    component = fixture.componentInstance;
  });

  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(SwitchComponent);
  });

  it('should have a truthy id.', () => {
    expect(component.id).toBeTruthy();
  });

  it('should emit a changed value.', () => {
    spyOn(component.valueChange, 'emit');
    component.setValue(true);
    expect(component.valueChange.emit).toHaveBeenCalledWith(true);
    component.setValue(false);
    expect(component.valueChange.emit).toHaveBeenCalledWith(false);
  });
});

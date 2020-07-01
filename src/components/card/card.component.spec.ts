import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let fixture: ComponentFixture<CardComponent>;
  let component: CardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardComponent,
      ],
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(CardComponent);
  });

  it('should init the measure name.', () => {
    const measureNames = ['a', 'b', 'c'];
    component.measureNames = measureNames;
    component.ngOnInit();
    expect(measureNames.includes(component.currentMeasureName)).toBeTrue();
  });
});

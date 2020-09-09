import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SummaryValidityChipComponent } from './summary-validity-chip.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ChartSummarizationComponent', () => {
  let fixture: ComponentFixture<SummaryValidityChipComponent>;
  let component: SummaryValidityChipComponent;

  const backgroundColorRed = 'rgb(255, 87, 34)';
  const backgroundColorGreen = 'rgb(76, 175, 80)';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SummaryValidityChipComponent,
      ],
      imports: [
        NoopAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(SummaryValidityChipComponent);

    // init component inputs
    component = fixture.componentInstance;
    component.value = 0.0;

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(SummaryValidityChipComponent);
  });


  it('should render validity value.', () => {
    component.value = 0.712;
    fixture.detectChanges();

    const chipElement: HTMLElement = fixture.nativeElement.querySelector('.chip');
    expect(chipElement.textContent?.includes('0.71')).toBeTrue();
  });

  it('should render green background when validity is high.', () => {
    component.value = 1.0;
    fixture.detectChanges();

    const chipElement: HTMLElement = fixture.nativeElement.querySelector('.chip');
    expect(chipElement.style.backgroundColor).toBe(backgroundColorGreen);
  });

  it('should render red background when validity is low.', () => {
    component.value = 0.0;
    fixture.detectChanges();

    const chipElement: HTMLElement = fixture.nativeElement.querySelector('.chip');
    expect(chipElement.style.backgroundColor).toBe(backgroundColorRed);
  });

  it('should describe validity value in validity description.', () => {
    component.value = 1.0;
    fixture.detectChanges();
    expect(component.validityDescription.includes('1.0')).toBeTrue();

    component.value = 0.0;
    fixture.detectChanges();
    expect(component.validityDescription.includes('0.0')).toBeTrue();
  });
});

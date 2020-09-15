import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SummaryValidityChipComponent } from './summary-validity-chip.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ChartSummarizationComponent', () => {
  let fixture: ComponentFixture<SummaryValidityChipComponent>;
  let component: SummaryValidityChipComponent;

  const RED_RGB = 'rgb(255, 87, 34)';
  const GREEN_RGB = 'rgb(76, 175, 80)';
  const YELLOW_RGB = 'rgb(255, 235, 59)';

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
    expect(chipElement.style.backgroundColor).toBe(GREEN_RGB);
  });

  it('should render yellow background when validity is medium.', () => {
    component.value = 0.5;
    fixture.detectChanges();

    const chipElement: HTMLElement = fixture.nativeElement.querySelector('.chip');
    expect(chipElement.style.backgroundColor).toBe(YELLOW_RGB);
  });

  it('should render red background when validity is low.', () => {
    component.value = 0.0;
    fixture.detectChanges();

    const chipElement: HTMLElement = fixture.nativeElement.querySelector('.chip');
    expect(chipElement.style.backgroundColor).toBe(RED_RGB);
  });

  it('should describe validity value in validity description.', () => {
    component.value = 1.0;
    fixture.detectChanges();
    expect(component.validityDescription.includes('1.0')).toBeTrue();

    component.value = 0.0;
    fixture.detectChanges();
    expect(component.validityDescription.includes('0.0')).toBeTrue();
  });

  it('should show validity text when mouse enter.', async () => {
    spyOn(component, 'showText');
    const chipElement: HTMLElement = fixture.nativeElement.querySelector('.chip');
    chipElement.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    // TODO: Add tests for Angular animation and visibility of element
    expect(component.showText).toHaveBeenCalled();
  });

  it('should hide validity text when mouse leave.', async () => {
    spyOn(component, 'hideText');
    const chipElement: HTMLElement = fixture.nativeElement.querySelector('.chip');
    chipElement.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    chipElement.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();

    // TODO: Add tests for Angular animation and visibility of element
    expect(component.hideText).toHaveBeenCalled();
  });
});

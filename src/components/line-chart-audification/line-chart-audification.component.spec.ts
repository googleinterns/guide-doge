import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineChartAudificationComponent } from './line-chart-audification.component';
import { DataModule } from '../../services/data/data.module';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { Melody } from '../../models/melody/melody.model';
import { SimpleChange } from '@angular/core';

describe('LineChartAudificationComponent', () => {
  let fixture: ComponentFixture<LineChartAudificationComponent>;
  let component: LineChartAudificationComponent;

  function triggerKeyDown(key: string) {
    component.handleKeyDown(new KeyboardEvent('keydown', { key }));
  }

  function triggerKeyUp(key: string) {
    component.handleKeyUp(new KeyboardEvent('keyup', { key }));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DataModule,
      ],
      providers: [{
        provide: 'host',
        useClass: LineChartComponent,
      }],
      declarations: [
        LineChartAudificationComponent,
      ],
    });
    fixture = TestBed.createComponent(LineChartAudificationComponent);

    // init component inputs
    component = fixture.componentInstance;
    component.enabled = true;
    component.lowestPitch = 256;
    component.highestPitch = 1024;
    component.noteDuration = 100;

    // trigger host to create data
    component.host.measureName = 'activeUsers';
    component.host.ngOnChanges({ measureName: new SimpleChange(null, component.host.measureName, true) });
  });

  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(LineChartAudificationComponent);
  });

  it('should have truthy i18n values.', () => {
    expect(component.INSTRUCTIONS).toBeTruthy();
    expect(component.INSTRUCTIONS_A11Y).toBeTruthy();
  });

  it('should create a melody as the data changes.', () => {
    component.ngOnInit();
    expect(component.melody).toBeInstanceOf(Melody);
  });

  it('should play the melody while pressing SPACE.', () => {
    component.ngOnInit();
    triggerKeyDown(' ');
    expect(component.melody?.isPlaying).toBeTrue();
    triggerKeyUp(' ');
    expect(component.melody?.isPlaying).toBeFalse();
  });

  it(`should read out upon pressing 'x', 'y', or 'l'.`, () => {
    component.ngOnInit();
    spyOn(component, 'readOut');
    ['x', 'y', 'l'].forEach((key, i) => {
      triggerKeyDown(key);
      expect(component.readOut).toHaveBeenCalledTimes(i + 1);
    });
  });

  it(`should move playhead upon pressing numbers.`, () => {
    component.ngOnInit();
    spyOn(component.melody!, 'seekTo');
    for (let i = 0; i < 10; i++) {
      triggerKeyDown(`${i}`);
      expect(component.melody!.seekTo).toHaveBeenCalledTimes(i + 1);
    }
  });

  it('should pause the melody when losing focus.', () => {
    component.ngOnInit();
    triggerKeyDown(' ');
    expect(component.melody?.isPlaying).toBeTrue();
    component.handleBlur();
    expect(component.melody?.isPlaying).toBeFalse();
  });

  it('should empty the live text for a short period of time when the same text needs to be read out consequently.', async () => {
    const sameText = 'gUiDe-DoGe';
    component.readOut(sameText);
    expect(component.liveText).toBe(sameText);
    component.readOut(sameText);
    expect(component.liveText).toBe(null);
    await new Promise(resolve => window.setTimeout(resolve, 550));
    expect(component.liveText).toBe(sameText);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineChartAudificationComponent } from './line-chart-audification.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { Melody } from '../../models/melody/melody.model';
import { SimpleChange } from '@angular/core';
import { ScreenReaderModule } from '../screen-reader/screen-reader.module';
import { MatCardModule } from '@angular/material/card';
import { createLineChartMeta } from '../../datasets/metas/line-chart.meta';
import { mockData } from '../../utils/mocks.spec';
import { mod } from '../../utils/misc';
import { ScreenReaderComponent } from '../screen-reader/screen-reader.component';

describe('LineChartAudificationComponent', () => {
  class MockScreenReaderComponent extends ScreenReaderComponent {
    // override to remove unnecessary delay in running tests
    async readOut(text: string) {
      return true;
    }
  }

  let fixture: ComponentFixture<LineChartAudificationComponent>;
  let component: LineChartAudificationComponent;

  function triggerKeyDown(key: string) {
    return component.handleKeyDown(new KeyboardEvent('keydown', { key }));
  }

  function triggerKeyUp(key: string) {
    return component.handleKeyUp(new KeyboardEvent('keyup', { key }));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
      ],
      declarations: [
        LineChartComponent,
      ],
    });
    const hostFixture = TestBed.createComponent(LineChartComponent);
    const host = hostFixture.componentInstance;
    host.meta = createLineChartMeta(
      'Title',
      () => mockData,
    );
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      imports: [
        ScreenReaderModule,
      ],
      providers: [
        { provide: 'host', useValue: host },
      ],
      declarations: [
        LineChartAudificationComponent,
      ],
    });
    fixture = TestBed.createComponent(LineChartAudificationComponent);

    // init component inputs
    component = fixture.componentInstance;
    component.screenReaderComponent = new MockScreenReaderComponent();
    component.enabled = true;
    component.lowestPitch = 256;
    component.highestPitch = 1024;
    component.noteDuration = 10;
    component.readBefore = false;
    component.readAfter = true;

    host.ngOnInit();
    host.ngOnChanges({
      meta: new SimpleChange(null, host.meta, true),
    });
    component.ngOnInit();
  });

  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(LineChartAudificationComponent);
  });

  it('should have truthy i18n values.', () => {
    expect(component.INSTRUCTIONS).toBeTruthy();
  });

  it('should create a melody as the data changes.', () => {
    expect(component.melody).toBeInstanceOf(Melody);
  });

  it('should play the melody while pressing SPACE.', async () => {
    await triggerKeyDown(' ');
    expect(component.melody?.isPlaying).toBeTrue();

    await triggerKeyUp(' ');
    expect(component.melody?.isPlaying).toBeFalse();
  });

  it(`should read out upon pressing 'x', 'y', 'l', or '?'.`, async () => {
    spyOn(component.screenReaderComponent, 'readOut');
    let count = 0;
    for (const key of ['x', 'y', 'l', '?']) {
      await triggerKeyDown(key);
      expect(component.screenReaderComponent.readOut).toHaveBeenCalledTimes(++count);
    }
  });

  it(`should move playhead upon pressing numbers.`, async () => {
    spyOn(component.melody!, 'seekTo');
    for (let i = 0; i < 10; i++) {
      await triggerKeyDown(`${i}`);
      expect(component.melody!.seekTo).toHaveBeenCalledTimes(i + 1);
    }
  });

  it('should switch the legend item upon pressing UP or DOWN.', async () => {
    let prevDatumIndex;

    prevDatumIndex = component.datumIndex;
    await triggerKeyDown('ArrowUp');
    expect(component.datumIndex).toBe(mod(prevDatumIndex + 1, mockData.length));

    prevDatumIndex = component.datumIndex;
    await triggerKeyDown('ArrowDown');
    expect(component.datumIndex).toBe(mod(prevDatumIndex - 1, mockData.length));
  });

  it('should pause the melody when losing focus.', async () => {
    await triggerKeyDown(' ');
    expect(component.melody?.isPlaying).toBeTrue();
    component.handleBlur();
    expect(component.melody?.isPlaying).toBeFalse();
  });
});

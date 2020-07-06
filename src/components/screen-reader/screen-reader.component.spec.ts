import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScreenReaderComponent } from './screen-reader.component';

describe('ScreenReaderComponent', () => {
  let fixture: ComponentFixture<ScreenReaderComponent>;
  let component: ScreenReaderComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ScreenReaderComponent,
      ],
    });
    fixture = TestBed.createComponent(ScreenReaderComponent);
    component = fixture.componentInstance;
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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeoMapNavigationComponent } from './geo-map-navigation.component';
import { GeoMapComponent } from '../geo-map/geo-map.component';
import { ScreenReaderModule } from '../screen-reader/screen-reader.module';
import { createGeoMapMeta } from '../../datasets/metas/geo-map.meta';
import { ScreenReaderComponent } from '../screen-reader/screen-reader.component';
import { Country, Territory, TerritoryLevel, World } from '../../datasets/geo.types';
import { GeoDatum } from '../../datasets/queries/geo.query';
import { fetchWorld } from '../../datasets/geo.dataset';
import { GeoMapModule } from '../geo-map/geo-map.module';
import { GeoMapNavigationModule } from './geo-map-navigation.module';
import { oceaniaContinentId } from '../../utils/mocks.spec';

const { CONTINENT, SUBCONTINENT, COUNTRY, CITY } = TerritoryLevel;

describe('GeoMapNavigationComponent', () => {
  class MockScreenReaderComponent extends ScreenReaderComponent {
    // override to remove unnecessary delay in running tests
    async readOut(text: string) {
      return true;
    }
  }

  let fixture: ComponentFixture<GeoMapNavigationComponent>;
  let component: GeoMapNavigationComponent;
  let world: World;
  let countries: Country[];
  let mockData: GeoDatum[];

  function triggerKeyDown(key: string, options?: KeyboardEventInit) {
    return component.handleKeyDown(new KeyboardEvent('keydown', { ...(options ?? {}), key }));
  }

  beforeAll(async () => {
    world = await fetchWorld();
    countries = Object.values(world[COUNTRY]);
    mockData = countries.map(territory => ({
      territory,
      values: {
        activeUsers: 1,
        revenue: 2,
      },
    }));
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        GeoMapModule,
        GeoMapNavigationModule,
      ],
    });
    const hostFixture = TestBed.createComponent(GeoMapComponent);
    const host = hostFixture.componentInstance;
    host.meta = createGeoMapMeta(
      'Title',
      () => mockData,
      world,
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
        GeoMapNavigationComponent,
      ],
    });
    fixture = TestBed.createComponent(GeoMapNavigationComponent);

    // init component inputs
    component = fixture.componentInstance;
    component.screenReaderComponent = new MockScreenReaderComponent();
    component.enabled = true;

    host.ngOnInit();
    component.ngOnInit();
  });

  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(GeoMapNavigationComponent);
  });

  it('should have truthy i18n values.', () => {
    expect(component.INSTRUCTIONS).toBeTruthy();
  });

  it(`should read out upon pressing '?', '-', '+', ENTER, or arrow keys.`, async () => {
    spyOn(component.screenReaderComponent, 'readOut');
    let count = 0;
    for (const key of ['?', '-', '+', 'Enter', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight']) {
      await triggerKeyDown(key);
      expect(component.screenReaderComponent.readOut).toHaveBeenCalledTimes(++count);
    }
  });

  it('should switch the row upon pressing UP or DOWN.', async () => {
    component.activeDatumIndex = 0;
    await triggerKeyDown('ArrowDown');
    expect(component.activeDatumIndex).toBe(1);

    await triggerKeyDown('ArrowUp');
    expect(component.activeDatumIndex).toBe(0);
  });

  it('should switch the column upon pressing UP or DOWN.', async () => {
    component.activeMeasureIndex = 0;
    await triggerKeyDown('ArrowRight');
    expect(component.activeMeasureIndex).toBe(1);

    await triggerKeyDown('ArrowLeft');
    expect(component.activeMeasureIndex).toBe(0);
  });

  it('should enter the selected subordinate territory upon pressing ENTER.', async () => {
    component.filteringTerritory = null;
    component.activeDatumIndex = 0;
    await triggerKeyDown('Enter');
    expect(component.filteringTerritory).not.toBe(null);
  });

  it('should exit to the superordinate territory upon pressing SHIFT + ENTER', async () => {
    component.filteringTerritory = world[CONTINENT][oceaniaContinentId];
    await triggerKeyDown('Enter', { shiftKey: true });
    expect(component.filteringTerritory as Territory | null).toBe(null);
  });

  it(`should move focus to search upon pressing '/'`, async () => {
    spyOn(component.keywordElement, 'focus');
    await triggerKeyDown('/');
    expect(component.keywordElement.focus).toHaveBeenCalled();
  });

  it('should read out upon focusing.', async () => {
    spyOn(component.screenReaderComponent, 'readOut');
    await component.handleFocus();
    expect(component.screenReaderComponent.readOut).toHaveBeenCalled();
  });

  it('should reset active row and column indices upon blurring.', () => {
    component.activeDatumIndex = 0;
    component.activeMeasureIndex = 0;
    component.handleBlur();
    expect(component.activeDatumIndex).toBe(-1);
    expect(component.activeMeasureIndex).toBe(-1);
  });
});

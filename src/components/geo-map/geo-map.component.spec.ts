import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeoMapComponent } from './geo-map.component';
import { GeoMapD3 } from '../../d3/geo-map.d3';

describe('GeoMapComponent', () => {
  let fixture: ComponentFixture<GeoMapComponent>;
  let component: GeoMapComponent;
  let geoMapD3: GeoMapD3;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GeoMapComponent,
      ],
    });
    fixture = TestBed.createComponent(GeoMapComponent);
    component = fixture.componentInstance;
    geoMapD3 = component.geoMapD3;
  });

  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(GeoMapComponent);
  });

  it('should render d3 on init.', () => {
    spyOn(geoMapD3, 'render');
    component.ngOnInit();
    expect(geoMapD3.render).toHaveBeenCalled();
  });

  it('should clear d3 on destroy.', () => {
    spyOn(geoMapD3, 'clear');
    component.ngOnDestroy();
    expect(geoMapD3.clear).toHaveBeenCalled();
  });
});

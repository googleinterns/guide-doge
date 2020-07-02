import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { MatCardModule } from '@angular/material/card';

describe('CardComponent', () => {
  let fixture: ComponentFixture<CardComponent>;
  let component: CardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardComponent,
      ],
      imports: [
        MatCardModule
      ]
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should instantiate.', () => {
    expect(component).toBeInstanceOf(CardComponent);
  });
});

import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { BookModule } from "../../book.module";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BookCardComponent } from "./book-card.component";

describe("BookCardComponent", () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BookModule, HttpClientTestingModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const http = TestBed.inject(HttpTestingController);
    for (const request of http.match(() => true)) {
      request.flush({ content: [], totalPages: 0, totalElements: 0 });
    }
    http.verify();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

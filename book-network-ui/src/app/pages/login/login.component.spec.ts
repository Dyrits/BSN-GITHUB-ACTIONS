import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppModule } from "../../app.module";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(LoginComponent);
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

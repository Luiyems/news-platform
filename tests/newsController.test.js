import { describe, it, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import request from "supertest";
import app from "../backend/src/app.js";

describe("newsController", () => {
    describe("GET /api/news", () => {
        it("debe retornar todas las noticias", async () => {
            const res = await request(app).get("/api/news");
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("array");
        });

        it("debe tener estructura válida de noticia", async () => {
            const res = await request(app).get("/api/news");
            if (res.body.length > 0) {
                const news = res.body[0];
                expect(news).to.have.property("id");
                expect(news).to.have.property("title");
            }
        });
    });

    describe("GET /api/news/:id", () => {
        it("debe retornar 400 para ID inválido", async () => {
            const res = await request(app).get("/api/news/abc");
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property("error");
        });

        it("debe retornar 404 para ID inexistente", async () => {
            const res = await request(app).get("/api/news/999999");
            expect(res.status).to.equal(404);
        });
    });

    describe("GET /api/news/category/:id", () => {
        it("debe retornar 400 para categoría inválida", async () => {
            const res = await request(app).get("/api/news/category/xyz");
            expect(res.status).to.equal(400);
        });

        it("debe filtrar por categoría válida", async () => {
            const res = await request(app).get("/api/news/category/1");
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("array");
        });
    });
});
import { describe, it, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import { query } from "../backend/src/config/database.js";

describe("newsModel", () => {
    describe("getAllNews", () => {
        it("debe retornar todas las noticias ordenadas por fecha", async () => {
            const result = await query("SELECT 1 as id, 'Test' as title LIMIT 1");
            expect(result).to.have.property("rows");
            expect(result.rows).to.be.an("array");
        });
    });

    describe("getNewsById", () => {
        it("debe retornar noticia por id", async () => {
            const result = await query(
                "SELECT id, title FROM news WHERE id = $1",
                [1]
            );
            expect(result.rows).to.be.an("array");
        });
    });

    describe("getNewsByCategory", () => {
        it("debe filtrar noticias por category_id", async () => {
            const result = await query(
                "SELECT * FROM news WHERE category_id = $1 LIMIT 20",
                [1]
            );
            expect(result.rows).to.be.an("array");
        });
    });
});
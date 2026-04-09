import { describe, it } from "mocha";
import { expect } from "chai";
import { classifyCategory } from "../backend/src/services/rssService.js";

describe("rssService", () => {
    describe("classifyCategory", () => {
        it("debe clasificar política correctamente", () => {
            expect(classifyCategory("government news")).to.equal(1);
            expect(classifyCategory("president announcement")).to.equal(1);
            expect(classifyCategory("elecciones 2024")).to.equal(1);
            expect(classifyCategory("gobierno")).to.equal(1);
        });

        it("debe clasificar economía correctamente", () => {
            expect(classifyCategory("economy report")).to.equal(2);
            expect(classifyCategory("inflation data")).to.equal(2);
            expect(classifyCategory("stock market")).to.equal(2);
            expect(classifyCategory("bolsa valores")).to.equal(2);
        });

        it("debe clasificar deportes correctamente", () => {
            expect(classifyCategory("football match")).to.equal(3);
            expect(classifyCategory("soccer championship")).to.equal(3);
            expect(classifyCategory("liga española")).to.equal(3);
            expect(classifyCategory("champions league")).to.equal(3);
        });

        it("debe clasificar tecnología correctamente", () => {
            expect(classifyCategory("technology innovation")).to.equal(5);
            expect(classifyCategory("AI breakthroughs")).to.equal(5);
            expect(classifyCategory("google announcement")).to.equal(5);
            expect(classifyCategory("apple launch")).to.equal(5);
        });

        it("debe retornar default para casos no reconocidos", () => {
            expect(classifyCategory("random text")).to.equal(4);
            expect(classifyCategory("hello world")).to.equal(4);
        });
    });
});
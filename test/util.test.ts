import { getFailure, getSuccess, Status } from "../src/util/ResponseWrapper";

const chai = require("chai");
const expect = chai.expect;

describe("ResponseWrapper test", () => {
    it("should return SUCCESS wrapper", () => {
        const result = "test";
        const success = getSuccess(result);
        expect(success.error).to.be.undefined;
        expect(success.code).to.equal(200);
        expect(success.result).to.equal(result);
        expect(success.status).to.equal(Status.SUCCESS);
    });

    it("should return FAILURE wrapper", () => {
        const error = "test";
        const code = 400;
        const success = getFailure(code, error);
        expect(success.error).to.equal(error);
        expect(success.code).to.equal(code);
        expect(success.result).to.be.undefined;
        expect(success.status).to.equal(Status.FAILURE);
    });
});
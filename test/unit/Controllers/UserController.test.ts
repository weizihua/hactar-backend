import sinon from "sinon";
import {expect} from "chai";
import {Request, Response} from "express";
import {UserService} from "../../../src/Services/UserService";
import {UserController} from "../../../src/Controller/Api/UserController";
import logger from "../../../src/Services/Logger";
import * as bcrypt from "bcryptjs";

describe("UserController", function () {
    const password = bcrypt.hashSync('super secret password', 10);
    describe('POST /user/register', () => {
        const userServiceStub = sinon.createStubInstance(UserService);
        // @ts-ignore
        userServiceStub.registerUser.resolves({email: 'example@example.com', password: password});

        it('should add new user to the database', async function () {
            try {
                const userController = new UserController(
                    userServiceStub as unknown as UserService);
                const response = {} as Response;
                response.json = sinon.spy((result) =>
                    expect(result.password).to.be.equal(password)) as any;

                response.status = sinon.spy((result) => {
                    expect(result).to.equal(201)
                    return response;
                }) as any;

                await userController.registerUser({
                    body: {
                        email: 'example@example.com',
                        password: 'super secret password'
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occurred: ${err.message}');
                expect.fail(err);
            }
        });
    });

    describe('POST /user/login', () => {
        const userServiceStub = sinon.createStubInstance(UserService);
        // @ts-ignore
        userServiceStub.authenticateUser.resolves({"token": "test token"});

        it('should return JWT on existing valid email and password input', async function () {
            try {
                const userController = new UserController(
                    userServiceStub as unknown as UserService);
                const response = {} as Response;
                response.json = sinon.spy((result) =>
                    expect(result).to.have.property('token')) as any;

                response.status = sinon.spy((result) => {
                    expect(result).to.equal(200)
                    return response;
                }) as any;

                await userController.loginUser({
                    body: {
                        email: 'example@example.com',
                        password: 'secret password'
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occurred: ${err.message}');
                expect.fail(err);
            }
        });
    });

    describe('POST /user/daemon/login', () => {
        const userServiceStub = sinon.createStubInstance(UserService);
        // @ts-ignore
        userServiceStub.authenticateUserDaemonApp.resolves({"token": "test token"});

        it('should return JWT on existing valid email and password input', async function () {
            try {
                const userController = new UserController(
                    userServiceStub as unknown as UserService);
                const response = {} as Response;
                response.json = sinon.spy((result) =>
                    expect(result).to.have.property('token')) as any;

                response.status = sinon.spy((result) => {
                    expect(result).to.equal(200)
                    return response;
                }) as any;

                await userController.loginUserDaemonApp({
                    body: {
                        email: 'example@example.com',
                        password: 'secret password'
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occurred: ${err.message}');
                expect.fail(err);
            }
        });
    });

    describe('PUT /user/account', () => {
        const userServiceStub = sinon.createStubInstance(UserService);
        // @ts-ignore
        userServiceStub.updateAccount.resolves({email: 'new.email@test.com', password: password});

        it('should update email and password of the user', async function () {
            try {
                const userController = new UserController(
                    userServiceStub as unknown as UserService);
                const response = {} as Response;
                response.locals = {userId: 5};
                response.json = sinon.spy((result) => {
                    expect(result.password).to.be.equal(password);
                    expect(result.email).to.be.equal('new.email@test.com');
                }) as any;

                response.status = sinon.spy((result) => {
                    expect(result).to.equal(200)
                    return response;
                }) as any;

                await userController.updateUserAccount({
                    body: {
                        email: 'new.email@test.com',
                        password: 'super secret password'
                    }
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occurred: ${err.message}');
                expect.fail(err);
            }
        });
    });

    describe('GET /user/account', () => {
        const userServiceStub = sinon.createStubInstance(UserService);
        // @ts-ignore
        userServiceStub.fetchUserAccount.resolves({email: 'email@test.com', password: password});

        it('should update email and password of the user', async function () {
            try {
                const userController = new UserController(
                    userServiceStub as unknown as UserService);
                const response = {} as Response;
                response.locals = {userId: 5};
                response.json = sinon.spy((result) => {
                    expect(result.password).to.be.equal(password);
                    expect(result.email).to.be.equal('email@test.com');
                }) as any;

                response.status = sinon.spy((result) => {
                    expect(result).to.equal(200)
                    return response;
                }) as any;

                await userController.fetchUserAccount({
                    body: {}
                } as Request, response)
            } catch (err) {
                logger.error('Unexpected error occurred: ${err.message}');
                expect.fail(err);
            }
        });
    });
});

/**
 * 
 * Summary

The purpose of this module is to learn the following full-stack concepts:
Types of tests available
What to test
Back-end testing
Front-end testing
Types of tests available

Unit tests check that a single function works as expected.
Integration tests checks how several functions work together (e.g. an API endpoint).
End-to-end tests simulate the real usage of a full-stack app and check that an action on the client produces the expected result.
What to test

Always test the interface, not the implementation (e.g. given a certain input, test what a function returns, not how).
Test first the parts of your app that would be most likely to break if something in the code is modified later.
Test the most common use-cases and the “happy path” first (what should happen when things work as expected), then dive into edge cases and “unhappy paths” (what should happen with wrong inputs).
When writing unit tests, only check the custom logic of your app, not external libraries (they should already have their own tests, e.g. don’t test that a db query is working as expected).
When the logic that you’re testing depends on other functionality to work (e.g. a db, a network request, etc.), but that element is not the object of the test, you can substitute it with a “mock” (aka “dummy”, “fake”, or “stub”), which simulates the external component and reduces the complexity of your testing environment.
Back-end testing

When testing REST APIs, simulate HTTP requests (e.g. with SuperTest).
Writing code with pure functions and dependency injection (i.e. passing the dependencies needed by a class in the constructor) facilitates testing later as it allows you to use mocks.
When useful, you can also replace mock entire modules (e.g. with proxyquire or jest.mock()).
Front-end testing

You can write tests based on user events (e.g. render a component, simulate a button click, and check the result).
If you want to test that the client is displaying the right content, you can check the DOM output (e.g. with Enzyme), or the UI look (e.g. with snapshot testing).
You can write integration tests to ensure that different components work together as expected.
Testing frameworks provide ways to mock external dependencies so that you can test the front-end in isolation (e.g. to simulate the interaction with an API and the connected network requests).
 */

console.log('FULL STACK TESTING LECTURE')
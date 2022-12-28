# GoREST API automation testing with Cypress

![API_tests_on_gorest.co.in](https://github.com/Valiantsin2021/cypress_goRestApi_dockerized/workflows/API_tests_on_gorest.co.in/badge.svg)

Tests upon GET / POST / PATCH / DELETE endpoints

To start tests use:
    - npm install
    - npx cypress run

To test dockerized: 
    - docker build -t <preffered name> . (to build image)
    - docker start <preffered name> to run container

    OR:

    - docker run -it --rm --name cypress -v ${PWD}:/e2e -w /e2e --entrypoint=cypress cypress/included:10.9.0 run
    - docker run -it --rm --name cypress -v ${PWD}:/e2e -w /e2e cypress/included:10.9.0
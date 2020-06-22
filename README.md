# Project Guide-Doge

[![GitHub Actions Badge for 'build-and-lint'](https://github.com/googleinterns/guide-doge/workflows/Build%20and%20Lint/badge.svg)](https://github.com/googleinterns/guide-doge/actions?query=workflow%3A%22Build+and+Lint%22)
[![GitHub Actions Badge for 'deploy'](https://github.com/googleinterns/guide-doge/workflows/Deploy/badge.svg)](https://github.com/googleinterns/guide-doge/actions?query=workflow%3A%22Deploy%22)
[![GitHub Actions Badge for 'test'](https://github.com/googleinterns/guide-doge/workflows/Test/badge.svg)](https://github.com/googleinterns/guide-doge/actions?query=workflow%3A%22Test%22)

> #### Table of Contents
> - [Overview](#overview)
> - [Experiments](#experiments)
> - [References](#references)
> - [Contributing](#contributing)

## Overview
WHO (World Health Organization) estimates that at least 2.2 billion people have a visual impairment or blindness. While HTML5 comes with various features to improve screen-reader accessibility, most of the data visualization still doesn't provide much insight into data to visually impaired or blind users.

In an attempt to improve accessibility to data visualization, a number of experiments will be done in this project to explore improvements to data consumption for visually impaired or blind users.

## Experiments
- [Audification](http://go/guide-doge-planning-doc#heading=h.o15ayh3e9n26)
- [Data Table](http://go/guide-doge-planning-doc#heading=h.bf3mxk2orms0)
- [Text Summary](http://go/guide-doge-planning-doc#heading=h.7pel9lpwn6gb)
- [WebVR](http://go/guide-doge-planning-doc#heading=h.nu130go3qpw9)

## Contributing

### Prerequisites

 - Node.js (Suggest using [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating))

```sh
$ cd guide-doge
$ npm install
```

### Running Locally

```sh
$ npm start

Server running at http://localhost:4200
```

### Testing

```sh
$ npm test
```

It will run all the tests in `*.spec.ts` files and create a test coverage report under `coverage/guide-doge`.

### Other Notes
- Check out the planning document at [go/guide-doge-planning-doc](http://go/guide-doge-planning-doc). (Currently only available to Googlers.)
- We use [GitHub Projects](https://github.com/googleinterns/guide-doge/projects/1) to manage tasks.
- We set up CI/CD using [GitHub Actions](https://github.com/googleinterns/guide-doge/actions). We currently have the following pipelines:
  - Upon a pull request:
    - Building the project.
    - Running the lint check.
    - Running tests.
    - Checking the test coverage %. (Thresholds defined in [`karma.conf.js`](https://github.com/googleinterns/guide-doge/blob/master/karma.conf.js#L22).)
  - Upon a push to the `master` branch:
    - Deploying to [GitHub Pages](https://googleinterns.github.io/guide-doge/).
- Core logics should be non-Angular dependent.
  - E.g., files under [`src/d3`](src/d3) or [`src/models`](src/models) do not import any `@angular/*`.
- Wrapper components should be lightweight.
  - E.g., [`line-chart.component.ts`](src/components/line-chart/line-chart.component.ts) is a wrapper component for [`line-chart.d3.ts`](src/d3/line-chart.d3.ts), and all it does is to call D3 instance methods along the component lifecycle and to provide simple getters/setters for its template.

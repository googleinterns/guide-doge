# Project Guide-Doge

> #### Table of Contents
> - [Problem](#problem)
> - [Experiments](#experiments)
>   - [Audification](#audification)
>   - Data Table
>   - Text Summary of Key Points
> - [References](#references)
> - [Contributing](#contributing)

## Problem
WHO (World Health Organization) estimates that at least 2.2 billion people have a visual impairment or blindness. While HTML5 comes with various features to improve screen-reader accessibility including accessible data tables, text alternatives, skip links, etc., most of the data visualization are still inaccessible by visually impaired or blind people.

## Experiments
In an attempt to improve accessibility to data visualization, a number of experiments will be done in this repo to explore improvements to data consumption for visually impaired or blind users.

### Audification
Like visualization is a way of expressing data as visual imagery for sighted user to have better understanding of the data at a glance, audification can be used to express data as auditory imagery for visually impaired or blind user.

Audification would require "dimensions" for data to be projected onto, just like visualization projects data onto 2D, 3D, or 4D (with the dimension of time) space. Some psychological properties of sound that can be used as dimensions are as follows:
- Pitch
- Loudness
- Timbre (type of instruments)
- Sound Location (left, right, or combination of those)
- Envelope (legato, pizzicato, staccato, sforzando, etc.)
- Time (speed, delay, etc.)

Pitch, loudness, and time can express numerical data; and the others can express categorical data. While it is theoretically possible to express in 6+D, this experiment will focus on the more practical dimensions of pitch, loudness, and time.

| Data Dimensions | Visualization | Audification |
| --- | --- | --- |
| 2 Numerical<br/>(e.g., Δ in population over time) | Line Chart / Bar Chart / Scatter Plot | [Time + Pitch](#) |
| | | [Time + Loudness](#) |
| 1 Categorical + 1 Numerical<br/>(e.g., # of users per browser) | Pie Chart / Radar Chart / Bar Chart / Geographic Map | [Time + Pitch](#) |
| | | [Time + Loudness](#) |
| 1 Categorical + 2 Numerical<br/>(e.g., # of users per age and gender) | Stacked Bar Chart | [Time + Pitch + Loudness](#) |

### Data Table

### Text Summary of Key Points

## References
- https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment
- http://qcpages.qc.cuny.edu/hhowe/music733.1/Properties.html

## Contributing

### Prerequisites

 - Node.js (Suggest using [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating))

```shell script
$ cd guide-doge
$ npm install
```

### Developing

```shell script
$ npm start

Server running at http://localhost:1234
```

# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Luca Joss | 217667 |
| Martin Beaussart | 292488 |
| Vincent Cabrini | 284324 |

[Milestone 1](#milestone-1-friday-3rd-april-5pm) • [Milestone 2](#milestone-2-friday-1st-may-5pm) • [Milestone 3](#milestone-3-thursday-28th-may-5pm)

## Milestone 1 (Friday 3rd April, 5pm)

### Dataset

We chose to use the data set of reported anonymized incidents of crime in the city of Chicago from 2001 to present. For this, we took the file which has been updated Feb 27 2020 from https://www.kaggle.com/vedbharti/crime-2001.  
Considering the preprocessing, the dataset is very clean and doesn’t need so much advanced preprocessing. We might aggregate some data during this step and manage the rows with NaN values, which represents 10% of the dataset.

### Problematic

Today, the average person usually gets information on crimes via news feed. The information that a crime happened comes one by one.  
To be able to have a more general view, navigating easily between different types of crime, locations or time would be very helpful. So our goal is to display geographical and temporal data of crimes in Chicago from 2001 to the present, such that the user would have a global point of view on crimes in Chicago (and could be at the same time a reflection of crime in the world). The project aims to produce a visualization that is simple, impactful and fluid.

On existing maps the problems often are one of the following:
* The visualization is not clear enough:  only one type of display, such as pins is used instead of having multiple choices.
* The parametrization and filtering is painful: in other words interaction with the maps is not easy.
* The experience is not fluid.

We want to create a visualization such that all the problems listed above are solved.

### Exploratory Data Analysis

There are 7076189 entries, which each have 22 different columns. There is a mix of columns which give different inputs on the crimes such as :
* The type of the crimes is given by the Primary Type, containing 35 different types of crimes. And the Description, containing 381 different types. Or if there was an Arrest, if it was Domestic.
* The geographical information on the crimes is given in many different forms. This allows a variety of ways to display the data in a geographical fashion. A few examples are :
** The Location Description containing 181 types.
** The District, the Ward and Community Area.
** X Coordinate and Y Coordinate
** Latitude and Longitude.
* The date gives the possibility to have a temporal input for the crime.

### Related Work

What others have done :
* Some work has already been done for this data on https://data.cityofchicago.org/Public-Safety/Gun-Crimes-Heat-Map/iinq-m3rg.
* And https://www.crimemapping.com/map/agency/79$.

What is our general approach :
* Better the display and filtering.
* Make it easier to use, more interactive, overall prettier.
* Adding new features or ways to display data.

There are over 7 000 000 entries, which could slow down the navigation on the map if we display the data naively. An additional goal is to render the displaying of the data more fluid and responsive without altering the quality of the data.

The Global Cases of COVID-19 here https://coronavirus.jhu.edu/map.html is a nice example of what can be done. Having additional plots of information around the main data. With this in mind, an idea would be to be able to personalize what is being displayed.

**10% of the final grade**


## Milestone 2 (Friday 1st May, 5pm)

**10% of the final grade**




## Milestone 3 (Thursday 28th May, 5pm)

**80% of the final grade**




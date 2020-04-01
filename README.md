# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Luca Joss | 217667 |
| Martin Beaussart | 292488 |
| Vincent Cabrini | 284324 |

[Milestone 1](#milestone-1-friday-3rd-april-5pm) • [Milestone 2](#milestone-2-friday-1st-may-5pm) • [Milestone 3](#milestone-3-thursday-28th-may-5pm)

## Milestone 1 (Friday 3rd April, 5pm)

### Dataset

We chose to use the data set of reported incidents of crime in the city of Chicago from 2001 to present. For this, we took the file which has been updated Feb 27 2020 from https://www.kaggle.com/vedbharti/crime-2001.  
Considering the preprocessing, the dataset is very clean and doesn’t need so much advanced preprocessing. We might aggregate some data during this step and manage the rows with NaN values, which represents 10% of the dataset.

### Problematic

The average person usually gets information on crimes via news feed, so almost never multiple crime reports at once.  
By displaying in a geographical and/or temporal way the status of crimes in Chicago from 2001 to the present, this project would give a global point of view on crimes in Chicago and could be at the same time a reflection of crime in the world.

### Exploratory Data Analysis

There are 7076189 entries, which each have 22 different columns. Some columns such as Latitude and Longitude are not filled for every report.
Some examples of statistics of the data set are :  
For the Primary Type there are 35 different types of crimes, which can be taken as such.  
For the Description there are 381 different types, which might need some aggregation to group similar cases together.  
For the Location Description there are 181 types, which might need some aggregation to group similar cases together.  
By having the District, the Ward, Community Area, X Coordinate, Y Coordinate, Latitude and Longitude, it is possible to display crimes on the map of Chicago separated in different ways.  
The date gives a temporal input for the crime.

### Related Work

Some work has already been done for this data on https://data.cityofchicago.org/Public-Safety/Gun-Crimes-Heat-Map/iinq-m3rg.  
So our aim is to better the display and filtering. Make it easier to use, more interactive and prettier. Adding new features or ways to display data as well.

There are over 7 000 000 entries, which could slow down the navigation on the map if we display the data naively. Our goal is to render the displaying of the data more fluid without altering the quality of the data.


**10% of the final grade**


## Milestone 2 (Friday 1st May, 5pm)

**10% of the final grade**




## Milestone 3 (Thursday 28th May, 5pm)

**80% of the final grade**




import pandas as pd
import json

crimes_no_na_df = pd.read_csv("datasets/big_datasets/crimes.csv").dropna()

# Create data for police stations heatmaps
# .to_csv('datasets/test_hestmap.csv')
heatmap_csv = crimes_no_na_df[['Date', 'Latitude', 'Longitude']]
heatmap_csv['Date'] = pd.to_datetime(crimes_no_na_df['Date'].apply(lambda x: x.split()[0]))
heatmap_csv['Month'] = heatmap_csv['Date'].dt.month
heatmap_csv['Year'] = heatmap_csv['Date'].dt.year
heatmap_csv.drop(columns=['Date'])
heatmap_csv['h_val'] = 4

heatmap_csv[['Month', 'Year', 'Latitude', 'Longitude']].to_csv(
    "docs/data/heatmap_test.csv", index=False)

# 2001 2006
json_crimes = {}
for y in range(2001, 2006):
    json_crimes[y] = {}
    for m in range(1, 13):
        json_crimes[y][m] = []
for k, g in heatmap_csv[heatmap_csv['Year'] <= 2005].groupby(['Year', 'Month']):
    #print(g[['Latitude', 'Longitude', 'h_val']].values.tolist())
    json_crimes[k[0]][k[1]] = g[['Latitude', 'Longitude', 'h_val']].values.tolist()

with open('docs/data/heatmap_2001_2005.json', 'w') as outfile:
    json.dump(json_crimes, outfile)

# 2007 2012
json_crimes = {}
for y in range(2006, 2011):
    json_crimes[y] = {}
    for m in range(1, 13):
        json_crimes[y][m] = []
for k, g in heatmap_csv[(heatmap_csv['Year'] <= 2010) & (heatmap_csv['Year'] > 2005)].groupby(['Year', 'Month']):
    #print(g[['Latitude', 'Longitude', 'h_val']].values.tolist())
    json_crimes[k[0]][k[1]] = g[['Latitude', 'Longitude', 'h_val']].values.tolist()

with open('docs/data/heatmap_2006_2010.json', 'w') as outfile:
    json.dump(json_crimes, outfile)

json_crimes = {}
for y in range(2011, 2016):
    json_crimes[y] = {}
    for m in range(1, 13):
        json_crimes[y][m] = []
for k, g in heatmap_csv[(heatmap_csv['Year'] <= 2015) & (heatmap_csv['Year'] > 2010)].groupby(['Year', 'Month']):
    #print(g[['Latitude', 'Longitude', 'h_val']].values.tolist())
    json_crimes[k[0]][k[1]] = g[['Latitude', 'Longitude', 'h_val']].values.tolist()

with open('docs/data/heatmap_2011_2015.json', 'w') as outfile:
    json.dump(json_crimes, outfile)

json_crimes = {}
for y in range(2016, 2021):
    json_crimes[y] = {}
    for m in range(1, 13):
        json_crimes[y][m] = []
for k, g in heatmap_csv[(heatmap_csv['Year'] <= 2020) & (heatmap_csv['Year'] > 2015)].groupby(['Year', 'Month']):
    #print(g[['Latitude', 'Longitude', 'h_val']].values.tolist())
    json_crimes[k[0]][k[1]] = g[['Latitude', 'Longitude', 'h_val']].values.tolist()

with open('docs/data/heatmap_2016_2020.json', 'w') as outfile:
    json.dump(json_crimes, outfile)

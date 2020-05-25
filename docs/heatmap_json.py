# Create data for police stations heatmaps
# .to_csv('datasets/test_hestmap.csv')
heatmap_csv = crimes_no_na_df[['Date', 'Latitude', 'Longitude']]
heatmap_csv['Date'] = pd.to_datetime(crimes_no_na_df['Date'].apply(lambda x: x.split()[0]))
heatmap_csv['Month'] = heatmap_csv['Date'].dt.month
heatmap_csv['Year'] = heatmap_csv['Date'].dt.year
heatmap_csv.drop(columns=['Date'])
heatmap_csv['h_val'] = 0.1

json_crimes = {}
for y in range(2001, 2020):
    json_crimes[y] = {}
    for m in range(1, 13):
        json_crimes[y][m] = []
for k, g in heatmap_csv.groupby(['Year', 'Month']):
    #print(g[['Latitude', 'Longitude', 'h_val']].values.tolist())
    json_crimes[k[0]][k[1]] = g[['Latitude', 'Longitude', 'h_val']].values.tolist()

with open('docs/data/heatmap_json.json', 'w') as outfile:
    json.dump(json_crimes, outfile)

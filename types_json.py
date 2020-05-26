import json
import pandas as pd
from tqdm import tqdm
import datetime as dt

crimes_df = pd.read_csv('docs/data/Crimes_by_day_by_type.csv')

json_types = {}
json_types["types"] = crimes_df.keys().tolist()[1:]
#for k in crimes_df.keys():
#    if k != "date":
#        print(k)
#for y in tqdm(range(2001, 2021)):
#    json_sdates[y] = {}
    
#    for k, g in sdates_csv.groupby(['Date']):
#            json_sdates[y]["New Year Eve"] = g[['Latitude', 'Longitude', 'h_val']].values.tolist()

with open('docs/data/types_json.json', 'w') as outfile:
    json.dump(json_types, outfile)

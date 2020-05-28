import json
import pandas as pd

crimes_df = pd.read_csv('docs/data/Crimes_by_day_by_type.csv')
crimes_df = crimes_df.drop(columns=['NON - CRIMINAL'])
crimes_df = crimes_df.drop(columns=['NON-CRIMINAL (SUBJECT SPECIFIED)'])

json_types = {}
json_types["types"] = crimes_df.keys().tolist()[1:]

with open('docs/data/types_json.json', 'w') as outfile:
    json.dump(json_types, outfile)

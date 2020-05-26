import json
import pandas as pd
from tqdm import tqdm
import datetime as dt

crimes_df = pd.read_csv('docs/data/Crimes_by_day_by_type.csv')

json_types = {}
json_types["types"] = crimes_df.keys().tolist()[1:]

with open('docs/data/types_json.json', 'w') as outfile:
    json.dump(json_types, outfile)

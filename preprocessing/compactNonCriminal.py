import pandas as pd
from tqdm import tqdm

def replace(v):
    if ((v == 'NON - CRIMINAL') or (v == 'NON-CRIMINAL (SUBJECT SPECIFIED)')):
        return 'NON-CRIMINAL'
    else:
        return v

for y in tqdm(range(2001, 2020)):
    file_path = 'docs/data/crimes_by_type_year'+str(y)+'.csv'
    tmp_df = pd.read_csv(file_path)
    tmp_df['Primary Type'] = tmp_df['Primary Type'].map(replace)
    csv_name = 'docs/data/crimes_by_type_year'+str(y)+'_v2.csv'
    del tmp_df['Unnamed: 0']
    tmp_df.to_csv(csv_name)

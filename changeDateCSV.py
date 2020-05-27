import pandas as pd
from tqdm import tqdm

def replace(v):
    d = v.split('/')
    return d[1]+'/'+d[0]+'/'+d[2]

for y in tqdm(range(2010, 2020)):
    file_path = 'docs/data/crimes_by_type_year'+str(y)+'.csv'
    tmp_df = pd.read_csv(file_path)
    tmp_df['Date'] = tmp_df['Date'].map(replace)
    csv_name = 'docs/data/crimes_by_type_year'+str(y)+'.csv'
    del tmp_df['Unnamed: 0']
    tmp_df.to_csv(csv_name)

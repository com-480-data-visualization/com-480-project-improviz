import json
import pandas as pd
from tqdm import tqdm
import datetime as dt

crimes_df = pd.read_csv('datasets/big_datasets/crimes.csv')
crimes_no_na_df = crimes_df.dropna()
sdates_csv = crimes_no_na_df[['Date', 'Latitude', 'Longitude']]
sdates_csv['Date'] = crimes_no_na_df['Date'].apply(lambda x: x.split()[0])
sdates_csv['h_val'] = 90

new_year = '31/12/'
new_year_eve = '01/01/'
easter = ['15/04/2001', '31/03/2002', '20/04/2003', '11/04/2004', '27/03/2005', '15/04/2006', '08/04/2007', '23/03/2008', '12/04/2009', '04/04/2010', '24/04/2011', '08/04/2012', '31/03/2013', '20/04/2014', '05/04/2015', '27/03/2016', '16/04/2017', '01/04/2018', '21/04/2019', '12/04/2020']
christmas_eve = '24/12/'
christmas_day = '25/12/'
mem_day = ['28/05/2001', '27/05/2002', '26/05/2003', '31/05/2004', '30/05/2005', '29/05/2006', '28/05/2007', '26/05/2008', '25/05/2009', '31/05/2010', '30/05/2011', '28/05/2012', '27/05/2013', '26/05/2014', '25/05/2015', '30/05/2016', '29/05/2017', '28/05/2018', '27/05/2019', '25/05/2020']
ind_day = '04/07/'
# Thanksgiving date in Chicago
tgiv_day = ['22/11/2001', '28/11/2002', '27/11/2003', '25/11/2004', '24/11/2005', '23/11/2006', '22/11/2007', '27/11/2008', '27/11/2009', '25/11/2010', '24/11/2011', '22/11/2012', '28/11/2013', '27/11/2014', '26/11/2015', '24/11/2016', '23/11/2017', '22/11/2018', '28/11/2019', '26/11/2020']
events = ["New Year", "Easter", "Christmas Eve", "Christmas Day", "New Year Eve", "Memorial Day", "Thanksgiving"]

json_sdates = {}
for y in tqdm(range(2001, 2020)):
    ny_d = new_year+str(y)
    e_d = easter[y-2001]
    ind_d = ind_day+str(y)
    mem_d = mem_day[y-2001]
    tgiv_d = tgiv_day[y-2001]
    ce_d = christmas_eve+str(y)
    cd_d = christmas_day+str(y)
    nye_d = new_year_eve+str(y)
    json_sdates[y] = {}
    
    for k, g in sdates_csv.groupby(['Date']):
        k_tmp = k.split('/')
        date_v = k_tmp[1]+'/'+k_tmp[0]+'/'+k_tmp[2]
        if date_v == ny_d:
            json_sdates[y]["New Year"] = g[['Latitude', 'Longitude', 'h_val']].values.tolist()
        if date_v == e_d:
            json_sdates[y]["Easter"] = g[['Latitude', 'Longitude', 'h_val']].values.tolist()
        if date_v == ind_d:
            json_sdates[y]["Independence Day"] = g[['Latitude', 'Longitude', 'h_val']].values.tolist()
        if date_v == mem_d:
            json_sdates[y]["Memorial Day"] = g[['Latitude', 'Longitude', 'h_val']].values.tolist()
        if date_v == tgiv_d:
            json_sdates[y]["Thanksgiving"] = g[['Latitude', 'Longitude', 'h_val']].values.tolist()
        if date_v == ce_d:
            json_sdates[y]["Christmas Eve"] = g[['Latitude', 'Longitude', 'h_val']].values.tolist()
        if date_v == cd_d:
            json_sdates[y]["Christmas Day"] = g[['Latitude', 'Longitude', 'h_val']].values.tolist()
        if date_v == nye_d:
            json_sdates[y]["New Year Eve"] = g[['Latitude', 'Longitude', 'h_val']].values.tolist()

with open('docs/data/sdates_json.json', 'w') as outfile:
    json.dump(json_sdates, outfile)

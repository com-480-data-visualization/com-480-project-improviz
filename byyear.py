from datetime import datetime
from tqdm import tqdm
import numpy as np
import pandas as pd
import os

def generateByYearCSV(dataset, dates, year):

    df_date = np.empty(0, dtype=np.dtype('U100'))
    df_carea = np.empty(0, dtype=np.dtype('i4'))
    df_type = np.empty(0, dtype=np.dtype('U100'))
    df_num = np.empty(0, dtype=np.dtype('i4'))
    for d in tqdm(sorted(dates, key=lambda date: datetime.strptime(date, "%m/%d/%Y"))):
        # Isolate year
        date = d.split('/', -1)
        y = date[2]
        # If the year chages, create .csv and start new csv dataset
        if y == year:
            d_arr = np.empty((dataset[d].keys()).size, dtype=np.dtype('U100'))
            c_arr = np.empty(0, dtype=np.dtype('i4'))
            t_arr = np.empty(0, dtype=np.dtype('U100'))
            n_arr = np.empty(0, dtype=np.dtype('i4'))
            d_arr = np.full_like(d_arr, d)
            tmp_keys = pd.unique(dataset[d].keys().values.ravel('K'))
            for tk in tmp_keys:
                c_id = tk[0]
                k = tk[1]
                c_arr = np.insert(c_arr, c_arr.size, c_id)
                t_arr = np.insert(t_arr, t_arr.size, k)
                n_arr = np.insert(n_arr, n_arr.size, dataset[d][c_id][k])
            df_date = np.concatenate((df_date, d_arr), axis=None)
            df_carea = np.concatenate((df_carea, c_arr), axis=None)
            df_type = np.concatenate((df_type, t_arr), axis=None)
            df_num = np.concatenate((df_num, n_arr), axis=None)
    csv_name = 'crimes_by_type_year'+year+".csv"
    final_df = pd.DataFrame({'Date': df_date, 'Community Area': df_carea, 'Primary Type': df_type, 'Number': df_num})
    final_df.to_csv(os.path.join('datasets/', csv_name))

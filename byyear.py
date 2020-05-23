from datetime import datetime

def generateByYearCSV(dataset, dates, year):

    for d in tqdm(sorted(dates, key=lambda date: datetime.strptime(date, "%m/%d/%Y"))):
        # Isolate year
        date = d.split('/', -1)
        y = date[2]
        # If the year chages, create .csv and start new csv dataset
        if y == year:
            for c in dataset[d].keys():
                c_id = c[0]
                if (isinstance(dataset[d][c_id], np.int64)):
                    continue
                for k in dataset[d][c_id].keys():
                    df_date.append(d)
                    df_carea.append(c_id)
                    df_type.append(k)
                    df_num.append(dataset[d][c_id][k])    
csv_name = 'crimes_by_type_year_'+year+".csv"
final_df = pd.DataFrame({'Date': df_date, 'Community Area': df_carea, 'Primary Type': df_type, 'Number': df_num})
final_df.to_csv(os.path.join(dataset_path, csv_name))

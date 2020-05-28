crimes_df['Date_alt'] = crimes_df['Date'].apply(lambda d: '/'.join(d.split()[0].split('/')[1::-1]))
crimes_df['Date_day'] = crimes_df['Date'].apply(lambda d: int(d.split()[0].split('/')[1]))
crimes_df['Date_month'] = crimes_df['Date'].apply(lambda d: int(d.split()[0].split('/')[0]))
crimes_df['Year'] = crimes_df['Date'].apply(lambda d: int(d.split()[0].split('/')[2]))

agg = crimes_df_sorted[['Date_alt', 'Date_day', 'Date_month']
                       ].groupby(['Date_month', 'Date_day'], sort=True).size()

(agg/19).to_frame().to_csv('datasets/mean_crimes.csv')

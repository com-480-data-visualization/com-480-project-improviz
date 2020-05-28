import pandas as pd
import json

data_df = pd.read_csv('datasets/Affordable_Rental_Housing_Developments.csv')

careas_df = data_df[['Community Area Name', 'Community Area Number']]

careas = {}

for i, row in careas_df.iterrows():
    careas[row['Community Area Name'].upper()] = row['Community Area Number']


#for i in range(77):
#    if not((i+1) in careas.values()):
#        print(str(i+1))

careas['LINCOLN PARK'] = 7
careas['EDISON PARK'] = 9
careas['FOREST GLEN'] = 12
careas['HERMOSA'] = 20
careas['ARMOUR SQUARE'] = 34
careas['BURNSIDE'] = 47
careas['CALUMET HEIGHTS'] = 48
careas['EAST SIDE'] = 52
careas['ARCHER HEIGHTS'] = 57
careas['MCKINLEY PARK'] = 59
careas['CLEARING'] = 64
careas['BEVERLY'] = 72
careas['MOUNT GREENWOOD'] = 74
careas['MORGAN PARK'] = 75
careas['OHARE'] = 76

del careas['EAST GARFILED PARK']

careas_json = json.dumps(careas)
print(careas_json)

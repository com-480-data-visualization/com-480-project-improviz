var myParent = document.body;
var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var monthDaysBis = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var selectDate = document.createElement("select")
selectDate.id = "dateSelect";
myParent.appendChild(selectDate);

for (var y = 2001; y <= 2019; y++) {
	for (var m = 1; m <= 12; m++) {
		if (y%4 == 0) {
			for (d = 1; d <=monthDaysBis[m-1]; d++) {
				if (d < 10) {
					var day = "0"+d.toString(10);
				} else {
					var day = d.toString(10);
				}
				if (m < 10) {
					var month = "0"+m.toString(10);
				} else {
					var month = m.toString(10);
				}
				var val = day+"/"+month+"/"+y.toString(10);
				var option = document.createElement("option");
				option.value = val;
				option.text = val;
				selectDate.appendChild(option);
			}
		} else {
			for (d = 1; d <=monthDays[m-1]; d++) {
				if (d < 10) {
					var day = "0"+d.toString(10);
				} else {
					var day = d.toString(10);
				}
				if (m < 10) {
					var month = "0"+m.toString(10);
				} else {
					var month = m.toString(10);
				}
				var val = day+"/"+month+"/"+y.toString(10);
				var option = document.createElement("option");
				option.value = val;
				option.text = val;
				selectDate.appendChild(option);
			}
		}
	}
}

//we execute when the csv is open
d3.csv('data/Crimes_by_day_by_type.csv')
      .on('load', function (data) {
	      var myParent = document.body;
	      var selectType = document.createElement("select")
	      selectType.id = "typeSelect";
	      myParent.appendChild(selectType);
	      var types = Object.keys(data[0]);
	      for (i = 1; i < types.length; i++) {
		      var option = document.createElement("option");
		      option.value = types[i];
		      option.text = types[i];
		      selectType.appendChild(option);
	      }
      }).get();

var filterButton = document.createElement("button");
filterButton.innerHTML = "Filter !";
myParent.appendChild(filterButton);
filterButton.addEventListener("click", function() {
	var d = document.getElementById("dateSelect");
	var date = d.options[d.selectedIndex].value;
	var t = document.getElementById("typeSelect");
	var type = t.options[t.selectedIndex].value;
	var year = date.split("/");
	var filename = "crimes_by_type_year_"+year[2]+".csv";
	console.log(date);
	console.log(filename);
	console.log(type);
});

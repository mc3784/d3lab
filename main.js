var scatter_plot = function(x_coord, y_coord, x_label, y_label) {

	var pad = 20;
	var left_pad = 100;
	var w = 500;
	var h = 300;
	var svg = d3.select('svg')
	  .attr('width', w)
	  .attr('height', h);
	var x_max = Math.max.apply(Math, x_coord);
	var x_min = Math.min.apply(Math, x_coord);
	var y_max = Math.max.apply(Math, y_coord);
	var y_min = Math.min.apply(Math, y_coord);

	var xScale = d3.scale.linear().domain([0, y_max+10]).range([pad, w-pad]);
	var yScale = d3.scale.linear().domain([x_max+10, 0]).range([0, h - pad*2]);

	console.log(y_max);
	var xAxis = d3.svg.axis().scale(xScale).orient('bottom');
	var yAxis = d3.svg.axis().scale(yScale).orient('left');

	svg.append('g')
		.attr("class", "axis")
		.attr("transform", "translate(0, "+ (h-2*pad) +")")
		.call(xAxis)
	svg.append('g')
		.attr("class", "axis")
		.attr("transform", "translate("+(left_pad-3*pad)+", 0)")
		.call(yAxis)

	var xMap = function(d) { 
		return xScale(d);
	}

	var yMap = function(d) { 
		return yScale(d);
	}

	var data = [];
	for (var i = 0; i < x_coord.length; i++) {
		data.push({'x': y_coord[i], 'y': x_coord[i]})
	}

	var circle = svg.selectAll("circle")
	    .data(data);

	circle.exit().remove();

	circle.enter().append("circle")
	    .attr("r", 3.5);

	circle
	    .attr("cx", function(d) { return xMap(d.x); })
	    .attr("cy", function(d) { return yMap(d.y); });

}

$(document).ready(function() {

	var curr_data = {};

	d3.csv("car.csv", function(error, data) {
		headers = d3.keys(data[0]);

		var select_x = $('#sel-x');
		var select_y = $('#sel-y');

		for (var i = 0; i < headers.length; i++) {
			var curr_name = headers[i];
			if (curr_name != 'name' && curr_name != 'origin') {
				if (curr_name != 'mpg') {
					$('<option></option>')
					  .val(curr_name)
					  .text(curr_name)
					  .appendTo(select_x);
				}
				if (curr_name != 'displacement') {
					$('<option></option>')
					  .val(curr_name)
					  .text(curr_name)
					  .appendTo(select_y);
				}
				curr_data[headers[i]] = [];
			}
		}

		curr_headers = d3.keys(curr_data);
		data.forEach(function(d) {
			for (var i = 0; i < curr_headers.length; i++) {
				var c_h = curr_headers[i];
				curr_data[c_h].push(d[c_h]);
			}
		});

		var x_label = $('#sel-x').val();
		var y_label = $('#sel-y').val();
    	var x_coord = curr_data[x_label];
    	var y_coord = curr_data[y_label];
    	scatter_plot(x_coord, y_coord, x_label, y_label);

        $('#sel-x').click(function() {
			var x_label = $('#sel-x').val();
			var y_label = $('#sel-y').val();
	    	var x_coord = curr_data[x_label];
	    	var y_coord = curr_data[y_label];
	    	scatter_plot(x_coord, y_coord, x_label, y_label);
        });

        $('#sel-y').click(function() {
			var x_label = $('#sel-x').val();
			var y_label = $('#sel-y').val();
	    	var x_coord = curr_data[x_label];
	    	var y_coord = curr_data[y_label];
	    	scatter_plot(x_coord, y_coord, x_label, y_label);
        });

	})

});

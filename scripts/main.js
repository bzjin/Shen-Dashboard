d3.queue(1)
    .defer(d3.csv, "data/numberclasses.csv")
    .awaitAll(ready);

function ready(error, results) {
  if (error) throw error;
  visual(results[0], "intro1")
  visual(results[0], "intro2")
  visual(results[0], "intro3")
  visual(results[0], "quantum")
  visual(results[0], "mech2")
  visual(results[0], "em2")
  visual(results[0], "lab")
  visual(results[0], "math")
  visual(results[0], "other_phys")
  visual(results[0], "aep")
  visual(results[0], "other_math")

}

var inside = "#DC4D54", outside = "#057AC1";
function visual (data, divName){
	var thisData = [];
	data.forEach(function(d){
		if (d.group == divName) {
			thisData.push(d);
		}
	});

	var w = 400, h = thisData.length * 30,
	p = {"top": 20, "left": 10, "right": 10, "bot": 10}; 

	var thisViz = d3.select("#" + divName).append("svg")
		.attr("width", w)
		.attr("height", h)
		.style("overflow", "visible")
		.style("margin-top", 20)

	//key
	thisViz.append("text")
		.attr("x", 10)
		.attr("y", -5)
		.style("font-size", 8)
		.style("fill", "#C0C0C0")
		.text("COURSE")

	//key
	thisViz.append("text")
		.attr("x", 195)
		.attr("y", -5)
		.style("font-size", 8)
		.style("text-anchor", "end")
		.style("fill", "#C0C0C0")
		.text("INSIDE CONC.")

	//key
	thisViz.append("text")
		.attr("x", 205)
		.attr("y", -5)
		.style("font-size", 8)
		.style("fill", "#C0C0C0")
		.text("OUTSIDE CONC. ")

	//key
	thisViz.append("text")
		.attr("x", 340)
		.attr("y", -5)
		.style("font-size", 8)
		.style("fill", "#C0C0C0")
		.text("TOTAL")

	//separating line
	thisViz.append("line")
		.attr("x1", p.left)
		.attr("x2", w - p.right)
		.attr("y1", 0)
		.attr("y2", 0)
		.style("stroke", "lightgrey")

	for (i = 0; i < thisData.length; i++){

		thisViz.append("text")
			.attr("x", 10)
			.attr("y", i * 25 + p.top - 3)
			.style("text-transform", "uppercase")
			.text(thisData[i].name)

		//inside concentrator
		thisViz.append("rect")
			.attr("width", thisData[i].inside * 100)
			.attr("height", 20)
			.attr("x", 200 - thisData[i].inside * 100)
			.attr("y", i * 25 + 2.5)
			.style("fill", inside)

		thisViz.append("text")
			.attr("x", 200 - thisData[i].inside * 100 - 2)
			.attr("y", i * 25 + 15.5)
			.style("text-anchor", "end")
			.style("font-size", 9)
			.text(parseInt(thisData[i].inside * 100))

		//outside concentrator
		thisViz.append("rect")
			.attr("width", thisData[i].outside * 100)
			.attr("height", 20)
			.attr("x", 200)
			.attr("y", i * 25 + 2.5 )
			.style("fill", outside)

		thisViz.append("text")
			.attr("x", 200 + thisData[i].outside * 100 + 2)
			.attr("y", i * 25 + 15.5)
			.style("text-anchor", "start")
			.style("font-size", 9)
			.text(parseInt(thisData[i].outside * 100))

		//outside concentrator
		thisViz.append("text")
			.attr("x", 340)
			.attr("y", i * 25 + 17)
			.style("fill", "#C0C0C0")
			.style("font-style", "italic")
			.text(parseInt(thisData[i].total * 100) + "%")

		//separating line
		thisViz.append("line")
			.attr("x1", p.left)
			.attr("x2", w - p.right)
			.attr("y1", i * 25 + 25)
			.attr("y2", i * 25 + 25)
			.style("stroke", "lightgrey")
	}

}

d3.json('bookdata.json').then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
})
console.log('hoi');


const visual = d3.select("#visual")
.append("svg")
.attr("width", 500)
.attr("height", 100)

const circle = visual.append("circle")
.attr("cx", 250)
.attr("cy", 50)
.attr("r", 20)
.attr("fill", "tomato")

const rect = visual.append("rect")
.attr("y", 25)
.attr("x", 150)
.attr("width", 50)
.attr("height", 50)
.attr("fill", "blue")

const ellipse = visual.append("ellipse")
.attr("cx", 100)
.attr("cy", 50)
.attr("rx", 20)
.attr("ry", 10)
.attr("fill", "blue")

const line = visual.append("path")
.attr("x1", 5)
.attr("y1", 5)
.attr("x2", 30)
.attr("y2", 40)
.attr("x3", 20)
.attr("y3", 80)
.attr("stroke", "blue")

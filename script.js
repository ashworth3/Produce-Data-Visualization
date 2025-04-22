// TODO: Load CSV file using d3.csv
d3.csv("data.csv").then(data => {
    data.forEach(d => {
        d.value = +d.value;
    });

    // TODO: Create SVG group and define margin convention
    const svg = d3.select("#chart");
    const margin = { top: 50, right: 150, bottom: 150, left: 50 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const chart = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // TODO: Set up x and y scales
    const x = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, width])
        .padding(0.2);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .nice()
        .range([height, 0]);

    // TODO: Add axes using d3.axisBottom and d3.axisLeft
    const colorScale = d3.scaleOrdinal()
        .domain(["Fruit", "Vegetable"])
        .range(["#0077b6", "#2a9d8f"]); // Blue for Fruit, Green for Vegetable

    // Add the axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    chart.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-40)")
        .style("text-anchor", "end");

    chart.append("g")
        .attr("class", "axis")
        .call(yAxis);

    // TODO: Use enter-update pattern to draw bars
    chart.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", d => colorScale(d.category))
        .on("mouseover", (event, d) => {
            tooltip.transition().duration(150).style("opacity", 1);
            tooltip.html(`<strong>${d.name}</strong><br>${d.category}<br>Value: ${d.value}`)
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 28 + "px");
        })
        .on("mouseout", () => {
            tooltip.transition().duration(300).style("opacity", 0);
        });

    // TODO: Add value labels above bars
    chart.selectAll(".label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", d => x(d.name) + x.bandwidth() / 2)
        .attr("y", d => y(d.value) - 5)
        .attr("text-anchor", "middle")
        .text(d => d.value);

    // TODO: Color bars by category using a color scale
    const barColor = d => colorScale(d.category);

    // TODO: Add a legend showing color-category mapping
    const legend = svg.append("g")
        .attr("transform", `translate(${width + margin.left + 10}, ${margin.top})`);

    colorScale.domain().forEach((category, i) => {
        const row = legend.append("g")
            .attr("transform", `translate(0, ${i * 20})`);

        row.append("rect")
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", colorScale(category));

        row.append("text")
            .attr("x", 20)
            .attr("y", 12)
            .text(category)
            .attr("font-size", "12px");
    });

    // TODO: Add tooltips (optional or extra credit)
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip");
});
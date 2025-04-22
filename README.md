# Produce Bar Chart Visualization with [D3.js](https://d3js.org/)

A simple and interactive data visualization project built with **D3.js**. This bar chart displays fruit and vegetable data from a CSV file, grouped by category and color-coded for clarity.

---

## Overview

This project visualizes produce items (fruits and vegetables) using a vertical bar chart. It demonstrates foundational D3.js techniques including:

- Data binding with `d3.csv()`
- SVG-based chart rendering
- Category-based color encoding (blue for Fruit, green for Vegetable)
- Interactive tooltips on hover
- Value labels above each bar
- Rotated x-axis labels for better readability
- Custom legend to show category-color mapping

---

## Dataset

The chart uses `data.csv`, which contains three different fields:

```csv
name,value,category
Apples,10,Fruit
Carrots,12,Vegetable
Bananas,20,Fruit
Leeks,13,Vegetable
...

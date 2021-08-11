import { formatCurrency, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';
import { format } from 'd3';

@Component({
  selector: 'app-lc',
  templateUrl: './lc.component.html',
  styleUrls: ['./lc.component.css']
})
export class LcComponent implements OnInit {

  public data: any[] = [
    {id:1, Dt:'2011-01-01', price:201}, //'%Y-%m-%d'
    {id:2, Dt:'2011-01-04', price:306},
    {id:3, Dt:'2011-01-09', price:254},
    {id:4, Dt:'2011-01-13', price:272},
    {id:5, Dt:'2011-01-15', price:290},
    {id:6, Dt:'2011-01-19', price:380},
    {id:7, Dt:'2011-01-21', price:105},
    {id:8, Dt:'2011-01-23', price:406},
    {id:2, Dt:'2011-01-25', price:306},
    {id:3, Dt:'2011-01-29', price:254},
    // {id:4, Dt:'2011-02-01', price:272},
    // {id:5, Dt:'2011-02-18', price:290},
    // {id:6, Dt:'2011-02-22', price:380},
    // {id:7, Dt:'2012-01-26', price:105},
    // {id:8, Dt:'2012-01-28', price:406},
    // {id:6, Dt:'2012-01-19', price:380},
    // {id:7, Dt:'2012-02-21', price:105},
    // {id:8, Dt:'2012-02-23', price:406},
    // {id:2, Dt:'2012-02-25', price:306},
    // {id:3, Dt:'2012-02-29', price:254},
  ];
  private margin = {top: 30, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line!: d3Shape.Line<[number, number]>; // this is line defination

  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 600 - this.margin.top - this.margin.bottom;

    
   }

  ngOnInit(): void {
    this.buildChart();
    this.mouseover();
  }
  public mouseover(){
    d3.select("#tooltip")
      .attr("d")

  }
  public buildChart() {

    this.data = this.data.map((d: { Dt: string | number | Date; price: string | number; }) => ({Dt: new Date(d.Dt),
      price: +d.price
      }))
    // Define Scales
  this.x = d3Scale.scaleTime().rangeRound([0, this.width]);
  this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
  this.x.domain(d3Array.extent(this.data, (d) => d.Dt ));
  this.y.domain(d3Array.extent(this.data, (d) => d.price ))

  

  this.svg = d3.select('svg#brNavChrt') // svg element from html
               .attr("width",900)
               .attr("height", 700)
               .append('g')   // appends 'g' element for graph design
               .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
               
  const xAxis = d3Axis.axisBottom(this.x)
  const yAxis = (d3Axis.axisLeft(this.y).ticks(20,"$"))
  // Configure the X Axis
  this.svg.append('g')
          .attr('transform', 'translate(0,' + this.height + ')')
          // .call(d3Axis.axisBottom(this.x))
          .call(xAxis)
  
  this.svg.append("text")
          .attr("x", this.width/2)
          .attr("y", this.height + this.margin.bottom)
          .style("text-anchor","middle")
          .text("Date");
  // confifure the Y-Axis
  this.svg.append('g')
          .attr('class', 'axis--y')
          // .call((d3Axis.axisLeft(this.y)).ticks(50,"$"))
          .call(yAxis)
  // adding label to y axis
  this.svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0-this.margin.left)
          .attr("x", 0-(this.height/2))
          .attr("dy","1em")
          // .tickSize(15)
          .style("text-anchor", "middle")
          .text("brNAV ($)");

// text label for title
  this.svg.append("text")
          .attr("class", "title")
          .attr("y", 0-(this.margin.top/2))
          .attr("x", this.width/2)
          .attr("text-anchor", "middle")
          .style("font-size","12px")
          .style("font-weight","bold")
          .style("text-decoration","underline")
          .text("Brocker Account Chart");
  // Chart
  this.line = d3Shape.line()
  .x( (d: any) => this.x(d.Dt) )
  .y( (d: any) => this.y(d.price) )
  // Configuring line path
  this.svg.append('path')
      .datum(this.data)
      .attr('class', 'line')
      .attr('d', this.line)
      .on("mouseleave", (d: any) => { 
        d3.select('#tooltip')
        .style("display", "none")
      })
      .on("mouseenter", (d: any) => { 
        d3.select('#tooltip')
        // .append('text')
        .attr('d',this.y(d.price))
        .style("display", "block")
      })
      .on("mouseover", this.mouseover())
 

  }
}
  

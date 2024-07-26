import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as $ from "jquery";


looker.plugins.visualizations.add({
  // The create method gets called once on initial load of the visualization.
  // It's just a convenient place to do any setup that only needs to happen once.
  create: function (element, config) {},

  // The updateAsync method gets called any time the visualization rerenders due to any kind of change,
  // such as updated data, configuration options, etc.
  updateAsync: function (data, element, config, queryResponse, details, done) {


          const { measure_like: measureLike } = queryResponse.fields;
            const { dimension_like: dimensionLike } = queryResponse.fields;

            const dimensions1 = dimensionLike.map((dimension) => ({
              label: dimension.label_short ?? dimension.label,
              name: dimension.name

            }));


            const measures1 = measureLike.map((measure) => ({
              label: measure.label_short ?? measure.label,
              name: measure.name,
            }));


            const fieldOptions = [...dimensions1, ...measures1].map((dim) => ({
              [dim.label]: queryResponse.data.map(row => row[dim.name].value).join(",")
            }));

            const fieldOptions0 = [...dimensions1, ...measures1].map((all) => ({
              [all.label]: all.name
            }));

            const fieldOptions2 = [...dimensions1, ...measures1].map((dim) => ({
              [dim.label]: dim.label
            }));


            const lookerVis = this;

            // config
            const configOptions  = {
              weight: {
                type: "string",
                 label: "Font Weight",
                 default: "",
                 display: "text",
                 placeholder: "300",
                 section: "Style",
                 order: 1,
               },
              bodyStyle: {
                type: "string",
                label: "Choose Font",
                display: "select",
                values: [{ "Roboto": "'Roboto'" } , { "Open Sans": "'Open Sans'" }, {"Montserrat" : "'Montserrat'"}, {"IBM Plex Sans" :  "'IBM Plex Sans'"},{"DM Serif Text": "DM Serif Text"}],
                section: "Style",
                default: "'Roboto', sans-serif;",
                order: 2,
                },

                color1: {
                type: 'array',
                label: 'Gauge Color 1',
                display: 'colors',
                default: ['#CD3632', '#00363d', '#17494d', '#498283', '#bdd9d7', '#aecfc2', '#d1e8df', '#edf8f4', '#f5fcfc'],
                order: 3,
                section: "Style",
                },

                color2: {
                type: 'array',
                label: 'Gauge Color 2',
                display: 'colors',
                default: ['#b2b2b2', '#00363d', '#17494d', '#498283', '#bdd9d7', '#aecfc2', '#d1e8df', '#edf8f4', '#f5fcfc'],
                order: 4,
                section: "Style",
                },

                needle: {
                type: 'array',
                label: 'Needle Color',
                display: 'colors',
                default: ['#779D9B', '#b2b2b2', '#00363d', '#17494d', '#498283', '#bdd9d7', '#aecfc2', '#d1e8df', '#edf8f4', '#f5fcfc'],
                order: 5,
                section: "Style",
                },

                  textSize: {
                  type: "string",
                   label: "Text Size",
                   default: "50px",
                   display: "text",
                   placeholder: "50px",
                   section: "Style",
                   order: 6,
                 },


                 textSize2:{
                 type: "string",
                  label: "Text Size 2",
                  default: "30px",
                  display: "text",
                  placeholder: "30px",
                  section: "Style",
                  order: 7,
                },




                maxNumber: {
                  label: "Choose Max Target Value",
                  type: "string",
                  display: "select",
                  default: "",
                  values: fieldOptions,

                  order: 3,
                  section: "Values",
                },

                needleNumber: {
                  label: "Choose Needle Value",
                  type: "string",
                  display: "select",
                  default: "",
                  values: fieldOptions,

                  order: 4,
                  section: "Values",
                },

                centerValue: {
                  label: "Choose Center Value",
                  type: "string",
                  display: "select",
                  default: "",
                  values: fieldOptions,

                  order: 5,
                  section: "Values",
                },

                centerLabel: {
                  label: "Choose Center Label",
                  type: "string",
                  display: "select",
                  default: "",
                  values: fieldOptions2,

                  order: 6,
                  section: "Values",
                },

                side: {
                  type: "boolean",
                  label: "Show Top Text",
                  default: false,
                  order: 7,
                  section: "Values",
                },

                rightValue: {
                  label: "Choose Top Value",
                  type: "string",
                  display: "select",
                  default: "",
                  values: fieldOptions,

                  order: 8,
                  section: "Values",
                },

                rightLabel: {
                  label: "Choose Top Label",
                  type: "string",
                  display: "select",
                  default: "",
                  values: fieldOptions2,

                  order: 9,
                  section: "Values",
                },


            }


 lookerVis.trigger("registerOptions", configOptions);

console.log(queryResponse, "queryResponse")
      // dimension and measure values from data
  const dimensionName = queryResponse.fields.dimensions[0].name;
  const dimensionValues = data.map((row) => `${row[dimensionName].value}`);
  const measureName = queryResponse.fields.measures[0].name;
  const measureValues = data.map((row) => row[measureName].value);



    element.innerHTML = "";
    element.innerHTML = `
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Open+Sans:wght@100;300;400;500;700;900&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,100;1,700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital,wght@0,300;0,400;0,500;0,600;1,100;1,700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,100;1,700&display=swap');



         body{
          font-family: ${config.bodyStyle || "'Open Sans', serif"};
          font-weight:${config.weight || "300"};

         }
        #chartdiv {
          width: 490px;
         height: 500px;
         margin-top: -100px;

        overflow: visible;


          }

         #vis {
          height: 100%;
          width: 100%;
          margin-top: 0px;
          border: none;
          display: flex;
          justify-content: center;
          position:relative
         }

         .dFlex{
           display:flex;
           flex-direction:column;
           align-items:center;
           justify-content:center;
         }

         .dFlex p {
           margin:0 !important
         }

         p.textSize1{
           font-size:${config.textSize || "50px"};

           line-height:1
         }

         p.textSize2{
           font-size:${config.textSize2 || "30px"};

         }
         .abso {
            position: absolute;
            top:0;

            display:${config.side ? "block" : "none"}

        }

        foreignObject{
          overflow: visible;
        }


      </style>
    `;





var visContainer = document.createElement('div');
visContainer.setAttribute("id", "chartdiv");
element.append(visContainer)




$('#vis').append(`<div class="abso"><p>${config.rightValue} ${config.rightLabel}</p></div>`);


var thisMax =  `${config.maxNumber}`

var needle = `${config.needleNumber}`


am4core.useTheme(am4themes_animated);
am4core.addLicense("ch-custom-attribution");

  // create chart
  var chart = am4core.create("chartdiv", am4charts.GaugeChart);
  chart.innerRadius = am4core.percent(52);

  var axis = chart.xAxes.push(new am4charts.ValueAxis());

  axis.min = 0;
  axis.max = Number(thisMax);
  axis.strictMinMax = true;
  axis.renderer.radius = am4core.percent(80);
  axis.renderer.inside = true;
  axis.renderer.line.strokeOpacity = 0;
  axis.renderer.ticks.template.disabled = true
  axis.renderer.ticks.template.strokeOpacity = 1;
  axis.renderer.ticks.template.length = 0;
  axis.renderer.grid.template.disabled = true;
  axis.renderer.labels.template.radius = -60;
  axis.renderer.labels.template.adapter.add("text", function(text) {
    return text ;
  })
  axis.renderer.labels.fontWeight = 900;


  // Disable all labels by default
  axis.renderer.labels.template.disabled = true;

  // Create a custom label for the minimum value
  var minLabel = axis.renderer.gridContainer.createChild(am4core.Label);
  minLabel.text = 0;
  minLabel.fill = config.needle ? config.needle[0] :'#779D9B'
  minLabel.fontWeight = 900;
  // Position the label at the bottom left
  minLabel.x = axis.renderer.gridContainer.pixelWidth - 205; // Adjust the x position as needed
  minLabel.y = axis.renderer.gridContainer.pixelHeight + 5; // Adjust the y position as needed
  minLabel.horizontalCenter = "left";
  minLabel.verticalCenter = "bottom";


  // Create a custom label for the maximum value
  var maxLabel = axis.renderer.gridContainer.createChild(am4core.Label);
  maxLabel.text = Number(thisMax);
  maxLabel.fill = config.needle ? config.needle[0] :'#779D9B'
  maxLabel.fontWeight = 900;
  maxLabel.x = axis.renderer.gridContainer.pixelWidth + 215; // Adjust the x position as needed
  maxLabel.y = axis.renderer.gridContainer.pixelHeight + 5; // Adjust the y position as needed
  maxLabel.horizontalCenter = "right";
  maxLabel.verticalCenter = "bottom";






  var colorSet = new am4core.ColorSet();


  var axis2 = chart.xAxes.push(new am4charts.ValueAxis());
  axis2.min = 0;
  axis2.max = 100;
  axis2.strictMinMax = true;
  axis2.renderer.labels.template.disabled = true;
  axis2.renderer.ticks.template.disabled = true;
  axis2.renderer.grid.template.disabled = true;

  var range0 = axis2.axisRanges.create();
  range0.value = 0;
  range0.endValue = 100;
  range0.axisFill.fillOpacity = 1;
  range0.axisFill.fill = config.color1 ? config.color1[0] : '#CD3632';

  var range1 = axis2.axisRanges.create();
  range1.value = 50;
  range1.endValue = 100;
  range1.axisFill.fillOpacity = 1;
  range1.axisFill.fill = config.color2 ? config.color2[0] : '#b2b2b2'





  var hand = chart.hands.push(new am4charts.ClockHand());
  hand.axis = axis2;
  hand.innerRadius = 0;
  hand.startWidth = 10;
  hand.pin.disabled = false;
  hand.fill = config.needle ? config.needle[0] :'#779D9B'
  hand.stroke = config.needle ? config.needle[0] :'#779D9B'
  hand.axis.fill = config.needle ? config.needle[0] :'#779D9B'

  hand.value = Number(needle) / Number(thisMax) * 100;

//
//   var centerLabel = chart.radarContainer.createChild(am4core.Label);
//
// centerLabel.isMeasured = false;
// centerLabel.fontSize = 45;
// centerLabel.x = am4core.percent(50);
// centerLabel.y = am4core.percent(100);
// centerLabel.horizontalCenter = "middle";
// centerLabel.verticalCenter = -120;
//
//
// centerLabel.text = Number(needle);


  chart.events.on("hit", function(event, elements, chart) {

      console.log("Chart background clicked");

      console.log("event", event);
      console.log("elements", elements[0]);
      console.log("chart", chart);

        if (!elements.length) return;

        const { datasetIndex, index: dataIndex } = elements[0];


          const measureLinks = data[dataIndex][measureName].links ?? [];
          const dimensionLinks = (data[dataIndex][dimensionName].links) ?? [];


        lookerCharts.Utils.openDrillMenu({
          links: [...measureLinks, ...dimensionLinks],
          event: event.native,
        });

  });



  var label = chart.radarContainer.createChild(am4core.Label);
  label.isMeasured = true;
  // label.fontSize = config.textSize ? config.textSize :  40;
  label.x = am4core.percent(50);
  label.y = am4core.percent(100);
  label.horizontalCenter = "middle";
  label.verticalCenter = -100;
  // label.text = Number(needle)

  //
  // // Create the first label
  // var label1 = chart.chartContainer.createChild(am4core.Label);
  // label1.html = `<div><p>${config.rightValue} ${config.rightLabel}</p></div>`;
  // label1.x = 400;
  // label1.y = -200;
  // // label1.x = axis.renderer.gridContainer.pixelWidth + 205;







    hand.events.on("propertychanged", function(ev) {
    range0.endValue = ev.target.value;
    range1.value = ev.target.value;
    // label.html = true; // Enable rich text
    label.html = `<div class="dFlex"><p class="textSize1">${config.centerValue}</p><p class="textSize2">${config.centerLabel}</p></div>`,


    axis2.invalidate();
  });





  // setInterval(function() {
  //   var value = Math.round(Math.random() * 100);
  //   var animation = new am4core.Animation(hand, {
  //     property: "value",
  //     to: value
  //   }, 500, am4core.ease.cubicOut).start();
  // }, 1000);

  done();
},
});

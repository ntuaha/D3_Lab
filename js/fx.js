//https://coolors.co/app/50514f-f25f5c-ffe066-247ba0-70c1b3

var cc=[
{"class":"US",
"name":"美元",
"link":"http://www.staff.science.uu.nl/~stapp101/United-States.png",
"place":[-122.49,37.78]},{
"class":"CN",
"name":"人民幣",
"link":"http://www.staff.science.uu.nl/~stapp101/China.png",
"place":[119,29]},{
"class":"HK",
"name":"港幣",
"link":"http://www.yiyacn.com/uploads/tubiaoimg/icon/110307/Flagof_001.png",
"place":[114,22]},{
"class":"JP",
"name":"日圓",
"link":"http://www.staff.science.uu.nl/~stapp101/Japan.png",
"place":[137,35]},{
"class":"EU",
"name":"歐元",
"link":"https://images.huanqiu.com/sarons/2013/10/181deb457f5cee22ceda72117a8f7ffb.jpg",
"place":[1.4,50]}
];





function initializeRender(canvas,data,options,callback){
  //建立自己的一個group
  var doms = canvas.append("g").selectAll("text")
      .data(ETL(options.list,data))
      .enter()
      .append("text")
      .attr("class","curreny_text")
      .attr("x",function(d){return options.projection(d.place)[0]+20})
      .attr("y",function(d){return options.projection(d.place)[1]+20})
      .text(function(d){return options.currentFormat(d.rate)});

  //更新新資料
  callback(doms,data,{
    "animation_duration":options.duration*0.9,
    "currentFormat":options.currentFormat,
    "list":options.list,
    "update_duration":options.duration
  });
                                                 
}


function updateRender(doms,data,options){
  //更新資料
  var d2 = doms.data(ETL(options.list,data));
  //更新DOM
  d2.enter().append("text");
  d2.exit().remove();
  //動畫
  d2.transition()
      .duration(options.animation_duration)
      .tween('number',function(d){
          var i = d3.interpolate(+this.textContent, d.rate);
          d3.select(this).attr("style",color(this.textContent,d.rate));
          return function(t) {              
              this.textContent = options.currentFormat(i(t));
          };
      });
}

 



$(function(){

  var width = $(document).width(),
    height = $(document).height();

  var projection =  d3.geo.mercator()
      .scale((width + 1) / 2 / Math.PI)
      .translate([width / 2, height / 2])
      .precision(.1);

  d3.select("body")
    .append("svg")
    .attr("id","canvas")
    .attr("width",width)
    .attr("height",height);



  d3.json("http://52.39.23.166/api/countries",function(data){
      var canvas = d3.select("#canvas"); 
      //add group
      var group = canvas.selectAll("g")
                      .data(data.features)
                      .enter()
                      .append("g");
      //draw Countries
      var path = d3.geo.path().projection(projection);
      var areas = group.append("path")
                      .attr("d",path)
                      .attr("class","area");
    
      //draw specific countries        
      canvas.selectAll("image")
          .data(cc)
          .enter()
          .append("image")
          .attr("x",function(d){return projection(d.place)[0]-20;})
          .attr("y",function(d){return projection(d.place)[1];})
          .attr("width",30)
          .attr("height",30)
          .attr("xlink:href",function(d){return d.link;});

      //config Currency Render
      var rate_href = "http://52.39.23.166/api/rate";
      var options = {
        "projection":projection,
        "duration":2000,
        "currentFormat":function(num){ return d3.format(".3f")(num); },
        "list":cc
      };

      //initalize Currency Render
      d3.json(rate_href,function(data){ 
        initializeRender(canvas,data,options,function callback(doms,data,options){
          setInterval(function(){ 
            d3.json(rate_href,function(data){
              updateRender(doms,data,options)
            }); 
          }, options.update_duration);               
        }); 
      });

      //show time and build its own group  
      var optionsTimer = {x:80,y:450};         
      rednerTimer(canvas,optionsTimer);              
  });


        
});


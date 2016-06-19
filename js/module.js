
function color(previous,current){
  return ((current - previous) > 0)?"fill:#F25F5C":"fill:#70C1B3";
}

     
function ETL(list,rate){
    //整理資料成 {"幣別":"內容"}
    var data = {};
    rate.forEach(function(d){
      data[d.name] = d;
    });

    //放入輸出資料    
    var geo_data = [];
    list.forEach(function(d){
      if(d.name in data){
        var datum = data[d.name];
        geo_data.push({
          "place":d.place,
          "name":d.name,
          "rate":datum.score1
        });
      }
    });
    return geo_data;
}


function getDateArray(d){
  var year = d.getFullYear();
  var month = d.getMonth()+1;
  month = (month<10)?'0'+month:month;
  var day = d.getDate();
  day = (day<10)?'0'+day:day;
  var hour = d.getHours();
  hour = (hour<10)?'0'+hour:hour;
  var min = d.getMinutes();
  min = (min<10)?'0'+min:min;
  var sec = d.getSeconds();
  sec = (sec<10)?'0'+sec:sec;
  return "更新時間："+year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec;
}


function rednerTimer(canvas,options,callback){
  canvas.append("g").append("text")
    .attr("class","time")
    .attr("x",options.x)
    .attr("y",options.y)
    .text(getDateArray(new Date()));
  //update
  setInterval(function(){
    d3.select(".time").text(getDateArray(new Date()));
  },1000);
}

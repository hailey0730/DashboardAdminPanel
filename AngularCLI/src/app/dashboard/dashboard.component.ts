import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';
import { LegendItem, ChartType } from '../md/md-chart/md-chart.component';

import * as Chartist from 'chartist';
import { appService } from '../app.service'
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { Observable } from "rxjs/Observable";
import { CommonModule } from '@angular/common';
declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./css/conversation.css'],
  providers: [
      appService
  ] 
})
export class DashboardComponent implements OnInit, AfterViewInit {
    constructor(private appService: appService){

    }
  // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }
  public tableData: TableData;
  public figures: any[];
  public otherFigures: any[];
  public conversations: any[];
  public newUser : any;
  public newMessage: any;
  public updateTime: any;
  public beginDate: any = { year: new Date().getFullYear(), month: new Date().getMonth()+1, day: new Date().getDate()};
  public endDate: any;
  public overall: boolean = false;
  myDateRangePickerOptions: IMyDrpOptions = {
      // other options...
      dateFormat: 'dd.mm.yyyy',
  };
  private adminName = "Bob";
  private adminPic = "../../assets/img/faces/avatar.jpg";
  private testlink = "http://hayhay0730.000webhostapp.com/test.php";
//   private testlink = "http://www.drcare.ai/php/test.php";
  private simpleChartsLink = "http://hayhay0730.000webhostapp.com/simpleCharts.php";
  private usersDataLink = "http://hayhay0730.000webhostapp.com/loadUsersConv.php";
  private conversationLink = "http://hayhay0730.000webhostapp.com/conversation.php";

  startAnimationForLineChart(chart: any) {
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;
      chart.on('draw', function(data: any) {

        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  }
  startAnimationForBarChart(chart: any) {
      let seq2: any, delays2: any, durations2: any;
      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data: any) {
        if (data.type === 'bar') {
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  }
  // constructor(private navbarTitleService: NavbarTitleService) { }
  public ngOnInit() {
    
       //test get users conversations from server===========================================
    //   this.appService.getJson(this.usersDataLink).then((data) => {
    //       this.tableData = {
    //           headerRow: data['headerRow'],
    //           dataRows:data['Users']
    //       }

    //   });
    
      //test plug in charts data from server===============================================
      this.loadSimpleCharts();
      
         //==================================top 4 figures=================================
        //   console.log('outside promise');  //DEBUG
        //   this.appService.getJson(this.testlink).then((data) => {
        //     this.figures = data;
        //     // console.log(this.figures);  //DEBUG
        //   });

      this.figures = [                   //testing purpose
          {
              "backgroundColor": "blue",
              "bigIcon": "accessibility",
              "category": "用戶總數",
              "number": "1000",
              "smallIcon": "increase",
              "smallText": "3%"
          },
          {
              "backgroundColor": "orange",
              "bigIcon": "question_answer",
              "category": "信息總數",
              "number": "3500",
              "smallIcon": "increase",
              "smallText": "5%"
          },
          {
              "backgroundColor": "purple",
              "bigIcon": "chat_bubble",
              "category": "平均每名用戶的信息",
              "number": "5",
              "smallIcon": "decrease",
              "smallText": "1%"
          },
          {
              "backgroundColor": "red",
              "bigIcon": "reply",
              "category": "分享總數",
              "number": "400",
              "smallIcon": "increase",
              "smallText": "5%"
          }
      ]

    //==================================right 2 figures=================================
      this.otherFigures = [             //testing purpose
          {
              "backgroundColor": "blue",
              "bigIcon": "message",
              "category": "收到信息數",
              "number": "2600",
              "smallIcon": "increase",
              "smallText": "2%"
          },
          {
              "backgroundColor": "purple",
              "bigIcon": "comment",
              "category": "寄出信息數",
              "number": "1000",
              "smallIcon": "increase",
              "smallText": "3%"
          }
      ]


          //initialize conversation block========================================
        //   this.appService.getJson(this.conversationLink).then((data) => {
        //     this.conversations = data;
        //   });


   }
   
   ngAfterViewInit() {
      
       //  Activate the tooltips
       $('[rel="tooltip"]').tooltip();
   }

//conversation block
//    sendMessage(){
//        var message = $('.message').val();

//        var newMessage = {
//            "Name": this.adminName,
//            "ImgUrl": this.adminPic,
//            "Comment": message,
//            "Time": (new Date).toLocaleTimeString()
//         };
   
//        this.conversations.push(newMessage);
//     //    this.appService.postJson('http://hayhay0730.000webhostapp.com/conversation.json', this.conversations);
//    }

//    reply(name, comment){
//        var replyText = '@' + name + ' \n "'  + comment + '"  ' + this.adminName + " : " ;
//        $('.message').val(replyText);

//    }
//conversation block end

   // dateRangeChanged callback function called when the user apply the date range. This is
   // mandatory callback in this option. There are also optional inputFieldChanged and
   // calendarViewChanged callbacks.
   onDateRangeChanged(event: IMyDateRangeModel) {
       // event properties are: event.beginDate, event.endDate, event.formatted,
       // event.beginEpoc and event.endEpoc

       this.overall = false;

       this.beginDate = event.beginDate;
       this.endDate = event.endDate;
       console.log(this.beginDate);
       console.log(this.endDate);

    //    update content 
    //update top 4 figures
       this.appService.getJson(this.testlink).then((data) => {
        //    this.figures = data;
           // console.log(this.figures);  //DEBUG
       });

       //update right 2 figures

       //update chart - might need to modify to include parameter
       this.loadSimpleCharts();

   }

   showOverall(){
    this.overall = true;

    //    update content 
    //update top 4 figures
    this.appService.getJson(this.testlink).then((data) => {
        // this.figures = data;
        // console.log(this.figures);  //DEBUG
    });

       //update right 2 figures

       //update chart - might need to modify to include parameter
       this.loadSimpleCharts();
   }

   loadSimpleCharts(){
    //    const today = new Date();
    //    const y = today.getFullYear();
    //    const m = today.getMonth();
    //    const d = today.getDate();
    //    const h = today.getHours();
    //    const min = today.getMinutes();
    //    const s = today.getSeconds();

    //    this.updateTime = y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;

        // this.appService.getJson(this.simpleChartsLink).then((data) => {
            //  console.log(data[0]);  //DEBUG

        //    const dataColouredBarsChart = {
        //        labels: data[0]['labels'],
        //        series: data[0]['series']
        //    };


            const dataColouredBarsChart = {
                labels: ["06", "07", "08", "09", "10", "11", "12", "13", "14", "15"],
                series: [
                    [287, 385, 490, 554, 586, 698, 695, 752, 788, 846, 944],
                    [67, 152, 143, 287, 335, 435, 437, 539, 542, 544, 647]
                ],
            };
           const optionsColouredBarsChart: any = {
               lineSmooth: Chartist.Interpolation.cardinal({
                   tension: 10
               }),
               axisY: {
                   showGrid: true,
                   offset: 40
               },
               axisX: {
                   showGrid: false,
               },
               low: 0,
               high: 1000,
            //    high: data[0]['scale'],
               showPoint: true,
               height: '300px'
           };


           const colouredBarsChart = new Chartist.Line('#colouredBarsChart', dataColouredBarsChart,
               optionsColouredBarsChart);

           this.startAnimationForLineChart(colouredBarsChart);


        //    //initialize new user chart=============================================================
        //    this.newUser = {
        //        'smallIcon': data[1]['smallIcon'],
        //        'percentage': data[1]['percentage'],
        //    }

           

        //    const optionsDailySalesChart = {
        //        lineSmooth: Chartist.Interpolation.cardinal({
        //            tension: 0
        //        }),
        //        low: 0,
        //        high: data[1]['scale'], // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        //        chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        //    };

        //    const dataDailySalesChart = {
        //        labels: data[1]['labels'],
        //        series: data[1]['series']
        //    };
        //    //   console.log(dataDailySalesChart);  //DEBUG
        //    const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

        //    this.startAnimationForLineChart(dailySalesChart);

        //    //initialize messages chart===================================================
        //    this.newMessage = {
        //        'smallIcon': data[2]['smallIcon'],
        //        'percentage': data[2]['percentage'],
        //    }

        //    const optionsCompletedTasksChart = {
        //        lineSmooth: Chartist.Interpolation.cardinal({
        //            tension: 0
        //        }),
        //        low: 0,
        //        high: data[2]['scale'], // creative tim: we recommend you to set the high sa the biggest value + something for a better
        //        // look
        //        chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
        //    };

        //    const dataCompletedTasksChart = {
        //        labels: data[2]['labels'],
        //        series: data[2]['series']
        //    }
        //    const completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart,
        //        optionsCompletedTasksChart);

        //    this.startAnimationForLineChart(completedTasksChart);

          
    //    });
   }

   
}

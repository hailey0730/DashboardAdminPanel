import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';
import { LegendItem, ChartType } from '../md/md-chart/md-chart.component';

import * as Chartist from 'chartist';
import { dashboardService } from './dashboard.service'
import { Observable } from "rxjs/Observable";
declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./css/ace.min.css', './css/bootstrap.min.css', './css/conversation.css'],
//   styleUrls: ['./css/conversation.css'],
  providers: [
      dashboardService
  ] 
})
export class DashboardComponent implements OnInit, AfterViewInit {
    constructor(private dashboardService: dashboardService){

    }
  // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }
  public tableData: TableData;
  public figures: JSON[];
  public conversations: any[];
  private adminName = "Bob";
  private adminPic = "../../assets/img/faces/avatar.jpg";
  private testlink = "http://www.drcare.ai/php/test.php";
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
    //   this.tableData = {
    //       headerRow: ['ID', 'Name', 'Salary', 'Country', 'City'],
    //       dataRows: [
    //           ['US', 'USA', '2.920	', '53.23%'],
    //           ['DE', 'Germany', '1.300', '20.43%'],
    //           ['AU', 'Australia', '760', '10.35%'],
    //           ['GB', 'United Kingdom	', '690', '7.87%'],
    //           ['RO', 'Romania', '600', '5.94%'],
    //           ['BR', 'Brasil', '550', '4.34%']
    //       ]
    //    };
       //test get users conversations from server===========================================
      this.dashboardService.getJson(this.usersDataLink).then((data) => {
          this.tableData = {
              headerRow: data['headerRow'],
              dataRows:data['Users']
          }

      });


    
      //test plug in charts data from server===============================================
      console.log("call loadSimpleCharts from OnInit");
      this.loadSimpleCharts();
      
         //testing get json from dashboardService=================================
        //   console.log('outside promise');  //DEBUG
          this.dashboardService.getJson(this.testlink).then((data) => {
            this.figures = data;
            // console.log(this.figures);  //DEBUG
            // $('.card-header').attr('data-background-color', this.figures[2]['backgroundColor']);
            
          });

          //initialize multipleBarsChart=========================================
          const dataMultipleBarsChart = {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              series: [
                  [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
                  [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
              ]
          };

          const optionsMultipleBarsChart = {
              seriesBarDistance: 10,
              axisX: {
                  showGrid: false
              },
              height: '300px'
          };

          const responsiveOptionsMultipleBarsChart: any = [
              ['screen and (max-width: 640px)', {
                  seriesBarDistance: 5,
                  axisX: {
                      labelInterpolationFnc: function (value: any) {
                          return value[0];
                      }
                  }
              }]
          ];

          const multipleBarsChart = new Chartist.Bar('#multipleBarsChart', dataMultipleBarsChart,
              optionsMultipleBarsChart, responsiveOptionsMultipleBarsChart);

          // start animation for the Emails Subscription Chart
          this.startAnimationForBarChart(multipleBarsChart);
          
          
          //initialize PieChart==================================================
          const dataPreferences = {
              labels: ['50%', '12%', '32%', '6%'],
              series: [50, 12, 32, 6]
          };

          const optionsPreferences = {
              height: '230px'
          };

          new Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);


          //initialize conversation block========================================
          this.dashboardService.getJson(this.conversationLink).then((data) => {
            this.conversations = data;
          });


   }
   
   ngAfterViewInit() {
       const breakCards = true;
       if (breakCards === true) {
           // We break the cards headers if there is too much stress on them :-)
           $('[data-header-animation="true"]').each(function(){
               const $fix_button = $(this);
               const $card = $(this).parent('.card');
               $card.find('.fix-broken-card').click(function(){
                   const $header = $(this).parent().parent().siblings('.card-header, .card-image');
                   $header.removeClass('hinge').addClass('fadeInDown');

                   $card.attr('data-count', 0);

                   setTimeout(function(){
                       $header.removeClass('fadeInDown animate');
                   }, 480);
               });

               $card.mouseenter(function(){
                   const $this = $(this);
                   const hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
                   $this.attr('data-count', hover_count);
                //    if (hover_count >= 20) {
                //        $(this).children('.card-header, .card-image').addClass('hinge animated');
                //    }
               });
           });
       }
       //  Activate the tooltips
       $('[rel="tooltip"]').tooltip();
   }

   hasLink(figure):boolean{
       var bool = false;
       if(figure.optionalLink){
           bool = true;
       }
       return bool;
   }

   IsAdmin(name):boolean{
       var bool = false;
       if(name == this.adminName){
           bool = true;
       }
       return bool;
   }

   sendMessage(){
       var message = $('.message').val();

       var newMessage = {
           "Name": this.adminName,
           "ImgUrl": this.adminPic,
           "Comment": message,
           "Time": (new Date).toLocaleTimeString()
        };
   
       console.log(newMessage);
       this.conversations.push(newMessage);
        console.log(this.conversations);
    //    this.dashboardService.postJson('http://hayhay0730.000webhostapp.com/conversation.json', this.conversations);
   }

   reply(name, comment){
       var replyText = '@' + name + ' \n "'  + comment + '"  ' + this.adminName + " : " ;
       $('.message').val(replyText);

   }

   loadSimpleCharts(){
       /* ----------==========     Daily Sales Chart initialization    ==========---------- */

       //   const dataDailySalesChart = {
       //       labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
       //       series: [
       //           [12, 17, 7, 17, 23, 18, 38]
       //       ]
       //   };

    //    const optionsDailySalesChart = {
    //        lineSmooth: Chartist.Interpolation.cardinal({
    //            tension: 0
    //        }),
    //        low: 0,
    //        high: 200, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    //        chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    //    };

       //   const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

       //   this.startAnimationForLineChart(dailySalesChart);
       /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

       //   const dataCompletedTasksChart = {
       //       labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
       //       series: [
       //           [230, 750, 450, 300, 280, 240, 200, 190]
       //       ]
       //   };

    //    const optionsCompletedTasksChart = {
    //        lineSmooth: Chartist.Interpolation.cardinal({
    //            tension: 0
    //        }),
    //        low: 0,
    //        high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better
    //        // look
    //        chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    //    };

       //  const completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart,
       //   optionsCompletedTasksChart);

       //  this.startAnimationForLineChart(completedTasksChart);

       /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

       //   const dataWebsiteViewsChart = {
       //     labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
       //     series: [
       //       [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

       //     ]
       //   };
    //    const optionsWebsiteViewsChart = {
    //        axisX: {
    //            showGrid: false
    //        },
    //        low: 0,
    //        high: 1000,
    //        chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    //    };
    //    const responsiveOptions: any = [
    //        ['screen and (max-width: 640px)', {
    //            seriesBarDistance: 5,
    //            axisX: {
    //                labelInterpolationFnc: function (value) {
    //                    return value[0];
    //                }
    //            }
    //        }]
    //    ];
    //   const websiteViewsChart = new Chartist.Bar('#websiteViewsChart', dataWebsiteViewsChart, optionsWebsiteViewsChart, responsiveOptions);

    //   this.startAnimationForBarChart(websiteViewsChart);

       this.dashboardService.getJson(this.simpleChartsLink).then((data) => {
           //   console.log(data[0]);  //DEBUG
           //initialize daily sales chart
           const optionsDailySalesChart = {
               lineSmooth: Chartist.Interpolation.cardinal({
                   tension: 0
               }),
               low: 0,
               high: data[0]['scale'], // creative tim: we recommend you to set the high sa the biggest value + something for a better look
               chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
           };

           const dataDailySalesChart = {
               labels: data[0]['labels'],
               series: data[0]['series']
           };
           //   console.log(dataDailySalesChart);  //DEBUG
           const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

           this.startAnimationForLineChart(dailySalesChart);

           //initialize completed tasks chart
           const optionsCompletedTasksChart = {
               lineSmooth: Chartist.Interpolation.cardinal({
                   tension: 0
               }),
               low: 0,
               high: data[1]['scale'], // creative tim: we recommend you to set the high sa the biggest value + something for a better
               // look
               chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
           };

           const dataCompletedTasksChart = {
               labels: data[1]['labels'],
               series: data[1]['series']
           }
           const completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart,
               optionsCompletedTasksChart);

           this.startAnimationForLineChart(completedTasksChart);

           //initialize website views chart
           const optionsWebsiteViewsChart = {
               axisX: {
                   showGrid: false
               },
               low: 0,
               high: data[2]['scale'],
               chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
           };
           const responsiveOptions: any = [
               ['screen and (max-width: 640px)', {
                   seriesBarDistance: 5,
                   axisX: {
                       labelInterpolationFnc: function (value) {
                           return value[0];
                       }
                   }
               }]
           ];

           const dataWebsiteViewsChart = {
               labels: data[2]['labels'],
               series: data[2]['series']
           }
           const websiteViewsChart = new Chartist.Bar('#websiteViewsChart', dataWebsiteViewsChart, optionsWebsiteViewsChart, responsiveOptions);

           this.startAnimationForBarChart(websiteViewsChart);
       });
   }

   
}

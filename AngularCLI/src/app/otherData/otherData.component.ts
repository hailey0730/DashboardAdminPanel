import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';
import { LegendItem, ChartType } from '../md/md-chart/md-chart.component';

import * as Chartist from 'chartist';
import { appService } from '../app.service'
// import { Observable } from "rxjs/Observable";
declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './otherData.component.html',
    // styleUrls: ['./css/ace.min.css', './css/bootstrap.min.css', './css/conversation.css'],
    //   styleUrls: ['./css/conversation.css'],
      styleUrls: [],
    providers: [
        appService
    ]
})
export class OtherDataComponent implements OnInit, AfterViewInit {
    constructor(private appService: appService) {

    }
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }
    public figures: any[];
    public tableData: TableData;
    public conversations: any[];
    public tableData1: TableData;
    public tableData2: TableData;
    public keywords: any[];
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
        chart.on('draw', function (data: any) {

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
        chart.on('draw', function (data: any) {
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

        this.appService.getJson(this.testlink).then((data) => {
           
            this.figures = data;
            this.figures.splice(3, 1);
        });

        // this.figures = [
        //   {
        //       "backgroundColor": "blue",
        //       "bigIcon": "accessibility",
        //       "category": "Accessibility",
        //       "number": "1000",
        //       "smallIcon": "done",
        //       "smallText": "healthy people",
        //       "optionalLink": ""
        //   },
        //   {
        //       "backgroundColor": "orange",
        //       "bigIcon": "accessibility",
        //       "category": "Accessibility",
        //       "number": "1000",
        //       "smallIcon": "done",
        //       "smallText": "healthy people",
        //       "optionalLink": ""
        //   },
        //   {
        //       "backgroundColor": "purple",
        //       "bigIcon": "accessibility",
        //       "category": "Accessibility",
        //       "number": "1000",
        //       "smallIcon": "warning",
        //       "smallText": "test link",
        //       "optionalLink": "www.google.com"
        //   }
        // ];

        /*  **************** Coloured Rounded Line Chart - Line Chart ******************** */

        const dataColouredBarsChart = {
            labels: ['\'06', '\'07', '\'08', '\'09', '\'10', '\'11', '\'12', '\'13', '\'14', '\'15'],
            series: [
                [287, 385, 490, 554, 586, 698, 695, 752, 788, 846, 944],        //blue
                [67, 152, 143, 287, 335, 435, 437, 539, 542, 544, 647],         //red
                [23, 113, 67, 190, 239, 307, 308, 439, 410, 410, 509],          //orange
                [31, 103, 67, 19, 39, 307, 380, 439, 410, 410, 59],             //purple
                [23, 13, 670, 109, 29, 70, 30, 309, 40, 410, 900]               //green
            ]
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
            showPoint: true,
            height: '300px'
        };


        const colouredBarsChart = new Chartist.Line('#colouredBarsChart', dataColouredBarsChart,
            optionsColouredBarsChart);

        this.startAnimationForLineChart(colouredBarsChart);

        /*  **************** Coloured Rounded Line Chart - Line Chart2 ******************** */

        const dataColouredBarsChart2 = {
            labels: ['\'06', '\'07', '\'08', '\'09', '\'10', '\'11', '\'12', '\'13', '\'14', '\'15'],
            series: [
                [287, 385, 490, 554, 586, 698, 695, 752, 788, 846, 944],
                [67, 152, 143, 287, 335, 435, 437, 539, 542, 544, 647]
            ]
        };

        const optionsColouredBarsChart2: any = {
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
            showPoint: true,
            height: '300px'
        };


        const colouredBarsChart2 = new Chartist.Line('#colouredBarsChart2', dataColouredBarsChart2,
            optionsColouredBarsChart2);

        this.startAnimationForLineChart(colouredBarsChart2);



        // //initialize conversation block========================================
        // this.appService.getJson(this.conversationLink).then((data) => {
        //     this.conversations = data;
        // });


        /*  **************** User Gender - Pie Chart ******************** */

        const dataPreferences = {
            labels: ['62%', '38%'],
            series: [62, 38]
        };

        const optionsPreferences = {
            height: '230px'
        };

        new Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);


        /*  **************** User Region - Pie Chart2 ******************** */

        const dataPreferences2 = {
            labels: ['62%', '32%', '6%'],
            series: [62, 32, 6]
            //  labels: ['10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%'],
            // series: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
        };

        const optionsPreferences2 = {
            height: '230px'
        };

        new Chartist.Pie('#chartPreferences2', dataPreferences2, optionsPreferences2);

        // ============returning users bar chart=============================


        const dataMultipleBarsChart = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
                [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
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


    }

    ngAfterViewInit() {
        const breakCards = true;
        if (breakCards === true) {
            // We break the cards headers if there is too much stress on them :-)
            $('[data-header-animation="true"]').each(function () {
                const $fix_button = $(this);
                const $card = $(this).parent('.card');
                $card.find('.fix-broken-card').click(function () {
                    const $header = $(this).parent().parent().siblings('.card-header, .card-image');
                    $header.removeClass('hinge').addClass('fadeInDown');

                    $card.attr('data-count', 0);

                    setTimeout(function () {
                        $header.removeClass('fadeInDown animate');
                    }, 480);
                });

                $card.mouseenter(function () {
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

    hasLink(figure): boolean {
        var bool = false;
        if (figure.optionalLink) {
            bool = true;
        }
        return bool;
    }


}

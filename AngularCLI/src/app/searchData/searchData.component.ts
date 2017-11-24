import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';
import { LegendItem, ChartType } from '../md/md-chart/md-chart.component';

import * as Chartist from 'chartist';
import { appService } from '../app.service'
// import { Observable } from "rxjs/Observable";
declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './searchData.component.html',
    // styleUrls: ['./css/ace.min.css', './css/bootstrap.min.css', './css/conversation.css'],
    //   styleUrls: ['./css/conversation.css'],
      styleUrls: ['./css/searchData.css'],
    providers: [
        appService
    ]
})
export class SearchDataComponent implements OnInit, AfterViewInit {
    constructor(private appService: appService) {

    }
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }
    public conversations: any[];
    public tableData1: TableData;
    public tableData2: TableData;
    public tableData3: TableData;
    public tableData4: TableData;
    public keywords: any[];
    private testlink = "http://hayhay0730.000webhostapp.com/test.php";
    private testTable = "http://hayhay0730.000webhostapp.com/testTable.php";
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

        this.loadCharts();

        // //initialize conversation block========================================
        // this.appService.getJson(this.conversationLink).then((data) => {
        //     this.conversations = data;
        // });

        this.loadTables();
        
    }

    ngAfterViewInit() {
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

    loadTables(){
        this.appService.getJson(this.testTable).then((data) => {
        this.tableData1 = {
            headerRow: ['關鍵字', '數量'],
            dataRows: [
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100'],
                ['test keyword', ' 100']
            ]
        };

        console.log(data);

        this.tableData2 = {
            headerRow: data['headerRow'],
            dataRows: data['dataRows']
        }

        this.tableData3 = {
            headerRow: data['headerRow'],
            dataRows: data['dataRows']
        }

        this.tableData4 = {
            headerRow: data['headerRow'],
            dataRows: data['dataRows']
        }
    });

    }

    loadCharts(){

        this.appService.getJson(this.simpleChartsLink).then((data) => {

        /*  **************** most searched keywords - Line Chart ******************** */
        this.keywords = [
            { 'word': 'Fever', 'count': '1em', 'color': 'text-primary' },
            { 'word': 'sick', 'count': '2em', 'color': 'text-info' },
            { 'word': 'diarrhea', 'count': '3.4em', 'color': 'text-success' },
            { 'word': 'dizzy', 'count': '1.2em', 'color': 'text-warning' },
            { 'word': 'stomache', 'count': '1.5em', 'color': 'text-danger' }
        ];

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

        /*  **************** appointment & open hours - Line Chart2 ******************** */

        const dataColouredBarsChart2 = {
            labels: data[0]['labels'],
            series: data[0]['series']
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
            high: data[0]['series'],
            showPoint: true,
            height: '300px'
        };


        const colouredBarsChart2 = new Chartist.Line('#colouredBarsChart2', dataColouredBarsChart2,
            optionsColouredBarsChart2);

        this.startAnimationForLineChart(colouredBarsChart2);

        // ======================tracking conversation - Bar chart==========================
        const dataMultipleBarsChart = {
            labels: ['開始使用', '診所時間', '預約醫生', '醫療知識查詢', '其他', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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

    });

}

}

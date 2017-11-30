import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';
import { LegendItem, ChartType } from '../md/md-chart/md-chart.component';

import * as Chartist from 'chartist';
import { appService } from '../app.service';
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { Observable } from "rxjs/Observable";
import { CommonModule } from '@angular/common';

declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './searchData.component.html',
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
    public keywords: any[] = [];
    public today: any = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
    public beginDate: any = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
    public endDate: any;
    public overall: boolean = false;
    myDateRangePickerOptions: IMyDrpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };
    private hideKeywords: any[] = [];
    private testlink = "http://hayhay0730.000webhostapp.com/test.php";
    private testTable = "http://hayhay0730.000webhostapp.com/testTable.php";
    //   private testlink = "http://www.drcare.ai/php/test.php";
    private simpleChartsLink = "http://hayhay0730.000webhostapp.com/simpleCharts.php";
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

    highlight(event){
        $(event.target).css('font-weight','bold');
        // console.log($(event.target).attr('class'));     //DEBUG
        var color = $(event.target).attr('class');
        switch(color){
            case 'text-info':
                // console.log('info');     //DEBUG
                $('#colouredBarsChart > svg > g > g:first-child > .ct-line').css('stroke-width','5px');
                break;
            case 'text-danger':
                $('#colouredBarsChart > svg > g > g:nth-child(2) > .ct-line').css('stroke-width', '5px');
                break;
            case 'text-warning':
                $('g > g:nth-child(3) > .ct-line').css('stroke-width', '5px');
                break;
            case 'text-primary':
                $('g > g:nth-child(4) > .ct-line').css('stroke-width', '5px');
                break;
            case 'text-success':
                $('g > g:nth-child(5) > .ct-line').css('stroke-width', '5px');
                break;
        }

    }

    noHighlight(event){
        $(event.target).css('font-weight','100');
        $('.ct-line').css('stroke-width', '3px');
    }

    hideLine(event){
        var hide = false;
        var color = $(event.target).attr('class');
        for(var i = 0; i < this.hideKeywords.length; i ++){
            if(this.hideKeywords[i] == color){
                hide = true;
                this.hideKeywords.splice(i,1);
                break;
            }
        }
        if(hide != true){
            this.hideKeywords.push(color);
            $(event.target).css('color', '#c7c7c7');
            // console.log($(event.target).attr('class'));     //DEBUG
            switch (color) {
                case 'text-info':
                    $('#colouredBarsChart > svg > g > g:first-child > .ct-line').css('display', 'none');
                    $('#colouredBarsChart > svg > g > g:first-child > .ct-point').css('display', 'none');
                    break;
                case 'text-danger':
                    $('#colouredBarsChart > svg > g > g:nth-child(2) > .ct-line').css('display', 'none');
                    $('#colouredBarsChart > svg > g > g:nth-child(2) > .ct-point').css('display', 'none');
                    break;
                case 'text-warning':
                    $('g > g:nth-child(3) > .ct-line').css('display', 'none');
                    $('g > g:nth-child(3) > .ct-point').css('display', 'none');
                    break;
                case 'text-primary':
                    $('g > g:nth-child(4) > .ct-line').css('display', 'none');
                    $('g > g:nth-child(4) > .ct-point').css('display', 'none');
                    break;
                case 'text-success':
                    $('g > g:nth-child(5) > .ct-line').css('display', 'none');
                    $('g > g:nth-child(5) > .ct-point').css('display', 'none');
                    break;
            }
        }else{

            switch (color) {
                case 'text-info':
                    $(event.target).css('color', '#00bcd4');
                    $('#colouredBarsChart > svg > g > g:first-child > .ct-line').css('display', 'flex');
                    $('#colouredBarsChart > svg > g > g:first-child > .ct-point').css('display', 'flex');
                    break;
                case 'text-danger':
                    $(event.target).css('color', '#f44336');
                    $('#colouredBarsChart > svg > g > g:nth-child(2) > .ct-line').css('display', 'flex');
                    $('#colouredBarsChart > svg > g > g:nth-child(2) > .ct-point').css('display', 'flex');
                    break;
                case 'text-warning':
                    $(event.target).css('color', '#ff9800');
                    $('g > g:nth-child(3) > .ct-line').css('display', 'flex');
                    $('g > g:nth-child(3) > .ct-point').css('display', 'flex');
                    break;
                case 'text-primary':
                    $(event.target).css('color', '#9c27b0');
                    $('g > g:nth-child(4) > .ct-line').css('display', 'flex');
                    $('g > g:nth-child(4) > .ct-point').css('display', 'flex');
                    break;
                case 'text-success':
                    $(event.target).css('color', '#4caf50');
                    $('g > g:nth-child(5) > .ct-line').css('display', 'flex');
                    $('g > g:nth-child(5) > .ct-point').css('display', 'flex');
                    break;
            }

        }
        
    }

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
        this.loadTables();

        this.loadCharts();

    }

    showOverall() {
        this.overall = true;

        //    update content 
        this.loadTables();

        this.loadCharts();
       
    }

    showThisMonth() {
        this.overall = false;
        this.beginDate = this.today;

        //    update content 
        this.loadTables();

        this.loadCharts();
    }


    loadTables(){
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

        // this.appService.getJson(this.testTable).then((data) => {
        

        // console.log(data);      //DEBUG

        this.tableData2 = {
            headerRow: ['關鍵字', '數量'],
            dataRows: [['test keyword', ' 100'],
            ['test keyword', ' 100'],
            ['test keyword', ' 100'],
            ['test keyword', ' 100'],
            ['test keyword', ' 100']]
        }
        // this.tableData2 = {
        //     headerRow: data['headerRow'],
        //     dataRows: data['dataRows']
        // }

        this.tableData3 = {
            headerRow: ['關鍵字', '數量'],
            dataRows: [['test keyword', ' 100'],
            ['test keyword', ' 100'],
            ['test keyword', ' 100'],
            ['test keyword', ' 100'],
            ['test keyword', ' 100']]
        }

        this.tableData4 = {
            headerRow: ['關鍵字', '數量'],
            dataRows: [['test keyword', ' 100'],
            ['test keyword', ' 100'],
            ['test keyword', ' 100'],
            ['test keyword', ' 100'],
            ['test keyword', ' 100']]
        }
    // });

    }

    loadCharts(){

        /*  **************** most searched keywords - Line Chart ******************** */
        this.keywords = [
            { 'word': 'sick', 'count': '2em', 'color': 'text-info' },           //blue
            { 'word': 'stomache', 'count': '1.5em', 'color': 'text-danger' },    //red
            { 'word': 'dizzy', 'count': '1.2em', 'color': 'text-warning' },     //orange
            { 'word': 'Fever', 'count': '1em', 'color': 'text-primary' },       //purple
            { 'word': 'diarrhea', 'count': '3.4em', 'color': 'text-success' }  //green
        ];

        const dataColouredBarsChart = {
            labels: ['\'06', '\'07', '\'08', '\'09', '\'10', '\'11', '\'12', '\'13', '\'14', '\'15'],
            series: [
                { 'name': 'Fever', 'data': [287, 385, 490, 554, 586, 698, 695, 752, 788, 846, 944] },        //blue
                { 'name': 'sick', 'data': [67, 152, 143, 287, 335, 435, 437, 539, 542, 544, 647] },         //red
                { 'name': 'diarrhea', 'data': [23, 113, 67, 190, 239, 307, 308, 439, 410, 410, 509] },      //orange
                { 'name': 'dizzy', 'data': [31, 103, 67, 19, 39, 307, 380, 439, 410, 410, 59] },       //purple
                { 'name': 'stomache', 'data': [23, 13, 670, 109, 29, 70, 30, 309, 40, 410, 900] }        //green
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
            width: '100%',
            height: '300px',
            fullWidth: true,
            chartPadding: {
                right: 40
            }

        };

        const colouredBarsChart = new Chartist.Line('#colouredBarsChart', dataColouredBarsChart,
            optionsColouredBarsChart);

        this.startAnimationForLineChart(colouredBarsChart);

        // this.appService.getJson(this.simpleChartsLink).then((data) => {

        /*  **************** appointment & open hours - Line Chart2 ******************** */

        const dataColouredBarsChart2 = {
            labels: ["06", "07", "08", "09", "10", "11", "12", "13", "14", "15"],
            series: [
                [287, 385, 490, 554, 586, 698, 695, 752, 788, 846, 944],
                [67, 152, 143, 287, 335, 435, 437, 539, 542, 544, 647]
            ],
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

    // });

}

}

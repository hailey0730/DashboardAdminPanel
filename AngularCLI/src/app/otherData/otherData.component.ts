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
    templateUrl: './otherData.component.html',
    styleUrls: ['./css/otherData.css'],
    // styleUrls: ['../../assets/css/otherData.css'],
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
    public tableData2: TableData;
    public conversations: any[];
    public adminName = "Bob";
    public today: any = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
    public beginDate: any = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
    public endDate: any;
    public period: any = '24hr';
    myDateRangePickerOptions: IMyDrpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };
    public classList: any[] = [['dark100', 'dark80', 'dark60', 'dark50', 'light40', 'light20'],
        ['dark100', 'dark80', 'dark60', 'dark50', 'light40', 'light20'],
        ['dark100', 'dark80', 'dark60', 'dark50', 'light40', 'light20'],
        ['dark100', 'dark80', 'dark60', 'dark50', 'light40', 'light20'],
        ['dark100', 'dark80', 'dark60', 'dark50', 'light40', 'light20'],
        ['dark100', 'dark80', 'dark60', 'dark50', 'light40', 'light20']];

    public classList2: any[] = [['dark100', 'dark90', 'dark80', 'dark70', 'dark60', 'dark50', 'light40', 'light30', 'light20', 'light10', 'light10', 'light10'],
        ['dark100', 'dark90', 'dark80', 'dark70', 'dark60', 'dark50', 'light40', 'light30', 'light20', 'light10', 'light10', 'light10'],
    ['dark100', 'dark90', 'dark80', 'dark70', 'dark60', 'dark50', 'light40', 'light30', 'light20', 'light10', 'light10', 'light10'],
    ['dark100', 'dark90', 'dark80', 'dark70', 'dark60', 'dark50', 'light40', 'light30', 'light20', 'light10', 'light10', 'light10'],
    ['dark100', 'dark90', 'dark80', 'dark70', 'dark60', 'dark50', 'light40', 'light30', 'light20', 'light10', 'light10', 'light10'],
    ['dark100', 'dark90', 'dark80', 'dark70', 'dark60', 'dark50', 'light40', 'light30', 'light20', 'light10', 'light10', 'light10'],
    ['dark100', 'dark90', 'dark80', 'dark70', 'dark60', 'dark50', 'light40', 'light30', 'light20', 'light10', 'light10', 'light10']];


    public percentList:any[] = [['100%','80%','60%','50%','40%','20%'],
        ['100%', '80%', '60%', '50%', '40%', '20%'],
        ['100%', '80%', '60%', '50%', '40%', '20%'],
        ['100%', '80%', '60%', '50%', '40%', '20%'],
        ['100%', '80%', '60%', '50%', '40%', '20%'],
        ['100%', '80%', '60%', '50%', '40%', '20%']];

    selectTheme = 'primary';
    durations = [
        {value: '24hr', viewValue: 'Last 24 hours'},
        {value: '7d', viewValue: 'Last 7 days'},
        {value: '14d', viewValue: 'Last 14 days'}
    ]
    
    private testlink = "http://hayhay0730.000webhostapp.com/otherDataTop.php";
    private usersDataLink = "http://hayhay0730.000webhostapp.com/loadUsersConv.php";
    private conversationLink = "http://hayhay0730.000webhostapp.com/conversation.php";
    private simpleChartsLink = "http://hayhay0730.000webhostapp.com/simpleCharts.php";
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

        this.loadChart();

        // this.appService.getJson(this.testlink).then((data) => {
           
        //     this.figures = data;
        //     // this.figures.splice(3, 1);       //DEBUG: remove the last element of array
        // });

        /*  **************** User Gender - Pie Chart ******************** */

        const dataPreferences = {
            labels: ['62%', '38%'],
            series: [62, 38]
        };

        const optionsPreferences = {
            donut: true,
            donutWidth: 30,
            donutSolid: true,
            startAngle: 270,
            showLabel: true,
            height: '200px'
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
            donut: true,
            donutWidth: 30,
            donutSolid: true,
            startAngle: 270,
            showLabel: true,
            height: '200px'
        };

        new Chartist.Pie('#chartPreferences2', dataPreferences2, optionsPreferences2);

        /*  **************** User Region - Pie Chart3 ******************** */

        const dataPreferences3 = {
            labels: ['16%', '32%', '6%', '20%', '10%', '16%'],
            series: [16, 32, 6, 20, 10, 16]
        };

        const optionsPreferences3 = {
            donut: true,
            donutWidth: 30,
            donutSolid: true,
            startAngle: 270,
            showLabel: true,
            height: '200px'
        };

        new Chartist.Pie('#chartPreferences3', dataPreferences3, optionsPreferences3);

        

// ========active hours color table===========================================================
        this.tableData2 = {
            headerRow: ['', '12am', '2am', '4am', '6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'],
            dataRows: [
                ['Sun','70%', '10%', '10%', '10%', '10%', '10%', '70%', '70%', '70%', '70%', '70%', '70%'],
                ['Mon', '70%', '10%', '10%', '10%', '10%', '10%', '70%', '70%', '70%', '70%', '70%', '70%'],
                ['Tue', '70%', '10%', '10%', '10%', '10%', '10%', '70%', '70%', '70%', '70%', '70%', '70%'],
                ['Wed', '70%', '10%', '10%', '10%', '10%', '10%', '70%', '70%', '70%', '70%', '70%', '70%'],
                ['Thur', '70%', '10%', '10%', '10%', '10%', '10%', '70%', '70%', '70%', '70%', '70%', '70%'],
                ['Fri', '70%', '10%', '10%', '10%', '10%', '10%', '70%', '70%', '70%', '70%', '70%', '70%'],
                ['Sat', '70%', '10%', '10%', '10%', '10%', '10%', '70%', '70%', '70%', '70%', '70%', '70%']
            ]
        }

        // ========returning users color table===========================================================
        this.tableData = {
            headerRow: ['week/Days', '  Initial', '1 - 7', '8 - 14', '15 - 21', '22 - 28', '29 - 35'],
            dataRows: this.percentList
        }
       
      


    }

    ngAfterViewInit() {
       
        //  Activate the tooltips
        $('[rel="tooltip"]').tooltip();
    }

    
    // dateRangeChanged callback function called when the user apply the date range. This is
    // mandatory callback in this option. There are also optional inputFieldChanged and
    // calendarViewChanged callbacks.
    onDateRangeChanged(event: IMyDateRangeModel) {
        // event properties are: event.beginDate, event.endDate, event.formatted,
        // event.beginEpoc and event.endEpoc

        this.beginDate = event.beginDate;
        this.endDate = event.endDate;
        console.log(this.beginDate);
        console.log(this.endDate);

        //    update content 
        // update donut charts


        // update active user curve     //average
        this.loadChart();

        // update active user table      //average
        

        // update retention table for the specific month

    }

  

    reload(){
        this.endDate = {};
        console.log(this.period);
        // update donut charts

    
        // update active user table
        this.loadChart();

    }

    loadChart(){
        //load active user curve
        // this.appService.getJson(this.simpleChartsLink).then((data) => {
            //  console.log(data[0]);  //DEBUG

        //labels should change to date 
        var byPeriod = [];

            if (this.period == '24hr') {
                byPeriod = ["12am", "2am", '4am', '6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm']
            } else if (this.period == '7d') {
                console.log('change chart label');
                for (var i = 0; i < 7; i++) {
                    var thatDate = this.today.day + i;
                    byPeriod[i] = thatDate + '/' + this.today.month;
                    console.log(byPeriod[i]);
                }
            } else {
                console.log('change chart label');
                for (var i = 0; i < 14; i++) {
                    var thatDate = this.today.day + i;
                    byPeriod[i] = thatDate + '/' + this.today.month;
                    console.log(byPeriod[i]);
                }
            }

        
            const dataColouredBarsChart = {
                labels: byPeriod,
                series: [
                    // [287, 385, 490, 554, 586, 698, 695, 752, 788, 846, 944, 980]
                    [100,200,300,400,500,600,700]
                ],
            };
            // const dataColouredBarsChart = {
            //     labels: data[0]['labels'],
            //     series: data[0]['series']
            // };

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
                // high: data[0]['scale'],
                showPoint: true,
                height: '300px',
                chartPadding: { right: 40 }
            };


            const colouredBarsChart = new Chartist.Line('#colouredBarsChart', dataColouredBarsChart,
                optionsColouredBarsChart);

            this.startAnimationForLineChart(colouredBarsChart);

            
        // });
    }

}

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
    styleUrls: ['./css/otherData.css', './css/ace.min.css', './css/conversation.css'],
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
    public conversations: any[];
    public adminName = "Bob";
    public classList: any[] = [['dark100', 'dark80', 'dark60', 'dark50', 'light40', 'light20'],
        ['dark100', 'dark80', 'dark60', 'dark50', 'light40', 'light20'],
        ['dark100', 'dark80', 'dark60', 'dark50', 'light40', 'light20'],
        ['dark100', 'dark80', 'dark60', 'dark50', 'light40', 'light20'],
        ['dark100', 'dark80', 'dark60', 'dark50', 'light40', 'light20'],
        ['dark100', 'dark80', 'dark60', 'dark50', 'light40', 'light20']];

    public percentList:any[] = [['100%','80%','60%','50%','40%','20%'],
        ['100%', '80%', '60%', '50%', '40%', '20%'],
        ['100%', '80%', '60%', '50%', '40%', '20%'],
        ['100%', '80%', '60%', '50%', '40%', '20%'],
        ['100%', '80%', '60%', '50%', '40%', '20%'],
        ['100%', '80%', '60%', '50%', '40%', '20%']];

    private testlink = "http://hayhay0730.000webhostapp.com/otherDataTop.php";
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
            // this.figures.splice(3, 1);       //DEBUG: remove the last element of array
        });


        // //initialize conversation block========================================
        this.appService.getJson(this.conversationLink).then((data) => {
            this.conversations = data;
        });


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
                [100, 99, 90, 87, 78, 74, 70, 66, 62, 58, 55, 50]
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

        this.startAnimationForBarChart(multipleBarsChart);

// ========returning users color table===========================================================
        this.tableData = {
            headerRow: ['week/Days', '  Initial','1 - 7', '8 - 14','15 - 21','22 - 28','29 - 35'],
            dataRows: this.percentList
        }
       
      


    }

    ngAfterViewInit() {
       
        //  Activate the tooltips
        $('[rel="tooltip"]').tooltip();
    }

    refresh(){
        this.appService.getJson(this.conversationLink).then((data) => {
            this.conversations = data;
        });
    }

}

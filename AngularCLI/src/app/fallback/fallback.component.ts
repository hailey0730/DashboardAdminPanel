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
    templateUrl: './fallback.component.html',
    styleUrls: ['./css/ace.min.css', './css/conversation.css'],
    providers: [
        appService
    ]
})
export class FallbackComponent implements OnInit, AfterViewInit {
    constructor(private appService: appService) {

    }
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }
    public figures: any[];
    public tableData: TableData;
    public tableData2: TableData;
    public conversations: any[];
    public adminName = "Bob";
    public beginDate: any = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
    public endDate: any;
    public overall: boolean = false;
    public period: any = '24hr';
    myDateRangePickerOptions: IMyDrpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };
    
    selectTheme = 'primary';
    durations = [
        {value: '24hr', viewValue: 'Last 24 hours'},
        {value: '7d', viewValue: 'Last 7 days'},
        {value: '14d', viewValue: 'Last 14 days'}
    ]
    private adminPic = "../../assets/img/faces/avatar.jpg";
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

        // //initialize conversation block========================================
        this.appService.getJson(this.conversationLink).then((data) => {
            this.conversations = data;
        });


      
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

        this.overall = false;

        this.beginDate = event.beginDate;
        this.endDate = event.endDate;
        console.log(this.beginDate);
        console.log(this.endDate);

        //    update content 
        

    }

    showOverall() {
        this.overall = true;

        //    update content 
        
    }

    refresh(){
        this.appService.getJson(this.conversationLink).then((data) => {
            this.conversations = data;
        });
    }

    reload(){
        console.log(this.period);
    }

   //conversation block
   sendMessage(){
       var message = $('.message').val();

       var newMessage = {
           "Name": this.adminName,
           "ImgUrl": this.adminPic,
           "Comment": message,
           "Time": (new Date).toLocaleTimeString()
        };

       this.conversations.push(newMessage);
    //    this.appService.postJson('http://hayhay0730.000webhostapp.com/conversation.json', this.conversations);
   }

   reply(name, comment){
       var replyText = '@' + name + ' \n "'  + comment + '"  ' + this.adminName + " : " ;
       $('.message').val(replyText);

   }
//conversation block end

}

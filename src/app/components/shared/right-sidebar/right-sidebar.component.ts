import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-right-sidebar',
    templateUrl: './right-sidebar.component.html',
    styleUrls: ['./right-sidebar.component.less']
})
export class RightSidebarComponent implements OnInit {
    events: any[] = [];

    constructor() {
        this.events = [
            {id: 1, name: 'Event 1',description:'Event desctiption lorem ipsum asd description falan filan', date: '2018-01-01', time: '10:00', location: 'Location 1'},
            {id: 2, name: 'Event 2',description:'Event desctiption lorem ipsum asd description falan filan', date: '2018-01-01', time: '10:00', location: 'Location 2'},
            {id: 3, name: 'Event 3',description:'Event desctiption lorem ipsum asd description falan filan', date: '2018-01-01', time: '10:00', location: 'Location 3'},
            {id: 4, name: 'Event 4',description:'Event desctiption lorem ipsum asd description falan filan', date: '2018-01-01', time: '10:00', location: 'Location 4'},
            {id: 5, name: 'Event 5',description:'Event desctiption lorem ipsum asd description falan filan', date: '2018-01-01', time: '10:00', location: 'Location 5'},
        ];
    }

    ngOnInit(): void {
    }

}

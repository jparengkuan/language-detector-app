import { Component, OnInit } from '@angular/core';
import {EntriesService} from '../entries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  latestEntries = []

  constructor(private entriesService: EntriesService) { }

  ngOnInit() {
    this.entriesService.getLatestEntries()
      .subscribe(
        res => {
          this.latestEntries = res.entries
          console.log(this.latestEntries)
        },
        err => console.log(err)
      )
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  custom = ""
  message="Welcome to the app!"
  name = ""
  constructor(private route:ActivatedRoute, private welcomeData:WelcomeDataService) { }

  ngOnInit() {
    this.name=this.route.snapshot.params["name"]
  }

  getWelcomeMessage(){
    this.welcomeData.executeHelloWorld(this.name).subscribe(response => this.handlePositiveResponse(response),error =>this.handleNegativeResponse(error));
  }
  handleNegativeResponse(error){
    this.custom = "An Error has occured"
  }

  handlePositiveResponse(response){
    console.log(response.message)
    this.custom = response.message
  }

}

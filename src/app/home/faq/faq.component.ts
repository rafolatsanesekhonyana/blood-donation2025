import { Component, OnInit, ɵCurrencyIndex ,Input} from '@angular/core';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FAQComponent  implements OnInit {
   questions:any[]=[
    {
      question: "What is the Blood Connect app?",
      answer: "Blood Connect is a mobile application that connects blood donors with individuals or healthcare facilities in need of blood. It streamlines the process of requesting and donating blood, making it easier for people to access life-saving blood resources."
    },
    {
      question: "How do I request blood through the app?",
      answer: "To request blood, open the app and navigate to the 'Request Blood' section. Fill out the form with details such as your blood type, location, and urgency level. You can also upload any relevant medical documents. Once submitted, nearby compatible donors will be notified of your request."
    },
    {
      question: "Can anyone donate blood through the app?",
      answer: "No, to ensure the safety of blood donations, donors must meet certain eligibility criteria, such as age, weight, and medical history. The app will guide you through the eligibility requirements before allowing you to register as a donor."
    },
    {
      question: "How does the app protect my personal information?",
      answer: "The Blood Connect app takes privacy and data security seriously. We use industry-standard encryption protocols to protect your personal information and medical data. Your information is only shared with authorized personnel when necessary for facilitating blood donations."
    },
    {
      question: "Can I schedule blood donation appointments through the app?",
      answer: "Yes, the app integrates with local blood banks and donation centers, allowing you to browse available appointments and schedule your donation at a convenient time and location."
    },
    {
      question: "Are there any rewards or incentives for regular blood donors?",
      answer: "Yes, the Blood Connect app offers a rewards program to recognize and appreciate regular donors. You can earn badges, discounts, or other incentives based on your donation frequency and overall contribution to the community."
    },
    {
      question: "How can I update my personal information or blood type?",
      answer: "You can access and update your personal information and blood type by navigating to the 'Profile' section of the app. Ensure that your information is accurate and up-to-date to facilitate efficient blood matching and donations."
    },
    {
      question: "Can I use the app to find nearby blood donation drives or events?",
      answer: "Yes, the Blood Connect app has a feature that allows you to locate nearby blood donation drives or events organized by local blood banks or community organizations. These events are displayed on a map or in a list view for easy access."
    },
    {question:'What is your blood group Type',
    answer:'You will know your blood type if you visit a nearby blood bank, clinic or hospital to get tested'
  },
    {
      question: 'If i have registered as a donor can i be a recepient or vice versa',
      answer: 'You can be a donor if you are a recipient and vice versa with an option in the app'
    },
    {
      question: 'Do you have a clinic or blood bank to get a blood',
      answer: 'We don not a clinic as we give users an option to register under a clinic of their choices'
    }
  ]

  constructor() { }

  ngOnInit() {}

}


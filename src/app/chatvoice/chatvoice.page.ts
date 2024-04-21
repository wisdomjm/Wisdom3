import { ChangeDetectorRef, Component, OnInit, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { IonicModule } from '@ionic/angular';
import { OpenaiserviceService } from '../services/openaiservice.service';
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonIcon, 
  IonInput, 
  IonList, 
  IonItem, 
  IonButtons, 
  IonBackButton, 
  IonLabel, 
  IonSpinner, 
  IonFooter, 
  IonTextarea, IonGrid, IonRow, IonCol, IonAvatar, IonFab, IonFabButton, IonPopover  } from '@ionic/angular/standalone'
  import { TextToSpeech } from '@capacitor-community/text-to-speech';


export interface Message{
  type:string;
  class:string;
  message:string;
  talk:boolean;
  avatar:string
}


@Component({
  selector: 'app-chatvoice',
  templateUrl: './chatvoice.page.html',
  styleUrls: ['./chatvoice.page.scss'],
  standalone: true,
  imports: [//IonicModule, 
    CommonModule, FormsModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButton, 
    IonIcon,
    IonInput,
    IonList,
    IonItem,
    IonButtons, 
    IonBackButton, 
    IonLabel,
    IonSpinner,
    IonFooter, 
    IonTextarea,
    IonGrid, IonRow, IonCol, IonAvatar, IonFab, IonFabButton, IonPopover
  ]
})
export class ChatvoicePage implements OnInit {
  
  @ViewChild(IonContent, {read: IonContent, static: false}) myContent!: IonContent;

  public inputText:string = "";
  mChat: Message[] = [];
  idiomaSeleccionado: any;
  loading:boolean = false;
  active:boolean = true;
  listaDeTraduccion: any = [];
  recording = false;


  constructor(
    private openservice: OpenaiserviceService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
    //private speech: SpeechRecognition
    //private textToSpeech: TextToSpeech
  ) { 
    //SpeechRecognition.requestPermissions();
  }

  ngOnInit() {

    this.idiomaSeleccionado = 'Español';
    this.getSupportedLanguages();
    this.getSupportedVoices();
    this.cargarLenguajes();
  }

  
  GoHomeApp(){
    this.router.navigate(['/tabs/homeapp']);
  }

  public cargarLenguajes(){
    this.listaDeTraduccion = [
      {
        id:0,
        lenguaje: 'Español'
      },
      {
        id:1,
        lenguaje: 'Ingles'
      },
      {
        id:2,
        lenguaje: 'Frances'
      },
      {
        id:3,
        lenguaje: 'Italiano'
      },
      {
        id:4,
        lenguaje: 'Portugues'
      },
      {
        id:5,
        lenguaje: 'Aleman'
      },
    ]
  }

  public SeleccionaIdioma(idioma:any){
    this.idiomaSeleccionado = idioma;
    console.log("Idioma Seleccionado: ", this.idiomaSeleccionado);
  }

  public AskQuestion(){
    this.loading = true;
    this.active = false;

    this.mChat.push({
      type:'user',
      class:'question animate__animated animate__bounceInLeft',
      message: this.inputText,
      talk:false, 
      avatar:'null'
    });

    this.openservice.queryFromOpenAi(this.inputText, this.idiomaSeleccionado).then((data:any) => {
      console.log("DATA FROM SUBSCRIBE: ", data)
      this.mChat.push({
        type:'Gpt',
        class:'gpt-response animate__animated animate__bounceInRight',
        message: data,
        talk:true,
        avatar:'../../assets/AnimationTalk.gif'
      });

      setTimeout(() => {
        this.myContent.scrollToBottom(50);
     }, 10);
    
      this.loading = false;
    });

    this.inputText = '';

  }

  async Talk(text:any){
    //this.textToSpeech.speak(text).then(() => console.log('Done')).catch((reason: any) => console.log(reason));
    /*const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0];
    speechSynthesis.speak(utterance);*/
    await TextToSpeech.speak({
      text: text,
      lang: 'es-ES',
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
      category: 'ambient',
      voice: 1
    });
  }

  async stop(){
    await TextToSpeech.stop();
  }

  async getSupportedLanguages(){
    const languajes = await TextToSpeech.getSupportedLanguages();
    console.log("Lenguajes Soportados: ",languajes);
  };
  
  async getSupportedVoices(){
    const voices = await TextToSpeech.getSupportedVoices();
    console.log("Voces Soportados: ",voices);
  };

  async hablarAlChat(){
    console.log("Empezar a hablar")
    this.recording = true;
    const { available } = await SpeechRecognition.available();

    if(available){
      SpeechRecognition.start({
        language: "en-US",
        partialResults: true,
        popup: false,
      });
      SpeechRecognition.addListener("partialResults", (data: any) => {
        console.log("partialResults was fired", data.matches);
        if(data.matches && data.matches.length > 0){
          this.inputText = data.matches[0];
          this.changeDetectorRef.detectChanges();
        }

        //Android
        if(data.value && data.value.length > 0){
          this.inputText = data.value[0];
          this.changeDetectorRef.detectChanges();
        }
      });
    }
    /*SpeechRecognition.start({
      language: "en-US",
      maxResults: 2,
      prompt: "Say something",
      partialResults: true,
      popup: true,
    });*/
  }

  async dejarDeHablar(){
    this.recording = false;
    await SpeechRecognition.stop();
  }

}

/*VOCES */
/* 
voices
: 
Array(22)
0
: 
SpeechSynthesisVoice {voiceURI: 'Microsoft Helena - Spanish (Spain)', name: 'Microsoft Helena - Spanish (Spain)', lang: 'es-ES', localService: true, default: true}
1
: 
SpeechSynthesisVoice {voiceURI: 'Microsoft Laura - Spanish (Spain)', name: 'Microsoft Laura - Spanish (Spain)', lang: 'es-ES', localService: true, default: false}
2
: 
SpeechSynthesisVoice {voiceURI: 'Microsoft Pablo - Spanish (Spain)', name: 'Microsoft Pablo - Spanish (Spain)', lang: 'es-ES', localService: true, default: false}
3
: 
SpeechSynthesisVoice {voiceURI: 'Google Deutsch', name: 'Google Deutsch', lang: 'de-DE', localService: false, default: false}
4
: 
SpeechSynthesisVoice {voiceURI: 'Google US English', name: 'Google US English', lang: 'en-US', localService: false, default: false}
5
: 
SpeechSynthesisVoice {voiceURI: 'Google UK English Female', name: 'Google UK English Female', lang: 'en-GB', localService: false, default: false}
6
: 
SpeechSynthesisVoice {voiceURI: 'Google UK English Male', name: 'Google UK English Male', lang: 'en-GB', localService: false, default: false}
7
: 
SpeechSynthesisVoice {voiceURI: 'Google español', name: 'Google español', lang: 'es-ES', localService: false, default: false}
8
: 
SpeechSynthesisVoice {voiceURI: 'Google español de Estados Unidos', name: 'Google español de Estados Unidos', lang: 'es-US', localService: false, default: false}
9
: 
SpeechSynthesisVoice {voiceURI: 'Google français', name: 'Google français', lang: 'fr-FR', localService: false, default: false}
10
: 
SpeechSynthesisVoice {voiceURI: 'Google हिन्दी', name: 'Google हिन्दी', lang: 'hi-IN', localService: false, default: false}
11
: 
SpeechSynthesisVoice {voiceURI: 'Google Bahasa Indonesia', name: 'Google Bahasa Indonesia', lang: 'id-ID', localService: false, default: false}
12
: 
SpeechSynthesisVoice {voiceURI: 'Google italiano', name: 'Google italiano', lang: 'it-IT', localService: false, default: false}
13
: 
SpeechSynthesisVoice {voiceURI: 'Google 日本語', name: 'Google 日本語', lang: 'ja-JP', localService: false, default: false}
14
: 
SpeechSynthesisVoice {voiceURI: 'Google 한국의', name: 'Google 한국의', lang: 'ko-KR', localService: false, default: false}
15
: 
SpeechSynthesisVoice {voiceURI: 'Google Nederlands', name: 'Google Nederlands', lang: 'nl-NL', localService: false, default: false}
16
: 
SpeechSynthesisVoice {voiceURI: 'Google polski', name: 'Google polski', lang: 'pl-PL', localService: false, default: false}
17
: 
SpeechSynthesisVoice {voiceURI: 'Google português do Brasil', name: 'Google português do Brasil', lang: 'pt-BR', localService: false, default: false}
18
: 
SpeechSynthesisVoice {voiceURI: 'Google русский', name: 'Google русский', lang: 'ru-RU', localService: false, default: false}
19
: 
SpeechSynthesisVoice {voiceURI: 'Google 普通话（中国大陆）', name: 'Google 普通话（中国大陆）', lang: 'zh-CN', localService: false, default: false}
20
: 
SpeechSynthesisVoice {voiceURI: 'Google 粤語（香港）', name: 'Google 粤語（香港）', lang: 'zh-HK', localService: false, default: false}
21
: 
SpeechSynthesisVoice {voiceURI: 'Google 國語（臺灣）', name: 'Google 國語（臺灣）', lang: 'zh-TW', localService: false, default: false}

*/

/* LENGUAJES 

languages
: 
Array(18)
0
: 
"es-ES"
1
: 
"de-DE"
2
: 
"en-US"
3
: 
"en-GB"
4
: 
"es-US"
5
: 
"fr-FR"
6
: 
"hi-IN"
7
: 
"id-ID"
8
: 
"it-IT"
9
: 
"ja-JP"
10
: 
"ko-KR"
11
: 
"nl-NL"
12
: 
"pl-PL"
13
: 
"pt-BR"
14
: 
"ru-RU"
15
: 
"zh-CN"
16
: 
"zh-HK"
17
: 
"zh-TW"


*/

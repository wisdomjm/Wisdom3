import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Open Ai Api
//import OpenAIApi, { OpenAI } from 'openai';
//import Configuration from 'openai'
//import { Configuration, OpenAIApi } from 'openai';
import OpenAI from 'openai';

//Access to Token
import { environment } from 'src/environments/environment';

const APIKEY = environment.chatGptKEY;

@Injectable({
  providedIn: 'root'
})
export class OpenaiserviceService {

  openai: any;
  constructor() {
    this.openai = new OpenAI(
      {
        apiKey: APIKEY, // This is the default and can be omitted
        dangerouslyAllowBrowser: true
      }
    );
  }

  imgURL: string = '';
  image: string = '';

  async queryFromOpenAi(text:any, idioma:any) {
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [{ role: 'user', content:'traduce al '+idioma+ ' ' +text }],
      model: 'gpt-3.5-turbo',
    };
    const chatCompletion: OpenAI.Chat.ChatCompletion = await this.openai.chat.completions.create(params);
    const data = await chatCompletion.choices[0].message.content;
    console.log("DATOS>>> ",data);
    return data;
  }


  async convertToVoice(text:any){
    
  }
  
  //this.openai = new OpenAIApi(new Configuration({ APIKEY }));
  /*readonly configuration: any = new Configuration({
    apiKey:APIKEY,
    dangerouslyAllowBrowser: true
  });

  

  readonly openai = new OpenAI({apiKey: APIKEY, dangerouslyAllowBrowser: true});

  async queryFromOpenAi(text:any) {
    const params = {
      //model:'text-davinci-003',
      model: "gpt-3.5-turbo",
      prompt:text,
      max_tokens:256,
      temperature:0.7
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(APIKEY)
      },
      body: JSON.stringify(params)
    };
    
    const response = await fetch('https://api.openai.com/v1/completions',requestOptions);
    const data = await response.json();
    //data.choices[0].text)
    console.log("DATOS>>> ",data.choices[0].text);
    return data.choices[0].text;
  }*/





}

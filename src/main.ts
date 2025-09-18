import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { register } from 'swiper/element/bundle';
import 'chart.js/auto';

register();
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

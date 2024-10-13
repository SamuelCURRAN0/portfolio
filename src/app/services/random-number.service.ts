import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomNumberService {

  // Utility method to get a random number between min and max (inclusive)
  getRandomNumberInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

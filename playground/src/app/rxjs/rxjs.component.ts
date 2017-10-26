import { Component }       from '@angular/core';

// Rxjs cheat sheet
// https://github.com/btroncone/learn-rxjs

import { Observable }      from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject }         from 'rxjs/Subject';

// Creation
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/interval';

// Combination
// combineLatest
// 💡 Those operators can be used as either a static or instance methods!
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/concat';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/merge';
// startWith
// withLatestFrom
import 'rxjs/add/observable/zip';

// Conditional
import 'rxjs/add/operator/every';
import 'rxjs/add/operator/defaultIfEmpty';

// Error handling
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/retry';
// import 'rxjs/add/operator/retryWhen';

// Filtering
import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/last';

// Transformation
import 'rxjs/add/operator/bufferTime';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/reduce';

// Multicasting
import 'rxjs/add/operator/share';

// Utility
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'rxjs',
  template: `Open console!`,
  styles: [`
    // :host { display: block; }
  `]
  
})
export class RxjsComponent {

  // Creation
  ///////////

  // of - Emit variable amount of values in a sequence.
  _of = Observable.of('Was', 'geht', 'denn', 'ab')
    // .subscribe(x => console.log(`of: ${x}`));

  // interval - Emit numbers in sequence based on provided timeframe (ms).
  interval = Observable.interval(500)
    // .subscribe(x => console.log(`interval: ${x}`));

  // from - Turn an array, promise or iterable into an observable.
  from = Observable.from([1, 2, 3, 4, 5])
    // .subscribe(x => console.log(`from: ${x}`));

  // timer - After given duration, emit numbers in sequence every specified duration.
  // emit 0 after 1 second then subsequent values (1, 2, 3, ...) every 3 seconds
  timer = Observable.timer(1000, 3000)
    // .subscribe(x => console.log(`timer: ${x}`));

  // emit 0 after 1 second then complete
  timerOnce = Observable.timer(1000)
    // .subscribe(x => console.log(`timerOnce: ${x}`));



  // Transformation
  /////////////////

  // map - Apply projection with each value from source.
  map = Observable.from([1, 2, 3])
    .map(x => x * 3)
    // .subscribe(x => console.log(`map: ${x}`));

  // mapTo - Map emissions to constant value.
  mapTo = Observable.of(1, 2, 3)
    .mapTo("static string")
    // .subscribe(x => console.log(`mapTo: ${x}`));

  // mergeMap - Map to observable, emit values. (alias: flatMap)
  // 💡 if only one inner subscription should be active at a time, try switchMap!
  // 💡 if the order of emission and subscription of inner observables is important, try concatMap!
  mergeMap = Observable.of('Hello', 'Goodbye', 'Whats going on')
    .mergeMap(x => Observable.of(`${x} World!`))
    // .subscribe(x => console.log(`mergeMap: ${x}`));

  // concatMap - Map values to inner observable, subscribe and emit in order.
  concatMap = Observable.of('Hello', 'Goodbye', 'Whats going on')
    .concatMap(x => Observable.of(`${x} World!`))
    // .subscribe(x => console.log(`concatMap: ${x}`));

  // ---------------------------------------------------------
  // Illustrating difference between concatMap and mergeMap

  concatMapOrdered = Observable.of(2000, 1000)
    .concatMap(x => Observable.of(x).delay(x))
    // concatMapOrdered: 2000, concatMapOrdered: 1000
    // .subscribe(x => console.log(`concatMapOrdered: ${x}`));

  mergeMapUnordered = Observable.of(2000, 1000)
    .mergeMap(x => Observable.of(x).delay(x))
    // mergeMapUnordered: 1000, mergeMapUnordered: 2000
    // .subscribe(x => console.log(`mergeMapUnordered: ${x}`))

  // ---------------------------------------------------------

  // switchMap - Map to observable, complete previous inner observable, emit values.
  // 💡 If you would like more than one inner subscription to be maintained, try mergeMap!
  // 💡 This operator can cancel in-flight network requests!
  switchMap = Observable.timer(0, 5000)
    .switchMap(() => Observable.interval(500))
    // .subscribe(x => console.log(`switchMap: ${x}`))

  // scan - Reduce over time.
  scan = Observable.interval(500)
    .scan((acc, curr) => acc + curr)
    // .subscribe(x => console.log(`Accumulated: ${x}`));

  // reduce - Reduces the values from source observable to a single value that's emitted when the source completes.
  // 💡 Just like Array.prototype.reduce() 
  // 💡 If you need the current accumulated value on each emission, try scan!
  reduce = Observable.from([1, 2, 3, 4, 5, 6, 7])
    .reduce((acc, val, index) => acc + val)
    // .subscribe(x => console.log(`reduce: ${x}`));

  // bufferTime - Collect emitted values until provided time has passed, emit as array.
  // Create an observable that emits a value every 500ms
  bufferTime = Observable.interval(500)
    //After 2 seconds have passed, emit buffered values as an array
    .bufferTime(2000)
    // .subscribe(x => console.log(`Buffered with Time: ${x}`));



  // Conditional
  //////////////

  // every - If all values pass predicate before completion emit true, else false.
  every = Observable.of(2, 4, 6, 8, 10)
    .every(x => x % 2 === 0)
    // .subscribe(x => console.log(`every: ${x}`));

  // defaultIfEmpty - Emit given value if nothing is emitted before completion.
  defaultIfEmpty = Observable.of()
    .defaultIfEmpty('Observable.of() is empty!')
    // .subscribe(x => console.log(`defaultIfEmpty: ${x}`));



  // Filtering
  ////////////

  // filter - Emit values that pass the provided condition.
  filter = Observable.from([1, 2, 3, 4, 5])
    .filter(x => x % 2 === 0)
    // .subscribe(x => console.log(`filter: ${x}`));

  isEven = val => val % 2 === 0;
  customFilter = Observable.of(1, 2, 3, 4, 5)
    .filter(this.isEven)
    // .subscribe(x => console.log(`filterFunc: ${x}`));

  // take - Emit provided number of values before completing.
  // 💡 if you want to take a variable number of values based on some logic, or another observable, you can use takeUntil or takeWhile!
  take = Observable.of(1, 2, 3, 4)
    .take(2)
    // .subscribe(x => console.log(`take: ${x}`));

  // takeUntil - Emit values until provided observable emits.
  // 💡 If you only need a specific number of values, try take!
  takeUntil = Observable.interval(1000)
    .takeUntil(Observable.timer(5000))
    // .subscribe(x => console.log(`takeUntil: ${x}`));

  // distinctUntilChanged - Only emit when the current value is different than the last.
  distinctUntilChanged = Observable.of(1, 1, 2, 2, 3, 3, 1, 2, 3)
    .distinctUntilChanged()
    // .subscribe(x => console.log(`distinctUntilChanged: ${x}`));

  // last - Emit the last value emitted from source on completion, based on provided expression.
  // 💡 The counterpart to last is first or take(1)
  last = Observable.of(1, 2, 3)
    .last()
    // .subscribe(x => console.log(`last: ${x}`));



  // Error handling
  /////////////////

  // catch - Gracefully handle errors in an observable sequence.
  // ⚠️ Remember to return an observable from the catch function!
  catch = Observable.throw('An error!')
    .catch(x => Observable.of(`Caught: ${x}`))
    // .subscribe(x => console.log(x));

  

  // Utility
  //////////

  // do - Transparently perform actions or side-effects, such as logging.
  do = Observable.of(1, 2, 3)
    .do(x => console.log(`do before map: ${x}`))
    .map(x => x * 3)
    .do(x => console.log(`do after map: ${x}`))
    // .subscribe();

  // delay - Delay emitted values by given time.
  delay = Observable.of(1)
    .delay(2000)
    // .subscribe(x => console.log(`delay: ${x}`));



  // Combination
  //////////////

  // merge - Turn multiple observables into a single observable.
  // 💡 This operator can be used as either a static or instance method!
  // 💡 If order not throughput is a primary concern, try concat instead!
  merge = Observable.merge(
    Observable.timer(1200).mapTo('first!'),
    Observable.timer(700).mapTo('second!'),
    Observable.timer(200).mapTo('third!'),
  )
  // .subscribe(x => console.log(`merge: ${x}`));

  mergeInstance = Observable.of(1)
    .merge(Observable.of(2))
    // .subscribe(x => console.log(`mergeInstance: ${x}`));

  // concat - Subscribe to observables in order as previous completes, emit values.
  // 💡 This operator can be used as either a static or instance method!
  // 💡 If throughput order is not a primary concern, try merge instead!
  concat = Observable.concat(
    Observable.timer(500).mapTo('first!'),
    Observable.timer(200).mapTo('second!'),
  )
  // .subscribe(x => console.log(`concat: ${x}`));

  // zip - subscribe to all inner observables, waiting for each to emit a value.
  //       Once this occurs, all values with the corresponding index will be emitted.
  //       This will continue until at least one inner observable completes.
  zip = Observable.zip(
    Observable.of(1),
    Observable.of(2)
  )
  // .subscribe(x => console.log(`zip: ${x}`));


}
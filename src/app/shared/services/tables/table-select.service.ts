import { Injectable, OnInit } from '@angular/core';
import { selectComponents } from '../../../reducers';
import { Observable } from 'rxjs/Observable';

interface Selectable {
	id: any;
	state: boolean;
}
/**
 * Provides a way to select and multiselect elements of an array,
 *  commonly used in lists with selectable elements
 */
@Injectable()
export class TableSelectService {

	/**
	 * An array containing elemnents that consist of id: any and state: boolean
	 */
	selectionArray: Selectable[];

	/**
	 * A boolean that describes wether the state of all elements of this.selectionArray should be set to true or false.
	 * Should be used in combination with this.toggleAll()
	 */
	allSelected: boolean;

	constructor() {
		this.selectionArray = [];
		this.allSelected = false;
	}

	/**
	 * Populates this.selectionArray with the elements of an array that is contained in an Observable
	 * @param inputObservable An observable the content of which should become the content of this.selectionArray
	 */
	createSelectionArrayFromObservable(inputObservable: Observable<any[]>) {
		let array = [];
		inputObservable.subscribe(data => array = data);
		this.createSelectionArray(array);
	}

	/**
	 * Populates this.selectionArray with the elements of an array.
	 * The elements of the Array become the id property of Selectables,
	 * the state of each Selectable is set to false.
	 * @param inputArray an array that should become the content of this.selectionArray
	 */
	createSelectionArray(inputArray: any[]) {
		let outputArray = [];
		inputArray.forEach(function (element) {
			outputArray.push({ id: element, state: false })
		});
		this.selectionArray = outputArray;
	}

	/**
	 * Returns the number of elements in this.selectionArray whose state = true
	 * @return number of true states in this.selectionArray
	 */
	getCountOfSelectedElements() {
		let count = 0;
		this.selectionArray.forEach(function (element) {
			if (element.state == true) {
				count++;
			}
		})
		return count;
	}
	/**
	 * Sets this.selectionArray to [] and sets this.allSelected to false
	 */
	reset() {
		this.selectionArray = [];
		this.allSelected = false;
	}

	/**
	 * Sets the state of all elements equal to this.allSelected
	 */
	toggleAll() {
		let that = this;
		this.selectionArray.forEach(function (currentArrayElement) {
			currentArrayElement.state = that.allSelected;
		})
	}


	// toggleOne(selectedElement: any){
	// 	this.selectionArray.find(x=> x.id ===selectedElement).state = !this.selectionArray.find(x=> x.id ===selectedElement).state;
	// }

	/**
	 * Prints this.selectionArray and the number of currently selected elements
	 */
	printSelectionArray() {
		console.log(this.selectionArray)
		console.log("Number of selected Elements: " + this.getCountOfSelectedElements());
	}

	/**
	 * Returns the element of this.selectionArray that has the given id
	 *  @param  id   ID of the element in this.selectionArray that should be returned
	 * @return      the element from this.selectionArray
	 **/
	getElementById(id) {
		return this.selectionArray.find(x => x.id === id);
	}
}

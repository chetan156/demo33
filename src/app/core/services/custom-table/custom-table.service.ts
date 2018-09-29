import { Injectable } from '@angular/core';

@Injectable()
export class PaginationService {

  constructor() { }

  // init(currentIndex: number, inputLength: number, pageSize: number, pages: number, pageStart: number,
  //    pageNumber: number, filteredItems: any[], ) {
  //   currentIndex = 1;
  //   pageSize = inputLength;
  //   pageStart = 1;
  //   pages = 7;
  //   // tslint:disable-next-line:radix
  //   pageNumber = parseInt('' + (filteredItems.length / pageSize));
  //   if (filteredItems.length % pageSize !== 0) {
  //     pageNumber++;
  //   }
  //   if (pageNumber < pages) {
  //     pages = pageNumber;
  //   }
  //   this.refreshItems();
  // }

  // sort(column) {
  //   switch (column) {
  //     case 'firstname': {
  //       if (this.sortNameOrder) {
  //         this.filteredItems = this.filteredItems.sort((a, b) => a.firstName.localeCompare(b.firstName));
  //         this.sortOrder = !this.sortOrder;
  //         this.init();
  //         this.sortNameOrder = !this.sortNameOrder;
  //       } else {
  //         this.filteredItems = this.filteredItems.sort((a, b) => b.firstName.localeCompare(a.firstName));
  //         this.sortOrder = !this.sortOrder;
  //         this.init();
  //         this.sortNameOrder = !this.sortNameOrder;
  //       }
  //       break;
  //     }
  //     case 'lastname': {
  //       if (this.sortCityOrder) {
  //         this.filteredItems = this.filteredItems.sort((a, b) => a.lastName.localeCompare(b.lastName));
  //         this.sortOrder = !this.sortOrder;
  //         this.init();
  //         this.sortCityOrder = !this.sortCityOrder;
  //       } else {
  //         this.filteredItems = this.filteredItems.sort((a, b) => b.lastName.localeCompare(a.lastName));
  //         this.sortOrder = !this.sortOrder;
  //         this.init();
  //         this.sortCityOrder = !this.sortCityOrder;
  //       }
  //       break;
  //     }
  //     default: {
  //       console.log('Invalid');
  //       break;
  //     }
  //   }
  // }


  // // Code to change input for page records
  // ChangeinputLength() {
  //   this.pageSize = this.inputLength;
  //   this.init();
  // }



  // // Function to refresh Array
  // refreshItems() {
  //   this.items = this.filteredItems.slice((this.currentIndex - 1)
  //     * this.pageSize, (this.currentIndex) * this.pageSize);
  //   this.pagesIndex = this._paginationService.fillArray( this.pageStart, this.pages);
  // }

  // // Previous button code
  // prevPage() {
  //   if (this.currentIndex > 1) {
  //     this.currentIndex--;
  //   }
  //   if (this.currentIndex < this.pageStart) {
  //     this.pageStart = this.currentIndex;
  //   }
  //   this.refreshItems();
  // }

  // // Next Button Code
  // nextPage() {
  //   if (this.currentIndex < this.pageNumber) {
  //     this.currentIndex++;
  //   }
  //   if (this.currentIndex >= (this.pageStart + this.pages)) {
  //     this.pageStart = this.currentIndex - this.pages + 1;
  //   }

  //   this.refreshItems();
  // }

  // // periticluar page no selection function
  // setPage(index: number) {
  //   this.currentIndex = index;
  //   this.refreshItems();
  // }
  fillArray(pageStart: number, pages: number ): any {
    const obj = new Array();
    for (let index = pageStart; index < pageStart + pages; index++) {
      obj.push(index);
    }
    return obj;
  }

}

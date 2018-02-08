// arguments object - not bound w arrow functions

const add = (a, b) => {
  // console.log(arguments); <== this would work in ES5
  return a + b;
}

// this keyword - not bound

const user = {
  name: 'Nisarg',
  cities: ['Dallas', 'Seattle', 'Austin'],
  printPlacesLived() { 

    return this.cities.map((city) => this.name + ' has lived in ' + city);

    // this.cities.forEach((city) => {
    //   console.log(this.name + ' has lived in ' + city);
    // });
  }
}

// arrow functions inherit this from parent - if its in an object,
// the this keyword in an arrow function will not refer to the object
// but the closest parent 'this' above the object

// Challenge

const multiplier = {
  numbers: [0, 1, 3, 10],
  factor: 5,
  multiply() {
    return numbers.map((number) => number * this.factor);
  }
}
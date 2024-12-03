# di-lazy

> Lazy instantiation of the class based on the first access to its reference

## Usage

```tsx

const LazyClass = lazy(class {
  constructor(...args: number[]) {
    console.log("CTOR", { args })
  }
  test = () => console.log("test");
});

const lazyInstance = new LazyClass(1, 2, 3);

console.log("Instance created");

lazyInstance.test(); // CTOR { args: [ 1, 2, 3 ] }

console.log("Method executed")

```

const NEVER_VALUE = Symbol('never');

export const lazy = <ClassType extends new (...args: any[]) => any>(ClassCtor: ClassType) => {

  let instance: typeof NEVER_VALUE | InstanceType<ClassType> = NEVER_VALUE;

  const activateInstance = (...args: ConstructorParameters<ClassType>) => {
    if (instance === NEVER_VALUE) {
      instance = new ClassCtor(...args);
      // @ts-ignore
      instance.init && instance.init();
    }
    return instance as ClassType;
  };

  class ClassReferer {
    constructor(...args: ConstructorParameters<ClassType>) {
      const proxyInstance = new Proxy(this, {
        get(_, propKey, receiver) {
          if (propKey === 'init') {
            return;
          }
          const reference = activateInstance(...args);
          return Reflect.get(reference, propKey, receiver)
        },
        set(_, propKey, value, receiver) {
          const reference = activateInstance(...args);
          return Reflect.set(reference, propKey, value, receiver)
        },
      });
      Object.setPrototypeOf(this, proxyInstance);
    };
  }

  function ClassActivator(...args: ConstructorParameters<ClassType>) {
    return new ClassReferer(...args);
  }

  return ClassActivator as unknown as ClassType;
};

/*
const LazyClass = lazy(class {
  constructor(...args: number[]) {
    console.log("CTOR", { args })
  }
  test = () => console.log("test")
});

const lazyInstance = new LazyClass(1, 2, 3);

console.log("Instance created");

lazyInstance.test();

console.log("Method executed")
*/

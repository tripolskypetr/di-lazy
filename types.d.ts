declare const lazy: <ClassType extends new (...args: any[]) => any>(ClassCtor: ClassType, ...keys: Array<keyof InstanceType<ClassType>>) => ClassType;

export { lazy };

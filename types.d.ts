declare const lazy: <ClassType extends new (...args: any[]) => any>(ClassCtor: ClassType) => ClassType;

export { lazy };

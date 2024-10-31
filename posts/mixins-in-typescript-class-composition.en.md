---
title: 'Mixins in TypeScript : Class composition'
pageTitle: 'Mixins in TypeScript: A complete guide to modular class composition'
date: '2024-11-01'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/mixins-in-typescript-class-composition-illustration.webp'
excerpt: 'Discover how to use mixins in TypeScript to compose classes in a modular and reusable way. Detailed guide with concrete examples.'
tags: ['typescript']
related: ['typescript-union-intersection-typeguards', 'typescript-enums']
---

Mixins are an interesting feature to use to enhance the modularity and reusability of classes.

They allow you to enrich classes with additional functionality without resorting to multiple inheritance, which is not natively supported by TypeScript.

## Understanding mixins

### Defining mixins

Mixins are functions that can be added to several classes to provide them with common functionality.

Unlike classical inheritance, where a class inherits from a single parent class, mixins allow you to assemble behaviors by combining several sources.

A mixin is a function that takes a base class and returns a new class with additional functionality.

This mechanism makes it possible to “mix” different functionalities in a class without the disadvantages of multiple inheritance.

### Benefits of using mixins

Using mixins has a significant advantage. You can add behaviors and utility methods to classes without the complexity of inheritance.

These methods can be reused where necessary, without depending on a parent class.

## Setting up mixins in TypeScript

### Basic syntax for TypeScript mixins

TypeScript mixins are generally implemented as functions that take a base class and return a new class with additional functionality. Here's the basic syntax for creating a mixin:

**Defining a mixin** :

```typescript
function Timestamped<TBase extends new (...args: any[]) => {}>(Base: TBase) {
  return class extends Base {
    timestamp = new Date();

    getTimestamp() {
      return this.timestamp;
    }
  };
}
```

In this example, `Timestamped` is a mixin that adds a `timestamp` property and a `getTimestamp` method to a base class.

**Applying a mixin to a class** :

```typescript
class Person {
  constructor(public name: string) {}
}

const TimestampedPerson = Timestamped(Person);

const person = new TimestampedPerson('Alice');
console.log(person.name); // Alice
console.log(person.getTimestamp()); // Affiche le timestamp actuel
```

### Combine several mixins

It's also possible to combine several mixins. Here's how to do it:

**Combining mixins** :

```typescript
const LoggableValidatableEmployee = Validatable(Loggable(Employee));

const employee2 = new LoggableValidatableEmployee('Charlie');
employee2.log('Checking validity');
console.log(employee2.isValid()); // true
```

By combining several mixins, you can create classes enriched with new, reusable functions.

## Creating simple mixins

### Example 1: Mixin to add logging functionality

One of the most common uses of mixins is to add logging functionality to a class. Here's how to create a mixin that adds this capability.

```typescript
function Loggable<TBase extends new (...args: any[]) => {}>(Base: TBase) {
  return class extends Base {
    log(message: string) {
      console.log(`${new Date().toISOString()}: ${message}`);
    }
  };
}
```

This `Loggable` mixin adds a `log` method that displays a message with a timestamp.

**Application of the logging mixin** :

```typescript
class Employee {
  constructor(public name: string) {}
}

const LoggableEmployee = Loggable(Employee);

const employee = new LoggableEmployee('Alice');
employee.log('Employee created'); // 2024-05-27T14:00:00.000Z: Employee created
```

Using the `Loggable` mixin, the `Employee` class is enriched with the `log` method.

### Example 2: Mixin for adding validation methods

Another common use of mixins is to add validation methods. Here's how to create a mixin for this function:

**Validation mixin definition** :

```typescript
function Validatable<TBase extends new (...args: any[]) => {}>(Base: TBase) {
  return class extends Base {
    isValid(): boolean {
      // Implement the validation logic
      return true; // Simple example, will always return true
    }
  };
}
```

This `Validatable` mixin adds an `isValid` method that can be used to check the validity of instances.

**Applying the validation mixin**:

```typescript
class Order {
  constructor(public orderId: number) {}
}

const ValidatableOrder = Validatable(Order);

const order = new ValidatableOrder(123);
console.log(order.isValid()); // true
```

The `Order` class is now enriched with the `isValid` method thanks to the `Validatable` mixin.

### Managing conflicts and priorities between mixins

When combining several mixins, conflicts may arise, for example, if two mixins add methods or properties with the same name. To manage these conflicts:

**Method renaming** :

If two mixins define a `log` method, you can rename one of the methods to avoid conflict:

```typescript
function LoggableV1<TBase extends new (...args: any[]) => {}>(Base: TBase) {
  return class extends Base {
    logV1(message: string) {
      console.log(`V1: ${new Date().toISOString()}: ${message}`);
    }
  };
}

function LoggableV2<TBase extends new (...args: any[]) => {}>(Base: TBase) {
  return class extends Base {
    logV2(message: string) {
      console.log(`V2: ${new Date().toISOString()}: ${message}`);
    }
  };
}

const CombinedLogger = LoggableV2(LoggableV1(Employee));

const employee3 = new CombinedLogger('Charlie');
employee3.logV1('Log from V1');
employee3.logV2('Log from V2');
```

**Use of super**:

If you want mixin methods to be executed sequentially, you can use `super` to call a mixin method in another method :

```typescript
function LoggableV3<TBase extends new (...args: any[]) => {}>(Base: TBase) {
  return class extends Base {
    log(message: string) {
      super.log(message);
      console.log(`V3: ${new Date().toISOString()}: Additional log`);
    }
  };
}

const CombinedLoggerV3 = LoggableV3(Loggable(Employee));

const employee4 = new CombinedLoggerV3('Dave');
employee4.log('Testing combined logging');
```

### Example of event management with mixins

**Event management mixin definition** :

```typescript
function EventEmitter<TBase extends new (...args: any[]) => {}>(Base: TBase) {
  return class extends Base {
    private events: { [key: string]: Function[] } = {};

    on(event: string, listener: Function) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(listener);
    }

    emit(event: string, ...args: any[]) {
      if (this.events[event]) {
        this.events[event].forEach((listener) => listener(...args));
      }
    }
  };
}
```

**Applying the event management mixin with other mixins** :

```typescript
function Loggable<TBase extends new (...args: any[]) => {}>(Base: TBase) {
  return class extends Base {
    log(message: string) {
      console.log(`${new Date().toISOString()}: ${message}`);
    }
  };
}

class Task {
  constructor(public description: string) {}
}

const EventfulLoggableTask = Loggable(EventEmitter(Task));

const task = new EventfulLoggableTask('Learn TypeScript Mixins');
task.on('start', () => task.log('Task started'));
task.emit('start'); // 2024-05-27T14:00:00.000Z: Task started
```

In this example, `Task` is enhanced with logging and event management capabilities.

### Advantages of composing with mixins

Class composition with mixins offers several advantages:

**Reusability**: Mixins enable common functionality to be reused across different classes without repeating code.

**Flexibility**: Mixins are more flexible than simple inheritance, allowing you to combine several independent behaviors.

**Modularity**: Mixins promote code modularity, facilitating maintenance and updates.

## Advanced use cases

### Mixin to add save and load functionality

An advanced use case for mixins is to add save and load functionality to objects, enabling instance state to be stored and restored. Here's how to create and use such mixins:

**Save and load mixin definition** :

```typescript
function Serializable<TBase extends new (...args: any[]) => {}>(Base: TBase) {
  return class extends Base {
    save(): string {
      return JSON.stringify(this);
    }

    static load<T extends typeof Base>(this: T, json: string): InstanceType<T> {
      const obj = new this();
      Object.assign(obj, JSON.parse(json));
      return obj as InstanceType<T>;
    }
  };
}
```

This `Serializable` mixin adds two methods: `save`, which converts the object's state into a JSON string, and `load`, which restores the state from a JSON string.

**Application of the save and load mixin** :

```typescript
class Product {
  constructor(public name: string, public price: number) {}
}

const SerializableProduct = Serializable(Product);

const product = new SerializableProduct('Laptop', 1500);
const savedProduct = product.save();
console.log(savedProduct); // {"name":"Laptop","price":1500}

const loadedProduct = SerializableProduct.load(savedProduct);
console.log(loadedProduct); // Product { name: 'Laptop', price: 1500 }
```

Here, the `Product` class is enriched with save and load capabilities, making it easier to manage the state of objects.

### Mixin to add caching functionality

Another advanced use case is to add caching functionality to improve performance by avoiding repeated calculations or queries. Here's how to create a caching mixin:

**Caching mixin definition** :

```typescript
function Cacheable<TBase extends new (...args: any[]) => {}>(Base: TBase) {
  return class extends Base {
    private cache: { [key: string]: any } = {};

    getFromCache(key: string): any {
      return this.cache[key];
    }

    setCache(key: string, value: any): void {
      this.cache[key] = value;
    }
  };
}
```

This `Cacheable` mixin adds methods for storing and retrieving cached data.

**Applying the caching mixin** :

```typescript
class DataFetcher {
  fetchData(): string {
    return 'Fetched Data';
  }
}

const CacheableDataFetcher = Cacheable(DataFetcher);

const dataFetcher = new CacheableDataFetcher();
const key = 'data';

if (!dataFetcher.getFromCache(key)) {
  const data = dataFetcher.fetchData();
  dataFetcher.setCache(key, data);
  console.log('Data cached');
}

console.log(dataFetcher.getFromCache(key)); // Fetched Data
```

With this mixin, the `DataFetcher` class can now cache data, improving the efficiency of repeated data requests.

### Mixin for adding asynchronous events

To handle asynchronous operations smoothly, you can create a mixin that adds asynchronous event capabilities. Here's how to do it:

**Defining the asynchronous event mixin** :

```typescript
function AsyncEventEmitter<TBase extends new (...args: any[]) => {}>(Base: TBase) {
  return class extends Base {
    private asyncEvents: { [key: string]: Function[] } = {};

    onAsync(event: string, listener: Function) {
      if (!this.asyncEvents[event]) {
        this.asyncEvents[event] = [];
      }
      this.asyncEvents[event].push(listener);
    }

    async emitAsync(event: string, ...args: any[]) {
      if (this.asyncEvents[event]) {
        await Promise.all(this.asyncEvents[event].map((listener) => listener(...args)));
      }
    }
  };
}
```

This `AsyncEventEmitter` mixin allows asynchronous events to be managed using Promises.

**Application of the asynchronous events mixin** :

```typescript
class Downloader {
  async download(url: string): Promise<string> {
    return `Downloaded content from ${url}`;
  }
}

const AsyncDownloader = AsyncEventEmitter(Downloader);

const downloader = new AsyncDownloader();
downloader.onAsync('downloaded', async (content: string) => {
  console.log('Processing content:', content);
});

(async () => {
  const content = await downloader.download('<https://api.devoreur2code.com>');
  await downloader.emitAsync('downloaded', content);
})();
```

In this example, the `Downloader` class is enriched with asynchronous event capabilities, enabling smooth management of asynchronous operations.

### Mixin to add authorization capabilities

Finally, you can create a mixin to add authorization capabilities, allowing you to check permissions before executing certain actions:

**Definition of authorization mixin** :

```typescript
function Authorizable<TBase extends new (...args: any[]) => {}>(Base: TBase) {
  return class extends Base {
    private roles: string[] = [];

    setRoles(roles: string[]) {
      this.roles = roles;
    }

    canPerform(action: string): boolean {
      // Logique simple d'autorisation basée sur les rôles
      const permissions: { [key: string]: string[] } = {
        delete: ['admin'],
        edit: ['admin', 'editor'],
      };

      return permissions[action]?.some((role) => this.roles.includes(role)) || false;
    }
  };
}
```

This `Authorizable` mixin adds methods for defining roles and checking execution permissions.

**Application of the authorization mixin** :

```typescript
class Document {
  constructor(public title: string) {}
}

const AuthorizableDocument = Authorizable(Document);

const doc = new AuthorizableDocument('Confidential Document');
doc.setRoles(['editor']);

console.log(doc.canPerform('edit')); // true
console.log(doc.canPerform('delete')); // false
```

The `Document` class is now able to check authorizations before allowing certain actions.

These advanced use cases show how mixins can be used to enrich classes with powerful, modular functionality, making it easier to manage complex features in your TypeScript applications.

## Best practices and pitfalls to avoid

### Best practices for using mixins in TypeScript

**Use mixins to compose common behaviors** :

Mixins are ideal for adding reusable functionality to multiple classes without repeating code. For example, mixins for logging, validation or event handling can be applied to several classes to share these behaviors.

**Keep mixins specific**:

Mixins should be focused on a single responsibility. This makes your code more modular and easier to maintain. A mixin that is too complex can become difficult to understand and debug.

**Document mixins and their use**:

Since mixins can profoundly affect the classes to which they are applied, it's essential to properly document their behavior, methods and impact. Good documentation helps other developers understand how to use mixins correctly.

**Test mixins independently**:

As with any reusable component, it's crucial to test mixins in isolation to make sure they work as intended. Write unit tests for each mixin to validate its behavior.

### Pitfalls to avoid with mixins

**Avoid name conflicts**:

A common problem with mixins is name conflicts between methods and properties. To avoid this, use specific method names or prefixes to differentiate methods from mixins. For example, instead of `log`, use `logInfo` or `logDebug`.

**Monitor dependencies and side effects**:

Mixins can introduce implicit dependencies or edge effects that are not immediately obvious. Make sure that mixins do not alter the overall state or interfere unexpectedly with other parts of the code.

**Super call management**:

When composing multiple mixins, it's important to handle `super` calls appropriately to avoid infinite loops or unexpected behavior. As a general rule, it's best to use them as a last resort.

**Avoid overloading classes**:

Adding too many mixins to a single class can make it unwieldy and difficult to manage. Try to limit the number of mixins applied to a class to keep the code simple and clear.

## Conclusion

By composing your classes with mixins, you can create more robust, modular and maintainable applications.

Mixins allow you to avoid the limitations of single inheritance and adopt a more flexible, modular approach to structuring your code in TypeScript.
